import express from "express";
import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import data from "../data.js";
import {isAdmin, isAuth} from "../utils.js";

const productRouter = express.Router()

productRouter.get('/', expressAsyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.send(products)
}))

productRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    await Product.remove({})
    const createdProducts = await Product.insertMany(data.products)
    res.send({ createdProducts })
}))

productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product)
        res.send(product)
    else
        res.status(404).send({ message: 'Продукт не знайдено' })
}))

productRouter.post('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const product = new Product({
        name: 'test name',
        image: '/images/p1.jpg',
        price: 0,
        category: 'test category',
        brand: 'test brand',
        countInStock: 0,
        rating: 0,
        numReviews: 0,
        description: 'test description'
    })

    const createdProduct = await product.save()
    res.send({ message: 'Створено продукт', product: createdProduct })
}))

productRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const productId = req.params.id
    const product = await Product.findById(productId)
    if (product) {
        product.name = req.body.name
        product.price = req.body.price
        product.image = req.body.image
        product.category = req.body.category
        product.brand = req.body.brand
        product.countInStock = req.body.countInStock
        product.description = req.body.description

        const updatedProduct = await product.save()
        res.send({ message: "Продукт було оновлено", product: updatedProduct})
    } else {
        res.status(404).send({ message: 'Продукт не знайдено' })
    }
}))

productRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        const deletedProduct = await product.remove()
        res.send({ message: 'Товар видалено', product: deletedProduct })
    } else {
        res.status(404).send({ message: "Товар не знайдено" })
    }
}))


export default productRouter