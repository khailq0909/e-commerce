const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const sendEmail = require("../ultils/sendEmail");
const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/user");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/jwt");

const googleAuth = async (req, res) => {
  // Configure Passport Google Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET_KEY,
        callbackURL: "/api/auth/google/callback",
        scope: ["profile", "email"],
      },
      async (accessToken, reFreshToken,profile, callback) => {
        console.log("accessToken: " + accessToken)
        console.log("reFreshToken: " + reFreshToken)
        try {
          let user = await User.findOne({
            email: profile?.emails[0]?.value.toString(),
          });
          if (!user) {
            const salt = bcrypt.genSaltSync(10);
            const pass = Math.floor(Math.random() * 9000) + 1000;
            const passwordhHash = bcrypt.hashSync(pass.toString(), salt);
            newUser = await User.create({
              firstName: profile?.name.familyName,
              lastName: profile?.name.givenName,
              passWord: passwordhHash,
              email: profile?.emails[0]?.value.toString(),
              verified: true,
            });
            await newUser.save();
            const html = `
            <h1>Login With Googole Accout Success</h1>
            </br>
            <p>Thank you for using our service this is your account password: ${pass}</p>
            </br>
            <strong>Please change your password as soon as possible</strong>
            `;
            const data = {
              email: newUser.email,
              subject: "Register Account",
              html,
            };
            await sendEmail(data);
          } else {
            callback();
          }
        } catch (err) {
          console.log(err)
        }
      }
    )
  );
};
module.exports = googleAuth;
