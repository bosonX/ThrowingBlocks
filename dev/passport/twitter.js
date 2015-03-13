module.exports = function(app){
  var passport = require('passport');
  var TwitterStrategy = require('passport-twitter').Strategy;
  var User = require('../model/user.js');

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, done);
  });

  passport.use(new TwitterStrategy({
    consumerKey: "h9uhL3rrEuaoPEHfhpOifjaQp",
    consumerSecret: "RuZKpHy2YHVH9Ki0KwrNJHvnp8suXtGTuHrgxPALzkKazMUhsm",
    callbackURL: "http://192.168.1.58:9999/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    // console.log(profile);
    User.findOne({id : profile.id},function(err,user){
      console.log(user);
      if(err){
        console.log(err)
        done(err);
      }
      else if(user === null){
        User.create({
          id : profile.id,
          handle : profile.handle,
          token : token,
          tokenSecret : tokenSecret
        });
        done(null,user);
      }
      else{
        console.log(user)
        user.handle = profile.handle,
        user.token = token,
        user.tokenSecret = tokenSecret
        user.save(function(){
          done(null,user);
        })
      }
    })
  }
  ));


  app.get('/auth/twitter', passport.authenticate('twitter'));

  app.get('/auth/twitter/callback', 
    passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/' }));

  console.log("passport is initialized")
}