const product = require('../models/product')
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
const updateAdress = asyncHandler(async(req,res)=>{
    const {_id} = req.user
    const address = req.body.address
    if(!address) throw new Error('Missing input!!!')
    const response = await User.findByIdAndUpdate({_id},{$push:{address: address}},{new:true})
    return res.status(200).json({
        success:true,
        mes:"Update Success",
        data:response
    })
})

const updateCart = asyncHandler(async(req,res)=>{
    const {_id} = req.user
    const {productId, quantity, color} = req.body
    if(!productId || !quantity|| !color) throw new Error('Missing input!!!')

    const user = await User.findById(_id).select('cart')
    const alreadyProduct = user?.cart?.find(prod => prod.product.toString() === productId)
    if(alreadyProduct){
        if(alreadyProduct.color === color){
            console.log("same color")

            const response = await User.updateOne({cart: {$elemMatch : alreadyProduct}},{$set: {"cart.$.quantity":quantity}},{$new : true})
            return res.status(200).json({
                success:true,
                mes:"Update Success",
                data:response
            })
        }else{
            console.log("different color")
            const response = await User.findByIdAndUpdate({_id},{$push:{cart:{product: productId, quantity: quantity, color: color}}},{new:true})
        return res.status(200).json({
            success:true,
            mes:"Update Success",
            data:response
        })
        }
    }else{
        const response = await User.findByIdAndUpdate({_id},{$push:{cart:{product: productId, quantity: quantity, color: color}}},{new:true})
        return res.status(200).json({
            success:true,
            mes:"Update Success",
            data:response
        })
    } 
})
module.exports = {
    getOneUser,
    getAllUsers,
    deleteUser,
    updateUser,
    updateUserByAdmin,
    updateAdress,
    updateCart,
}