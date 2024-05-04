const User = require('../models/user')
const asyncHandler = require('express-async-handler')

const getOneUser = asyncHandler(async(req,res)=>{
    const userId = req.params.id
    const response = await User.findById({_id: userId}).select('-reFreshToken -role -passWord')
    return res.status(200).json({
        success:true,
        data:response
    })
})
const getAllUsers = asyncHandler(async(req,res)=>{
    const page = parseInt(req.query.page) -1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = parseInt(req.query.search) || "";
    const users = await User.find({email: { $regex: new RegExp(search, "i") }}).select('-reFreshToken -role -passWord')
    .skip(page*limit).limit(limit)
    const total = await User.countDocuments({email: { $regex: new RegExp(search, "i") }})
    const response = {
        error:false,
        total:total,
        page: page+1,
        limit,
        data:users
    }
    // const response = await User.find()
    return res.status(200).json({
        success:true,
        data:response
    })
})

const deleteUser = asyncHandler(async(req,res)=>{
    const userId = req.params.id
    if(!userId) throw new Error('User not found')
    const response = await User.findByIdAndDelete({_id: userId})
    return res.status(200).json({
        success:true,
        mes:"Delete user successfully"
    })
})
const updateUser = asyncHandler(async(req,res)=>{
    const userId = req.user
    if(!userId) throw new Error('User not found')
    const response = await User.findByIdAndUpdate({_id: userId},req.body,{new:true}).select('-passWord -role')
    return res.status(200).json({
        success:true,
        mes:"Update Success",
        data:response
    })
})
const updateUserByAdmin = asyncHandler(async(req,res)=>{
    const userId = req.body
    if(!userId) throw new Error('User not found')
    const response = await User.findByIdAndUpdate({_id: userId},req.body,{new:true}).select('-passWord -role -reFreshToken')
    return res.status(200).json({
        success:true,
        mes:"Update Success",
        data:response
    })
})
module.exports = {
    getOneUser,
    getAllUsers,
    deleteUser,
    updateUser,
    updateUserByAdmin
}