import multer from "multer";
import path from "path"
// import fs from 'fs'
// const uploadDir = './uploads'
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir);
// }
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '_' + Math.round(Math.random() * 1E9);
        cb(null,file.fieldname + '_' + uniqueName + path.extname(file.originalname));
        // callback(null, uniqueName)
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload an image.'), false);
    }
}
const upload = multer({
    storage: storage,
    fileFilter: fileFilter, limits: {
        fileSize: 5 * 1024 * 1024

    }
})
export default upload