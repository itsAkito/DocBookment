import jwt from 'jsonwebtoken'
const authDoctor = async (req, res, next) => {
    try {
        const  token  = req.headers.dtoken;
        if (!token) {
            return res.json({ success: false, message: "Not Authorized. Login Again" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { id: decoded.id, email: decoded.email };

        // res,json({success:true,message:"token are verified"})
        next()
    } catch (error) {
        console.log("auth error:", error.message);
        res.status(403).json({ success: false, message: error.message })
    }
}
export default authDoctor