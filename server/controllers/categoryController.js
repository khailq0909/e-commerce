const Category = require("../models/category")
const asyncHandler = require("express-async-handler")

const createCategory = asyncHandler(async(req,res)=>{
    if(Object.keys(req.body).length === 0) throw new Error("Missing input!!!")
    const category = new Category(req.body)
    const response = await category.save()
    return res.status(200).json({
        success:response ? true : false,
        mes:response ? "Created successfully" : "Failed",
        data: response
    })
})
const deleteCategory = asyncHandler(async(req,res)=>{
    const categoryId = req.params.cid
    if(!categoryId) throw new Error('Category not found')
    await Category.findByIdAndDelete({_id: categoryId})
    return res.status(200).json({
        success:true,
        mes:"Delete category successfully"
    })
});
const updateCategory = asyncHandler(async(req,res)=>{
    const categoryId = req.params.cid
    if(!categoryId) throw new Error('Category not found')
    const response = await Category.findByIdAndUpdate({_id: categoryId},req.body,{new:true})
    return res.status(200).json({
        success:true,
        mes:"Update Success",
        data:response
    })
});
const getOneCategory = asyncHandler(async(req,res)=>{
    const categoryId = req.params.cid
    if(!categoryId) throw new Error('Category not found')
    const response = await Category.findById({_id: categoryId})
    return res.status(200).json({
        success:true,
        data:response
    })
});
const getAllCategorys = asyncHandler(async(req,res)=>{
    const response = await Category.find()
    return res.status(200).json({
        success:true,
        data:response
    })
});

module.exports ={
    createCategory,
    deleteCategory,
    updateCategory,
    getOneCategory,
    getAllCategorys
}