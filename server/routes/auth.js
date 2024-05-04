const router = require('express').Router();
const ctrls = require('../controllers/authController')
const {verifyToken} = require('../middlewares/verifyToken')

router.post('/register', ctrls.register);
router.get('/login', ctrls.login);
router.post('/logout',verifyToken, ctrls.logout);
router.post('/refresh-token', ctrls.refreshAccessToken);
router.post('/reset-password', ctrls.resetPassWord);



module.exports = router