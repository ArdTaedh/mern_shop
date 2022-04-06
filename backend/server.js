import express from 'express'
import mongoose from "mongoose";
import dotenv from 'dotenv'
import * as path from "path";

import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import orderRouter from "./routers/orderRouter.js";
import uploadRouter from "./routers/uploadRouter.js";

const app = express()
app.use(express.json())
dotenv.config()
app.use(express.urlencoded({ extended: true }))

const __dirname = path.resolve()

const uri = process.env.MONGO_URI
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Підключення до MongoDB успішне");
})

app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})

app.get('/', (req, res) => {
    res.send('Сервер запущений')
})

app.use('/api/users', userRouter)

app.use('/api/products', productRouter)

app.use('/api/orders', orderRouter);

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message })
})

app.use('/api/uploads', uploadRouter)

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Сервер працює за адресою http://localhost:${port}`)
})