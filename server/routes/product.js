const router = require('express').Router();
const ctrls = require('../controllers/productController')
const {verifyToken, verifyAdmin} = require('../middlewares/verifyToken')
router.post('/',[verifyToken,verifyAdmin], ctrls.createProduct)
router.get('/find-product/:id', ctrls.getOneProduct)
router.delete('/delete-product/:id',[verifyToken,verifyAdmin], ctrls.deleteProduct)
router.put('/update-product/:id',[verifyToken,verifyAdmin], ctrls.updateProduct)
router.get('/find-products', ctrls.getAllProducts)
router.put('/product-rating',verifyToken, ctrls.ratings)


module.exports = router
