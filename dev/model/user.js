var mongoose = require('mongoose'),
	// this twitter library is for making requests for twitter data
	Twitter = require('twitter');

var config = require('../config');

mongoose.connect('mongodb://localhost/wtf');
mongoose.connection.on('error', console.error.bind(console, 'database connection error'));

var userSchema = mongoose.Schema({
	token: String,
	tokenSecret: String,
	id: String,
	handle: String
});

// this virtual client will mean less code cluttering up
// any controllers that are trying to get some data from
// twitter
userSchema
	.virtual('client')
	.get(function () {
		// to make requests for twitter data,
		// the client needs our app's "username" and "login"
		// as well as the user token's "username" and "login"
		var clientSetup = {
			consumer_key: config.twitter.consumerId,
			consumer_secret: config.twitter.consumerSecret,
			access_token_key: this.twitter.token,
			access_token_secret: this.twitter.tokenSecret
		};
		return new Twitter(clientSetup);
	});

module.exports = mongoose.model('User', userSchema);