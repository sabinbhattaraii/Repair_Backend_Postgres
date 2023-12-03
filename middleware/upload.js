import multer from "multer";
import path from "path";

let limit = {filesize:1024*1024*2}
let storage = multer.diskStorage({
    destination : (req , file, cb)=> {
        let staticFolder = req.query.staticFolder || "./public"
        cb(null,staticFolder)
    },
    filename : (req,file,cb) => {
        let fileName = Date.now() + file.originalname
        cb(null,fileName)
    }
})

let fileFilter = (req, file, cb) => {
    let validExtensions = req.query.validExtensions
        ? req.query.validExtensions.split(",")
        : [
            ".jpeg",
            ".jpg",
            ".JPG",
            ".JPEG",
            ".png",
            ".svg",
            ".doc",
            ".pdf",
            ".mp4",
        ];
    let originalName = file.originalname;
    let originalExtension = path.extname(originalName); //note path module is inbuilt module(package) of node js (ie no need to install path package)
    let isValidExtension = validExtensions.includes(originalExtension);
    if (isValidExtension) {
        cb(null, true);
        //true =>it means  pass such type of file
        //note null represent error since there is no error thus error is null
    } else {
        cb(new Error("File is not supported"), false);
        //false means don't pass such type of file
    }
};

const upload = multer({
    storage : storage,
    fileFilter : fileFilter,
    limit : limit,
})

export default upload