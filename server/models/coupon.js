const mongoose = require('mongoose');
const couponSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    }
})

module.exports = mongoose.model('Coupon', couponSchema);