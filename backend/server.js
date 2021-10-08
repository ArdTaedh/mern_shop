import express from 'express'
import data from './data.js'

const app = express()

const port = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send('Сервер запущений')
})

app.get("/api/products", (req, res) => {
    res.send(data.products)
})

app.get("/api/products/:id", (req, res) => {
    const productId = req.params.id
    const product = data.products.find(x => x._id === productId)
    if (product) {
        res.send(product)
    } else {
        res.status(404).send({message: 'Продукт не знайдено'})
    }
})

app.listen(port, () => {
    console.log(`Сервер працює за адресою http://localhost:${port}`)
})