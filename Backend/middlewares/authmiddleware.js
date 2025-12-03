import jwt from 'jsonwebtoken'
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    // const token = authHeader && authHeader.split(' ')[1];
    if (!token)
        return res.status(401).json({
            success: false,
            message: 'No Token Generated'
        })
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    }
    catch (err) {
        console.log(err);
        res.status(403).json({ success: false, message: 'Invalid or expires token' })
    }
}
export default authMiddleware