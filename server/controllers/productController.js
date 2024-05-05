const Product = require("../models/product")
const asyncHandler = require("express-async-handler")
const slugify = require("slugify")
const Category = require("../models/category")

const createProduct = asyncHandler(async(req,res)=>{
    if(Object.keys(req.body).length === 0) throw new Error("Missing input!!!")
    if(req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const product = new Product(req.body)
    const response = await product.save()
    return res.status(200).json({
        success:response ? true : false,
        mes:response ? "Created successfully" : "Failed",
        data: response
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
    // const search = req.query.search || "";
    // const page = parseInt(req.query.page) -1 || 0;
    // const limit = parseInt(req.query.limit) || 5;
    // let sort = req.query.sort || "price";
    // let category = req.query.category || "All"

    // const categoryOptions = await Category.find()
    // categoryOptions.forEach((item)=>{
    //     console.log(item.name)
    // })
    // category === 'All' ?(category = [...categoryOptions]) : (category = req.query.category);
    // req.query.sort ? (sort = req.query.sort.split(',')) : (sort = [sort])
    // let sortBy = {};
    // if(sort[1]){
    //     sortBy[sort[0]] = sort[1]
    // }else{
    //     sortBy[sort[0]] = "asc"
    // }
    // const products = await Product.find({title: { $regex: new RegExp(search, "i") }}).where("category").all([...category]).sort(sortBy).skip(page*limit).limit(limit)
    // const total = await Product.countDocuments({title: { $regex: new RegExp(search, "i") }, category:{$all:[...category]}})
    // const response = {
    //     error: false,
    //     total:total,
    //     page: page+1,
    //     limit,
    //     data:products
    // }
    const response = await Product.find();
    return res.status(200).json({
        success:true,
        data:response
    })
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
module.exports ={
    createProduct,
    deleteProduct,
    updateProduct,
    getOneProduct,
    getAllProducts,
    ratings
}