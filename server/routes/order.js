const router = require('express').Router()
const ctrls = require('../controllers/orderController')
const {verifyToken,verifyAdmin} = require("../middlewares/verifyToken")

router.post('/',verifyToken, ctrls.createOrder)
router.put('/order-update-status/:orderId',[verifyAdmin,verifyToken], ctrls.updateOrder)
router.get('/',verifyToken, ctrls.getUserOrder)
router.get('/all-user-order',[verifyToken,verifyAdmin], ctrls.getAllUserOrder)
router.delete('/delete-order',[verifyToken,verifyAdmin], ctrls.deleteOrder)
router.put('/order-cancel',verifyToken, ctrls.cancleOrder)
module.exports = router