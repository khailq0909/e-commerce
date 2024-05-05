const router = require('express').Router();
const ctrls = require('../controllers/brandController')
const {verifyToken, verifyAdmin} = require('../middlewares/verifyToken')
router.post('/',[verifyToken,verifyAdmin], ctrls.createBrand)
router.get('/', ctrls.getAllBrands)
router.put('/:bid',[verifyToken,verifyAdmin], ctrls.updateBrand)
router.get('/find-brand/:bid',[verifyToken,verifyAdmin], ctrls.getOneBrand)
router.delete('/:bid',[verifyToken,verifyAdmin], ctrls.deleteBrand)

module.exports = router
