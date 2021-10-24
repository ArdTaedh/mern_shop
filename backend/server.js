import express from 'express'
import mongoose from "mongoose";

import data from './data.js'
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";

const app = express()

const uri = "mongodb+srv://admin:<ADMIN_PASSWORD>@<DB_NAME>.ljb4w.mongodb.net/<PROJECT_NAME>?retryWrites=true&w=majority"
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Підключення до MongoDB успішне");
})

const port = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send('Сервер запущений')
})

app.use('/api/users', userRouter)

app.use('/api/products', productRouter)

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message })
})

app.listen(port, () => {
    console.log(`Сервер працює за адресою http://localhost:${port}`)
})