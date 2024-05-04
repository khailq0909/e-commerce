const router = require('express').Router();
const ctrls = require('../controllers/authController')

router.post('/register', ctrls.register);
router.get('/login', ctrls.login);


module.exports = router