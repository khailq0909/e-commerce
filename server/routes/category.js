const router = require('express').Router();
const ctrls = require('../controllers/categoryController')
const {verifyToken, verifyAdmin} = require('../middlewares/verifyToken')
router.post('/',[verifyToken,verifyAdmin], ctrls.createCategory)
module.exports = router
