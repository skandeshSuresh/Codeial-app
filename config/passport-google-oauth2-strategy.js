const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID: "339891985621-0ticvonkiotm52tm5131du0g3k94ca98.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/users/auth/google/callback"
    },

    //find a user
    function(accessToken, refreshToken, profile, done){
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err){
                console.log('error in google-strategy-passport', err);
                return;
            }
            console.log(profile);

            if(user){
                //if found set this user as req.user (sign-in this user)
                return done(null, user);
            }else{
                //if not found, create the user and set it as req.user (sign-in this user)
              User.create({
                  name: profile.displayName,
                  email: profile.emails[0].value,
                  password: crypto.randomBytes(20).toStrinf('hex')
              }, function(err, user){
                  if(err){
                    console.log('error in creating user', err);
                    return;
                  }
                  return done(null, user);
              });  
            }
        });
    }
));

module.exports = passport;