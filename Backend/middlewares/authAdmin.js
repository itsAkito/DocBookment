import jwt from 'jsonwebtoken'
const authAdmin=async(req,res,next)=>{
    try{
        const {atoken}= req.headers;
        if(!atoken){
            return res.json({success:false,message: "Not Authorized. Login Again"})
        }
        const token_decode=jwt.verify(atoken,process.env.JWT_SECRET)
        if(token_decode.email!==process.env.ADMIN_EMAIL){
            res.json({success:false,message:"NOt Authorized Login .Try Again"})
        }
        // res,json({success:true,message:"token are verified"})
        next()
    }catch(error){
        console.log("auth error:",error.message);
        res.status(403).json({success:false,message:error.message})
    }
}
export default authAdmin