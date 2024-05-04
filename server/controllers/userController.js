const User = require('../models/user')
const asyncHandler = require('express-async-handler')

const getOneUser = asyncHandler(async(req,res)=>{
    const {_id} = req.user
    const response = await User.findById(_id).select('-reFeshToken -role -passWord')
    return res.status(200).json({
        success:true,
        data:response
    })
})
module.exports = {
    getOneUser,
}