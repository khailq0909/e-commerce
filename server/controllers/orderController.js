const Order = require("../models/order")
const asyncHandler = require("express-async-handler")
const User = require("../models/user")
const Coupon = require("../models/coupon")

const createOrder = asyncHandler(async(req,res)=>{
    const {_id} = req.user
    const {coupon} = req.body
    const userCart = await User.findById(_id).select('cart').populate('cart.product', 'title price')
    const products = userCart?.cart?.map((item)=>({
        product: item.product._id,
        count: item.quantity,
        color: item.color

    }))
    let total = userCart?.cart?.reduce((acc,item)=> item.product.price * item.quantity + acc,0);
    let createData ={products, total, orderBy: _id}
    if(coupon){
        const selectedCoupon = await Coupon.findById(coupon)
        total = Math.round(total * (1- +selectedCoupon?.disCount /100)/1000) * 1000
        createData.total = total
        createData.coupon = coupon
    }
    const rs = (await Order.create(createData))
    return res.json({
        success:rs?true:false,
        data:rs?rs:"Cannot create order"
    })
})
const updateOrder = asyncHandler(async(req,res)=>{
    const {orderId} = req.params
    const {status} = req.body
    const rs = await Order.findOneAndUpdate({_id: orderId}, {status}, {new:true})
    return res.json({
        success:rs?true:false,
        data:rs?rs:"Cannot update order"
    })
})
const getUserOrder = asyncHandler(async(req,res)=>{
    const userId = req.body.userId
    const rs = await Order.find({orderBy:userId})
    return res.json({
        success:rs?true:false,
        data:rs?rs:"Cannot get order"
    })
})
const getAllUserOrder = asyncHandler(async (req,res)=>{
    const rs = await Order.find()
    return res.json({
        success:rs?true:false,
        data:rs?rs:"Cannot get all order"
    })
})
const deleteOrder = asyncHandler(async(req,res)=>{
    const {orderId} = req.params
    const rs = await Order.findByIdAndDelete({_id: orderId})
    return res.json({
        success:rs?true:false,
        data:rs?rs:"Cannot delete order"
    })
})
const cancleOrder = asyncHandler(async(req,res)=>{
    const {orderId} = req.params
    const rs = await Order.findOneAndUpdate({_id: orderId}, {status:"Cancelled"}, {new:true})
    return res.json({
        success:rs?true:false,
        data:rs?rs:"Cannot cancle order"
    })
})
module.exports = {
    createOrder,
    updateOrder,
    getUserOrder,
    getAllUserOrder,
    deleteOrder,
    cancleOrder,
}