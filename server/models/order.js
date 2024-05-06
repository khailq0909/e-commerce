const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    products:[{
        product:{ type: mongoose.Types.ObjectId,ref:"Product"},
        counts: {type: Number},
        color:{type:String}
    }],
    status:{
        type: String,
        default: "Processing",
        enum:["Processing", "Cancelled", "Completed"]
    },
    orderBy:{
        type: mongoose.Types.ObjectId,
        ref:"User",
        required: true
    },
    total: Number,
    coupon:{
        type: mongoose.Types.ObjectId,
        ref:"Coupon"
    }
    
})

module.exports = mongoose.model('Order', orderSchema);