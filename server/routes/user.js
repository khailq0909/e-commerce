const router = require('express').Router();
const ctrls = require('../controllers/userController')
const {verifyToken, verifyAdmin} = require('../middlewares/verifyToken')

router.get('/find-user/:id',verifyToken, ctrls.getOneUser);
router.put('/update-user/:id',verifyToken, ctrls.updateUser);
router.put('/admin-update-user/:id',[verifyToken,verifyAdmin], ctrls.updateUser);
router.get('/',[verifyToken,verifyAdmin], ctrls.getAllUsers);
router.delete('/delete-user/:id',[verifyToken, verifyAdmin], ctrls.deleteUser);
router.put('/update-adress',verifyToken, ctrls.updateAdress);
router.put('/update-cart',verifyToken, ctrls.updateCart);



module.exports = router