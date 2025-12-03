import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js"

export const protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ success: false, message: 'No token' })
        }
        // const token = rawtoken.startsWith('Bearer') ? rawtoken.split(' ')[1]
        //     : rawtoken;

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded.id).select('-password')
        if (!user) {
            return res.status(404).json({ success: false, message: 'user not found' });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid Token' })
    }
}