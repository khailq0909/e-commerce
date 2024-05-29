const Category = require("../models/category")
const asyncHandler = require("express-async-handler")
const slugify = require("slugify")


const createCategory = asyncHandler(async(req,res)=>{
    if(Object.keys(req.body).length === 0) throw new Error("Missing input!!!")
    if(req.body && req.body.title) req.body.slug = slugify((req.body.title).toString().toLowerCase())
    if(req.body && req.body.customerTypes) (req.body.customerTypes).toString().toLowerCase()
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
    const queries = {...req.query}
    const excludeFields = ['limit','sort', 'page', 'fields']
    excludeFields.forEach(el => delete queries[el])

    let queryString = JSON.stringify(queries)
    queryString= queryString.replace(/\b(gte|gt|lt|lte)\b/g, matchedEl => `$${matchedEl}`)
    const formatedQueries = JSON.parse(queryString)
    //Filtering
    if(queries?.slug) formatedQueries.slug = {$regex: queries.slug, $options: "i"}
    try {
        let queryCommand = Category.find(formatedQueries).populate('customerTypes.products');

        if(req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            queryCommand = queryCommand.sort(sortBy)
        }
        if(req.query.fields){
            const fields = req.query.fields.split(',').join(' ');
            queryCommand = queryCommand.select(fields)
        }
        const page = +req.query.page || 1
        const limit = +req.query.limit;
        const skip = (page -1 )*limit
        queryCommand.skip(skip).limit(limit)

        // Execute the query and await the response
        const response = await queryCommand;

        // Get total count of documents matching the search criteria
        const counts = await Category.countDocuments(formatedQueries);
        return res.status(200).json({
            success: true,
            counts: counts,
            page: page,
            limit: limit,
            data: response,
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
});
const newCustomerTypes = asyncHandler(async(req,res)=>{
    const categoryId = req.params.cid
    if(!categoryId) throw new Error('Category not found')
    const response = await Category.findById({_id: categoryId})
    if(!response) throw new Error('Category not found')
    if(req.body && req.body.customerTypes) (req.body.customerTypes).toString().toLowerCase()
    response.customerTypes.push(req.body.customerTypes)
    await response.save()
    return res.status(200).json({
        success:true,
        mes:"Update Success",
        data:response
    })
})

module.exports ={
    createCategory,
    deleteCategory,
    updateCategory,
    getOneCategory,
    getAllCategorys,
    newCustomerTypes
}