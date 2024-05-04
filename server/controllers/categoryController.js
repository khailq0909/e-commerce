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
const deleteProduct = asyncHandler(async(req,res)=>{});
const updateProduct = asyncHandler(async(req,res)=>{});
const getOneProduct = asyncHandler(async(req,res)=>{});
const getAllProducts = asyncHandler(async(req,res)=>{
});

module.exports ={
    createCategory,
    deleteProduct,
    updateProduct,
    getOneProduct,
    getAllProducts
}