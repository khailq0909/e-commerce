const router = require('express').Router();
const ctrls = require('../controllers/authController')
const {verifyToken} = require('../middlewares/verifyToken')

router.post('/register', ctrls.register);
router.post('/login', ctrls.login);
router.post('/logout', ctrls.logout);
router.post('/refresh-token', ctrls.refreshAccessToken);
router.post('/send-reset-token', ctrls.forgotPassWord);
router.put('/reset-password', ctrls.resetPassWord);
router.get('/account-verify/:token', ctrls.finalRegister);
router.post('/check-otp', ctrls.checkOTP);

module.exports = router