const Brand = require("../models/brand")
const asyncHandler = require("express-async-handler")

const createBrand = asyncHandler(async(req,res)=>{
    if(Object.keys(req.body).length === 0) throw new Error("Missing input!!!")
    const brand = new Brand(req.body)
    const response = await brand.save()
    return res.status(200).json({
        success:response ? true : false,
        mes:response ? "Created successfully" : "Failed",
        data: response
    })
})
const deleteBrand = asyncHandler(async(req,res)=>{
    const brandId = req.params.bid
    if(!brandId) throw new Error('Brand not found')
    await Brand.findByIdAndDelete({_id: brandId})
    return res.status(200).json({
        success:true,
        mes:"Delete brand successfully"
    })
});
const updateBrand = asyncHandler(async(req,res)=>{
    const brandId = req.params.bid
    if(!brandId) throw new Error('Brand not found')
    const response = await Brand.findByIdAndUpdate({_id: brandId},req.body,{new:true})
    return res.status(200).json({
        success:true,
        mes:"Update Success",
        data:response
    })
});
const getOneBrand = asyncHandler(async(req,res)=>{
    const brandId = req.params.bid
    if(!brandId) throw new Error('Brand not found')
    const response = await Brand.findById({_id: brandId})
    return res.status(200).json({
        success:true,
        data:response
    })
});
const getAllBrands = asyncHandler(async(req,res)=>{
    const response = await Brand.find()
    return res.status(200).json({
        success:true,
        data:response
    })
});

module.exports ={
    createBrand,
    deleteBrand,
    updateBrand,
    getOneBrand,
    getAllBrands
}