const router = require('express').Router();
const ctrls = require('../controllers/authController')
const passport = require('passport');
const {verifyToken} = require('../middlewares/verifyToken')


router.post('/register', ctrls.register);
router.post('/login', ctrls.login);
router.post('/logout', ctrls.logout);
router.post('/refresh-token', ctrls.refreshAccessToken);
router.post('/send-reset-token', ctrls.forgotPassWord);
router.put('/reset-password', ctrls.resetPassWord);
router.get('/account-verify/:token', ctrls.finalRegister);
router.post('/check-otp', ctrls.checkOTP);
router.get('/login/success', ctrls.googleLogin)
router.get('/login/failed', ctrls.googleLoginFailed)
router.get('/google/callback', passport.authenticate('google', { successRedirect: process.env.CLIENT_URL,failureRedirect:"/login/failed" }));
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

module.exports = router