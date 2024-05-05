const router = require('express').Router();
const ctrls = require('../controllers/categoryController')
const {verifyToken, verifyAdmin} = require('../middlewares/verifyToken')
router.post('/',[verifyToken,verifyAdmin], ctrls.createCategory)
router.get('/', ctrls.getAllCategorys)
router.put('/:cid',[verifyToken,verifyAdmin], ctrls.updateCategory)
router.get('/find-category/:cid',[verifyToken,verifyAdmin], ctrls.getOneCategory)
router.delete('/:cid',[verifyToken,verifyAdmin], ctrls.deleteCategory)

module.exports = router
