const User = require("../models/user");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const {generateAccessToken,generateRefreshToken} = require("../middlewares/jwt")
const sendEmail = require("../ultils/sendEmail")
const crypto = require("crypto");

const register = asyncHandler(async(req,res)=>{
    const salt = bcrypt.genSaltSync(10);
    const {email,passWord,firstName,lastName,phone,address,city} = req.body;
    if(!email || !passWord || !firstName || !lastName|| !phone || !address|| !city){
        return res.status(400).json ({
            success:false,
            mes:"Missing inputs"
        })
    }
    const user = await User.findOne({email:email})
    if(user){
        console.log("cannot create user", user)
        throw new Error('User has exited!')
    }else{
        const passwordhHash = bcrypt.hashSync(req.body.passWord, salt);
        const newUser = new User({
            ...req.body,
            passWord: passwordhHash
        })
        newUser.save();
        return res.status(200).json({
            success:newUser ? true:false,
            mes: newUser ? "User created success":"Something went wrong",
            data: newUser
        })
    }
})

const login = asyncHandler(async (req,res)=>{
    const {email,passWord} = req.body;
    if(!email || !passWord){
        return res.status(400).json({
            success:false,
            mes:"Missing inputs"
        })
    }
    const response = await User.findOne({email});
    if(!response) return res.status(400).json({
        success:false,
        mes:"User not found"
    })
    const isMatch = bcrypt.compareSync(passWord, response.passWord);
    if(!isMatch) return res.status(400).json({
        success:false,
        mes:"Wrong password"
    })
    if(response && isMatch){
        const {passWord,role, ...userData} =  response.toObject();
        const accessToken = generateAccessToken(response._id,role)
        const reFreshToken = generateRefreshToken(response._id)
        await User.findByIdAndUpdate({_id: response._id},{reFreshToken},{new: true})
        res.cookie('reFreshToken',reFreshToken,{
            httpOnly:true,
            maxAge: 1000*60*60*24*7
        })
        return res.status(200).json({
            success:true,
            mes:"Login success",
            userData,
            accessToken
        })
}})
const logout = asyncHandler(async(req,res)=>{
    const cookie = req.cookies;
    if(!cookie || !cookie.reFreshToken) throw new Error('No refresh token');
    await User.findOneAndUpdate({reFreshToken:cookie.reFreshToken},{reFreshToken: ""}, {new: true})
    res.clearCookie('reFreshToken',{
        httpOnly: true,
        secure: true
    })
    return res.status(200).json({
        success:true,
        mes:"Logout success"
    })
})

const forgotPassWord = asyncHandler(async(req,res)=>{
    const {email} = req.body;
    if(!email) throw new Error('Missing email!!!')
    const user = await User.findOne({email});
    if(!user)throw new Error('User not found');

    const resetToken = user.createPassWordChangeToken();
    await user.save();
    const html = `
    <h1>Reset password link</h1>
    </br>
    <p>Please click this link to reset your app password</p>
    </br>
    <strong>This link will expried in 15 munites fron now, please use this link as soon as possible</strong>
    <a href=${process.env.SERVER_URL}/api/auth/reset-password/${resetToken}>Click Here</a>
    `

    const data = {
        email: email,
        subject: "Reset password",
        html
    }
    const rs = await sendEmail(data)
    return res.status(200).json({
        status: true,
        rs
    })
});
const resetPassWord = asyncHandler(async (req, res) => {
    const {resetToken, passWord} = req.body;
    const salt = bcrypt.genSaltSync(10);
    if(!passWord || !resetToken) throw new Error('Missing input!!!')

    const user = await User.findOne({passWordResetToken:resetToken,passWordResetExpires:{$gt: Date.now()}})
    if(!user) throw new Error('Invalid reset token!!!')
    const passwordhHash = bcrypt.hashSync(passWord, salt);
    user.passWord = passwordhHash;
    user.passWordResetToken = "";
    user.passWordResetExpires = "";
    user.passWordChangedAt = new Date(Date.now());

    await user.save();
    return res.status(200).json({
        success: user?true:false,
        mes: user? "Passwords updated successfully":"Something went wrong"
    })
})
const refreshAccessToken = asyncHandler(async(req,res)=>{
    const cookie = req.cookies;
    if(!cookie && !cookie.reFreshToken) throw new Error('No refresh token in cookies')
    const tokenRes = await jwt.verify(cookie.reFreshToken, process.env.JWT_SECRET);
    const response = await User.findOne({_id: tokenRes._id, reFreshToken: cookie.reFreshToken})
    return res.status(200).json({
        success: response ? true : false,
        newAccessToken: response ? generateAccessToken(response._id, response.role) : "refresh token invalid"
    })
})

module.exports = {
  register,
  login,
  logout,
  forgotPassWord,
  resetPassWord,
  refreshAccessToken
};
