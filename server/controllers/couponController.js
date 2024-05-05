const Coupon = require("../models/coupon")
const asyncHandler = require("express-async-handler")

const createCoupon = asyncHandler(async(req,res)=>{
    if(Object.keys(req.body).length === 0) throw new Error("Missing input!!!")
    const coupon = new Coupon(req.body)
    const response = await coupon.save()
    return res.status(200).json({
        success:response ? true : false,
        mes:response ? "Created successfully" : "Failed",
        data: response
    })
})
const deleteCoupon = asyncHandler(async(req,res)=>{
    const couponId = req.params.couid
    if(!couponId) throw new Error('Brand not found')
    await Coupon.findByIdAndDelete({_id: couponId})
    return res.status(200).json({
        success:true,
        mes:"Delete coupon successfully"
    })
});
const updateCoupon = asyncHandler(async(req,res)=>{
    const couponId = req.params.couid
    if(!couponId) throw new Error('Coupon not found')
    const response = await Coupon.findByIdAndUpdate({_id: couponId},req.body,{new:true})
    return res.status(200).json({
        success:true,
        mes:"Update Success",
        data:response
    })
});
const getOneCoupon = asyncHandler(async(req,res)=>{
    const couponId = req.params.couid
    if(!couponId) throw new Error('Brand not found')
    const response = await Coupon.findById({_id: couponId})
    return res.status(200).json({
        success:true,
        data:response
    })
});
const getAllCoupons = asyncHandler(async(req,res)=>{
    const response = await Coupon.find()
    return res.status(200).json({
        success:true,
        data:response
    })
});

module.exports ={
    createCoupon,
    deleteCoupon,
    updateCoupon,
    getOneCoupon,
    getAllCoupons
}