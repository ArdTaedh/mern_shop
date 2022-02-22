import express from "express";
import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import data from "../data.js";
import {isAdmin, isAuth, isSellerOrAdmin} from "../utils.js";

const productRouter = express.Router()



productRouter.get('/', expressAsyncHandler(async (req, res) => {
    const seller = req.query.seller || ''
    const sellerFilter = seller ? {seller} : {}

    const name = req.query.name || ''
    const nameFilter = name ? {name: {$regex: name, $options: 'i'}} : {}

    const category = req.query.category || ''
    const categoryFilter = category ? {category} : {}

    const min = req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0
    const max = req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0
    const priceFilter = min && max ? { price: {$gte: min, $lte: max } }: {}

    const rating = req.query.rating && Number(req.query.rating) !== 0 ? Number(req.query.rating) : 0
    const ratingFilter = rating ? { rating: {$gte: rating } }: {}

    const order = req.query.order || ''
    const sortOrder =
        order === 'lowest'
            ? { price: 1 }
            : order === 'highest'
                ? { price: -1 }
                : order === 'toprated'
                    ? { rating: -1 }
                    : { id: -1 }

    const products = await Product.find(
        {
            ...sellerFilter,
            ...nameFilter,
            ...categoryFilter,
            ...priceFilter,
            ...ratingFilter,
        }).populate('seller', 'seller.name seller.logo')
        .sort(sortOrder)
    res.send(products)
}))

productRouter.get('/categories', expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct('category')
    res.send(categories)
}))

productRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    await Product.remove({})
    const createdProducts = await Product.insertMany(data.products)
    res.send({createdProducts})
}))

productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate(
        'seller',
        'seller.name seller.logo seller.rating seller.numReviews'
    )

    if (product)
        res.send(product)
    else
        res.status(404).send({message: 'Продукт не знайдено'})
}))

productRouter.post('/', isAuth, isSellerOrAdmin, expressAsyncHandler(async (req, res) => {
    const product = new Product({
        name: 'test name',
        seller: req.user._id,
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
    res.send({message: 'Створено продукт', product: createdProduct})
}))

productRouter.put('/:id', isAuth, isSellerOrAdmin, expressAsyncHandler(async (req, res) => {
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
        res.send({message: "Продукт було оновлено", product: updatedProduct})
    } else {
        res.status(404).send({message: 'Продукт не знайдено'})
    }
}))

productRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        const deletedProduct = await product.remove()
        res.send({message: 'Товар видалено', product: deletedProduct})
    } else {
        res.status(404).send({message: "Товар не знайдено"})
    }
}))


export default productRouter