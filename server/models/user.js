const mongoose = require('mongoose');
const crypto = require("crypto");

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
userSchema.methods ={
    createPassWordChangeToken: function(){
        const token = crypto.randomBytes(32).toString('hex');
        this.passWordResetToken = crypto.createHash('sha256').update(token).digest('hex');
        this.passWordResetExpires = Date.now() + 15 * 60 * 1000;
        return this.passWordResetToken;
    }
}
module.exports = mongoose.model('User', userSchema)