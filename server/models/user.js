const mongoose = require('mongoose');
const crypto = require("crypto");
const { type } = require('os');

var userSchema = new mongoose.Schema({
    firstName:{type: String, required: true},
    lastName:{type: String, required: true},
    email:{type: String, required: true, unique: true},
    phone:{type: String},
    passWord:{type: String, required: true},
    address:{
        type: Array,
        default: []
    },
    city:{type: String},
    cart:[{
        product:{type: mongoose.Types.ObjectId, ref:"Product"},
        quantity:{type: Number, default: 0},
        color:{type: String}
    }],
    role :{type: String, default:"user"},
    wishList:{type: mongoose.Types.ObjectId, ref:"Product"},
    tokenVerify:{type: String},
    isVerified:{type: Boolean, default: false},
    isBlocked:{type: Boolean, default:false},
    reFreshToken:{type: String},
    passWordResetToken:{type: String},
    passWordResetExpires:{type: String},
    passWordChangedAt:{type: String}
},{
    timestamps: true
})
userSchema.methods ={
    createPassWordChangeToken: function(){
        this.passWordResetToken = Math.floor(Math.random() * 9000) + 1000;
        this.passWordResetExpires = Date.now() + 15 * 60 * 1000;
        return this.passWordResetToken;
    }
}
module.exports = mongoose.model('User', userSchema)