const Product = require("../models/product")
const Category = require("../models/category")
const asyncHandler = require("express-async-handler")
const slugify = require("slugify")
const cloudinary = require('cloudinary').v2;

const createProduct = asyncHandler(async(req,res)=>{
    const categoryId = req.body.categoryId
    const customerTypesId = req.body.customerTypesId
    const imagesUploaded = req.files
    const imageUrls =[]
    const imageFileName = []
    imagesUploaded?.forEach(item=>{
        imageFileName.push(item.filename)
        imageUrls.push(item.path)
    })
    if(Object.keys(req.body).length === 0) throw new Error("Missing input!!!")
    if(req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const product = new Product({...req.body, images: imageUrls, imagefilenames: imageFileName})
    const response = await product.save()
    const category = await Category.findById({_id: categoryId})
    if(!category) throw new Error('Category not found')
        console.log(customerTypesId)
    const customerTypes = category.customerTypes.id(customerTypesId)
    if(!customerTypes) throw new Error("not found customer type")
    customerTypes.products.push(response._id)
    await category.save()
    return res.status(200).json({
        success:response ? true : false,
        mes:response ? "Created successfully" : "Failed",
        data:{
            category: category,
            product: response
        }
    })
})
const deleteProduct = asyncHandler(async(req,res)=>{
    const productId = req.params.id
    if(!productId) throw new Error('Product not found')
    await Product.findByIdAndDelete({_id: productId})
    return res.status(200).json({
        success:true,
        mes:"Delete product successfully"
    })
});
const updateProduct = asyncHandler(async(req,res)=>{
    const productId = req.params.id
    if(!productId) throw new Error('Product not found')
    if(req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const response = await Product.findByIdAndUpdate({_id: productId},req.body,{new:true})
    return res.status(200).json({
        success:true,
        mes:"Update Success",
        data:response
    })
});
const getOneProduct = asyncHandler(async(req,res)=>{
    const productId = req.params.id
    if(!productId) throw new Error('Product not found')
    const response = await Product.findById({_id: productId})
    return res.status(200).json({
        success:true,
        data:response
    })
});
const getAllProducts = asyncHandler(async(req,res)=>{
    const queries = {...req.query}
    const excludeFields = ['limit','sort', 'page', 'fields']
    excludeFields.forEach(el => delete queries[el])

    let queryString = JSON.stringify(queries)
    queryString= queryString.replace(/\b(gte|gt|lt|lte)\b/g, matchedEl => `$${matchedEl}`)
    const formatedQueries = JSON.parse(queryString)
    //Filtering
    if(queries?.title) formatedQueries.title = {$regex: queries.title, $options: "i"}
    try {
        let queryCommand = Product.find(formatedQueries);

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
        const counts = await Product.countDocuments(formatedQueries);

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
    // const response = await Product.find();
    // return res.status(200).json({
    //     success:true,
    //     data:response
    // })
});
const ratings = asyncHandler(async(req,res)=>{
    const {_id} = req.user
    const {productId, star, comment }= req.body
    if(!star, !comment) throw new Error('Missing input!!!')
    const product = await Product.findById({_id:productId})
    if (product) {
      const alreadyComment = product.ratings.find(
        (product) => product.postedBy.toString() === _id.toString()
      );
      if(!alreadyComment){
        const rating = {
          star,
          comment,
          postedBy: _id,
        };
        product.ratings.push(rating);
        const sumRating =  product.ratings.reduce((acc, item) => item.star + acc, 0);
        const ratingCount = product.ratings.length;
        product.totalRatings = Math.round(sumRating*10/ratingCount)/10
        await product.save();
        return res.status(200).json({
          success: true,
          data: product,
        });
      }else{
        return res.status(400).json({
            success:false,
            mes:"You already comment this product"
        })
    }
    }
})

const uploadProductImageUrls = asyncHandler(async(req,res)=>{
    console.log(imagesUploaded)
    return res.json("Uploaded")
})
module.exports ={
    uploadProductImageUrls,
    createProduct,
    deleteProduct,
    updateProduct,
    getOneProduct,
    getAllProducts,
    ratings
}