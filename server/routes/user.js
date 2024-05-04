const router = require('express').Router();
const ctrls = require('../controllers/userController')
const {verifyToken} = require('../middlewares/verifyToken')

router.get('/find-user',verifyToken, ctrls.getOneUser);
router.get('/find-all-users',verifyToken, ctrls.getAllUsers);


module.exports = router