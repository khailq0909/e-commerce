const User = require("../models/user");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/jwt");
const sendEmail = require("../ultils/sendEmail");
const crypto = require("crypto");
const { error } = require("console");

const register = asyncHandler(async (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const { email, passWord, firstName, lastName, phone } = req.body;
  if (!email || !passWord || !firstName || !lastName || !phone) {
    return res.status(400).json({
      success: false,
      mes: "Missing inputs",
    });
  }
  const user = await User.findOne({ email: email });
  if (user) {
    throw new Error("User has exited!");
  } else {
    const tokenVerify = crypto.randomBytes(10).toString("hex");
    const passwordhHash = bcrypt.hashSync(req.body.passWord, salt);
    const dataUser = {
      tokenVerify: tokenVerify,
      ...req.body,
      passWord: passwordhHash,
    };
    res.cookie("dataUserRegister", dataUser, {
      httpOnly: true,
      maxAge: 15 + 60 * 1000,
      secure: true,
    });
    const html = `
    <h1>Confirm Email</h1>
    </br>
    <p>Please click this link to confirm your account</p>
    </br>
    <strong>This link will expried in 15 munites fron now, please use this link as soon as possible</strong>
    <a href=${process.env.SERVER_URL}/api/auth/account-verify/${tokenVerify}>Click Here</a>
    `;
    const data = {
      email: email,
      subject: "Confirm Email",
      html,
    };
    const rs = await sendEmail(data);
    return res.status(200).json({
      success: rs?true:false,
      mes: rs?"Please check your email to confirm your account":"Cannot send email",
    });
  }
});

const finalRegister = asyncHandler(async(req,res)=>{
    const tokenVerify = req.params.token
    const userData = req.cookies
    if(!tokenVerify) throw new Error("Confirm failed");
    if(tokenVerify === userData?.dataUserRegister?.tokenVerify){
        await User.create(userData?.dataUserRegister)
        res.clearCookie("dataUserRegister")
        res.redirect(`${process.env.CLIENT_URL}/verify-account/success`)

    }else{
        res.clearCookie("dataUserRegister")
        res.redirect(`${process.env.CLIENT_URL}/verify-account/failed`)
    }
})
const login = asyncHandler(async (req, res) => {
  const { email, passWord } = req.body;
  console.log(email, passWord);
  if (!email || !passWord) throw new Error("Missing input !!!")
  const response = await User.findOne({ email });
  if (!response) throw new Error("User not found !!!")
  const isMatch = bcrypt.compareSync(passWord, response.passWord);
  if (!isMatch) throw new Error("Wrong email or password !!!")
  if (response && isMatch) {
    const { passWord, role, reFreshToken, ...userData } = response.toObject();
    const accessToken = generateAccessToken(response._id, role);
    const newreFreshToken = generateRefreshToken(response._id);
    await User.findByIdAndUpdate(
      { _id: response._id },
      { reFreshToken },
      { new: true }
    );
    res.cookie("reFreshToken", newreFreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: "none",
      secure: true,
    });
    return res.status(200).json({
      success: true,
      accessToken,
      mes: "Login success",
      userData,
    });
  }
});
const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  console.log(cookie);
  if (!cookie || !cookie.reFreshToken) throw new Error("No refresh token");
  await User.findOneAndUpdate(
    { reFreshToken: cookie.reFreshToken },
    { reFreshToken: "" },
    { new: true }
  );
  res.clearCookie("reFreshToken", {
    httpOnly: true,
    secure: true,
  });
  return res.status(200).json({
    success: true,
    mes: "Logout success",
  });
});

const forgotPassWord = asyncHandler(async (req, res) => {
  const {email} = req.body;
  console.log(email)
  if (!email) throw new Error("Missing email!!!");
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const resetToken = user.createPassWordChangeToken();
  await user.save();
  const html = `
    <p>Please use this code reset your app password</p>
    </br>
    <strong>This OTP will expried in 15 munites fron now, please use this code as soon as possible</strong>
    
    `;

  const data = {
    email: email,
    subject: `Reset password code: ${resetToken}`,
    html,
  };
  const rs = await sendEmail(data);
  return res.status(200).json({
    status: true,
    rs,
  });
});
const checkOTP = asyncHandler(async(req,res)=>{
  const {resetToken} = req.body
  if (!resetToken) throw new Error("Missing input!!!");
  const user = await User.findOne({
    passWordResetToken: resetToken,
    passWordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Invalid reset token!!!");
  return res.status(200).json({
    success: user ? true : false,
    mes: user ? "Valid OTP" : "Invalid OTP",
  });
})
const resetPassWord = asyncHandler(async (req, res) => {
  const { passWord, email } = req.body;
  console.log(req.body)
  const salt = bcrypt.genSaltSync(10);
  if (!passWord || !email) throw new Error("Missing input!!!");

  const user = await User.findOne({email});
  if (!user) throw new Error("Invalid reset token!!!");
  const passwordhHash = bcrypt.hashSync(passWord, salt);
  user.passWord = passwordhHash;
  user.passWordResetToken = "";
  user.passWordResetExpires = "";
  user.passWordChangedAt = new Date(Date.now());

  const html = `
    <p>Your password has been changed at <strong>${user?.passWordChangedAt}</strong></p>
    </br>
    <p>Thank you for using our service</p>
    </br>
    <p>Best regard!</p>
    `;

  const data = {
    email: user.email,
    subject: `Password Chenged`,
    html,
  };
  const rs = await sendEmail(data);
  await user.save();
  return res.status(200).json({
    success: user ? true : false,
    mes: user ? "Passwords updated successfully" : "Something went wrong",
  });
});
const refreshAccessToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie && !cookie.reFreshToken)
    throw new Error("No refresh token in cookies");
  const tokenRes = await jwt.verify(
    cookie.reFreshToken,
    process.env.JWT_SECRET
  );
  const response = await User.findOne({
    _id: tokenRes._id,
    reFreshToken: cookie.reFreshToken,
  });
  return res.status(200).json({
    success: response ? true : false,
    newAccessToken: response
      ? generateAccessToken(response._id, response.role)
      : "refresh token invalid",
  });
});
const googleLogin = asyncHandler(async (req, res) => {
  if(req.user){
    return res.status(200).json({
      error: false,
      mes: "Login successful",
      user: req.user
    })
  }else throw new Error("Login failed");
})
const googleLoginFailed = asyncHandler(async (req, res) => {
  return res.status(400).json({
    error: true,
    mes: "Login failed",
  })
})
module.exports = {
  register,
  login,
  logout,
  forgotPassWord,
  resetPassWord,
  refreshAccessToken,
  finalRegister,
  checkOTP,
  googleLogin,
  googleLoginFailed,
};
