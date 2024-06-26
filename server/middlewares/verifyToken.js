const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const verifyToken = asyncHandler(async(req,res,next)=>{
    if(req?.headers.authorization?.startsWith('Bearer')){
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token,process.env.JWT_SECRET,(err, decode)=>{
            if(err) return res.status(401).json({
                success:false,
                mes:"Invalid token"
            })
            console.log(decode),
            req.user = decode;
            next();
        });
    }else{
        return res.status(401).json({
            success:false,
            mes:"Required authorization!!!"
        })
    }
})
const verifyAdmin = asyncHandler(async(req,res,next)=>{
    const {role} = req.user;
    if(role !== 'admin') return res.status(401).json({
        success:false,
        mes:"You are not admin"
    })
    next();
});
module.exports = {
    verifyToken,
    verifyAdmin
}