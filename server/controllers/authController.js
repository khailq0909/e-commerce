const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const register = asyncHandler(async(req,res)=>{
    const salt = bcrypt.genSaltSync(10);
    const {email,passWord,firstName,lastName,phone,address,city} = req.body;
    if(!email || !passWord || !firstName || !lastName|| !phone || !address|| !city){
        return res.status(400).json({
            success:false,
            mes:"Missing inputs"
        })
    }
    const passwordhHash = bcrypt.hashSync(req.body.passWord, salt);
    const newUser = new User({
        ...req.body,
        passWord: passwordhHash
    })
    newUser.save();
    return res.status(200).json({
        success:true,
        data: newUser
    })
})

const login = asyncHandler(async (req,res)=>{
    const {email,passWord} = req.body;
    if(!email || !passWord){
        return res.status(400).json({
            success:false,
            mes:"Missing inputs"
        })
    }
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({
            success:false,
            mes:"User not found"
        })
    }
    const isMatch = bcrypt.compareSync(passWord, user.passWord);
    if(!isMatch){
        return res.status(400).json({
            success:false,
            mes:"Wrong password"
        })
    }
    return res.status(200).json({
        success:true,
        data:user
    })
})

module.exports = {
  register,
  login
};
