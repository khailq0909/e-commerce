const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    firstName:{type: String, required: true},
    lastName:{type: String, required: true},
    email:{type: String, required: true, unique: true},
    phone:{type: String, required: true},
    passWord:{type: String, required: true},
    address:{type: String, required: true},
    city:{type: String, required: true},
    cart:{type:Array,default:[] },
    role :{type: String, default:"user"},
    wishList:{type: mongoose.Types.ObjectId, ref:"Product"},
    isBlocked:{type: Boolean, default:false},
    reFreshToken:{type: String},
    passWordResetToken:{type: String},
    passWordResetExpires:{type: String},
    passWordChangedAt:{type: String}

},{
    timestamps: true
})
module.exports = mongoose.model('User', userSchema)