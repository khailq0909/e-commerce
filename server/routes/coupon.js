const router = require('express').Router();
const ctrls = require('../controllers/couponController')
const {verifyToken, verifyAdmin} = require('../middlewares/verifyToken')
router.post('/',[verifyToken,verifyAdmin], ctrls.createCoupon)
router.get('/', ctrls.getAllCoupons)
router.put('/:couid',[verifyToken,verifyAdmin], ctrls.updateCoupon)
router.get('/find-coupon/:couid',[verifyToken,verifyAdmin], ctrls.getOneCoupon)
router.delete('/:couid',[verifyToken,verifyAdmin], ctrls.deleteCoupon)

module.exports = router
