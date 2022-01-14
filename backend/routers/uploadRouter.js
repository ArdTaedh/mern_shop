import multer from 'multer'
import express from "express";
import {isAuth} from "../utils.js";

const uploadRouter = express.Router()

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, 'uploads/')
    },
    filename(req, file, callback) {
        callback(null, `${Date.now()}.jpg`)
    }
})

const uploadMiddleware = multer({ storage })

uploadRouter.post('/', isAuth, uploadMiddleware.single('image'), (req, res) => {
    res.send(`/${req.file.path}`)
})

export default uploadRouter