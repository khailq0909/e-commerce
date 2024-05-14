const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const User = require("../models/user");

const googleAuth = async (req,res)=>{
    // Configure Passport Google Strategy
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET_KEY,
        callbackURL: '/api/auth/google/callback',
        scope:["profile", "email"]
      },
      async (accessToken, refreshToken, profile, callback) => {
        console.log(profile)
        try{
          let user = await User.findOne({email: profile.email})
          if(!user){
            user = new User({
              firstName:profile?.name.familyName,
              lastName:profile?.name.givenName,
              email: profile.email,
              verified: true,
              // avatar: profile.photos[0].value
            }) 
            await user.save()
          }
        }catch(err){
          return callback(err,null);
        }
      }
    )
  );
}
module.exports = googleAuth;
