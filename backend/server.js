import express from 'express'
import data from './data.js'

const app = express()

const port = process.env.PORT || 500

app.get('/', (req, res) => {
    res.send('Server is running')
})

app.get("/api/products", (req, res) => {
    res.send(data.products)
})

app.listen(5000, () => {
    console.log(`Server is running on http://localhost:${port}`)
})