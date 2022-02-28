import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

import User from "../models/userModel.js";
import data from "../data.js";
import {generateToken, isAdmin, isAuth} from "../utils.js";
import Product from "../models/productModel.js";
import productRouter from "./productRouter.js";

const userRouter = express.Router()

userRouter.get('/top-sellers', expressAsyncHandler( async (req, res) => {
    const topSellers = await User.find({ isSeller: true }).sort({ 'seller.rating': -1 }).limit(3)
    res.send(topSellers)
}))

userRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    await User.remove({})
    const createdUsers = await User.insertMany(data.users)
    res.send({createdUsers})
}))

userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({email: req.body.email})
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                isSeller: user.isSeller,
                token: generateToken(user)
            })
            return
        }
    }
    res.status(401).send({message: 'Недійсний email або пароль'})
}))

userRouter.post('/register', expressAsyncHandler(async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
    const createdUser = await user.save()
    res.send({
        _id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        isSeller: user.isSeller,
        token: generateToken(createdUser)
    })
}))

userRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user)
        res.send(user)
    else
        res.status(404).send({message: "Користувача не знайдено"})
}))

userRouter.put('/profile', isAuth, expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if (user.isSeller) {
            user.seller.name = req.body.sellerName || user.seller.name
            user.seller.logo = req.body.sellerLogo || user.seller.logo
            user.seller.description = req.body.sellerDescription || user.seller.description
        }
        if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8)
        }
        const updatedUser = await user.save()

        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            isSeller: updatedUser.isSeller,
            token: generateToken(updatedUser)
        })
    }
}))

userRouter.get('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const users = await User.find({})

    res.send(users)
}))

userRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        if (user.email === 'admin@example.com') {
            res.status(400).send({message: "Не можна видалити адміністратора"})
            return
        }
        const deletedUser = await user.remove()
        res.send({message: "Користувач був видалений", user: deletedUser})
    } else {
        res.status(404).send({message: "Користувача не знайдено"})
    }
}))

userRouter.put('/:id', isAuth, expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isSeller = Boolean(req.body.seller)
        user.isAdmin = Boolean(req.body.admin)

        const updatedUser = await user.save()

        res.send({message: "Користувача було змінено", user: updatedUser})
    } else {
        res.status(404).send({message: "Користувача не знайдено"})
    }
}))

userRouter.post('/:id/reviews', isAuth, expressAsyncHandler(async (req, res) => {
    const sellerId = req.params.id
    const seller = await User.findById(sellerId)

    if (seller) {
        if (seller.seller.reviews.find(x => x.name === req.user.name)) {
            return res.status(400).send({ message: "Ви вже залишали відгук"})
        }

        if (sellerId === seller.seller.reviews._id) {
            return res.status(400).send({ message: "Не можна коментувати самого себе" })
        }

        const review = { name: req.user.name, rating: Number(req.body.rating), comment: req.body.comment }

        seller.seller.reviews.push(review)

        seller.seller.numReviews = seller.seller.reviews.length

        seller.seller.rating = seller.seller.reviews.reduce((a, c) => c.rating + a, 0) / seller.seller.reviews.length;

        const updatedSellerReviews = await seller.save()
        res.status(201).send({message: "Відгук залишено успішно", review: updatedSellerReviews.seller.reviews[updatedSellerReviews.seller.reviews.length - 1] })
    } else {
        res.status(404).send({message: 'Помилка при створенні відгуку'})
    }
}))

export default userRouter