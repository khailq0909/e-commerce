const mongoose = require('mongoose');
const couponSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    disCount:{
        type: Number,
        required: true,
        unique: true,
    },
    expired:{
        type: Date,
        required: true,
        unique: true, 
    }
})

module.exports = mongoose.model('Coupon', couponSchema);