var express = require('express');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

//socket io
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));

//middleware
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
	resave: false,
	saveUninitialized: false,
	secret: 'thisgamegottabegreat'
}));

//passport-twitter

require(__dirname+'/dev/passport/twitter.js')(app);

//router
app.get('/',function(req,res){
	res.sendFile(__dirname+"/index.html");
});

app.get('/session',function(req,res){
	res.json(req.user);
});

app.get('/logout', function (req, res) {
	// passport attaches this function to req for us
	req.logout();
	res.redirect('/');
});

app.get('/tweets', function (req, res, next) {
	var handle = req.query.handle;
	// using our user-specific twitter client
	// get the tweets of the specified handle (should be placed in the query string)
	req.user.client.get('statuses/user_timeline', {
		screen_name: handle,
        count: 200
	}, function (err, tweets) {
		if (err) return next(err);
		var leanTweets = tweets.map(function (tweet) {
			// extract relevant info
			return {
				name: tweet.user.name,
				handle: tweet.user.screen_name,
				text: tweet.text,
				date: tweet.created_at,
				imageUrl: tweet.user.profile_image_url
			};
		});
		res.json(leanTweets);
	});
});

//socket io
io.sockets.on('connection',function(client){
	// console.log(client)
	client.on('join',function(data){
		console.log(data);
		client.name = data.name;
		client.color = data.color;
		console.log(client.name,client.color);
	});
	client.emit('messages',{info: "this is WTF, connection established"});
	client.on('positionChange',function(data){
		// console.log(data.position)
		client.broadcast.emit('playerPosition',{
			name : client.name,
			color : client.color,
			position : data.position,
			lookAtVector : data.lookAtVector
		});
	});
	client.on('iShoot',function(data){
		// console.log(data);
		client.broadcast.emit('playerShoot',{
			startPos : data.startPos,
			endPos : data.endPos,
			color : client.color
		});
	});
	client.on('disconnect',function(){
		client.broadcast.emit('playerLeft',client.name);
		console.log("client disconnected");
	});
});

//error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// standard error handling middleware
app.use(function (err, req, res, next) {
	err.status = err.status || 500;
	console.log('error', err);
	res.status(err.status).end();
});


server.listen(9999,function(){
	console.log("WTF is starting at 9999");
});


