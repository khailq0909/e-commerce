const mongoose = require('mongoose');
const brandSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    }
})

module.exports = mongoose.model('Brand', brandSchema);