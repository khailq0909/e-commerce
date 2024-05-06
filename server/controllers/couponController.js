const Coupon = require("../models/coupon")
const asyncHandler = require("express-async-handler")

const createCoupon = asyncHandler(async(req,res)=>{
    const {title,disCount,expired} = req.body
    console.log(req.body)
    if(!title||!disCount||!expired) throw new Error("Missing input!!!")
    const response = await Coupon.create({
        ...req.body,
        expired: Date.now() + +expired *24*60*60*1000
    })
    return res.json({
        success:response?true:false,
        mes:response?"Create Success":"Create Failure",
        data:response
    })
})
const deleteCoupon = asyncHandler(async(req,res)=>{
    const couponId = req.params.couid
    const response =  await Coupon.findByIdAndDelete({_id: couponId})
    return res.json({
        success:response?true:false,
        mes:response?"Delete Success":"Delete Failure",
        data:response
    })
});
const updateCoupon = asyncHandler(async(req,res)=>{
    const couponId = req.params.couid
    if(await Coupon.findById({_id: couponId}))
    if(Object.keys(req.body).length == 0) throw new Error('Missing input!!!')
    if(req.body.expired) req.body.expired = Date.now() + +req.body.expired *24*60*60*1000
    const response = await Coupon.findByIdAndUpdate({_id: couponId},req.body,{new:true})
    return res.json({
        success:response?true:false,
        mes:response?"Update Success":"Update Failure",
        data:response
    })
});
const getOneCoupon = asyncHandler(async(req,res)=>{
    const couponId = req.params.couid
    if(!couponId) throw new Error('Coupon not found')
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