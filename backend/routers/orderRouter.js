import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import {isAdmin, isAuth, isSellerOrAdmin} from '../utils.js';
import User from "../models/userModel.js";
import Product from "../models/productModel.js";

const orderRouter = express.Router();

orderRouter.get('/', isAuth, isSellerOrAdmin, expressAsyncHandler(async (req, res) => {
    const seller = req.query.seller || ''
    const sellerFilter = seller ? { seller } : {}

    const orders = await Order.find({...sellerFilter}).populate('user', 'name')
    res.send(orders)
}))

orderRouter.get('/summary', isAuth, isAdmin, expressAsyncHandler( async (req, res) => {
    const orders = await Order.aggregate([
        {
            $group: {
                _id: null,
                numOrders: { $sum: 1 },
                totalSales: { $sum: '$totalPrice' }
            }
        }
    ])
    const users = await User.aggregate([
        {
            $group: {
                _id: null,
                numUsers: { $sum: 1 },
            }
        }
    ])
    const dailyOrders = await Order.aggregate([
        {
            $group: {
                _id: { $dateToString: { format: '%d-%m-%Y', date: '$createdAt' } },
                orders: { $sum: 1 },
                sales: { $sum: '$totalPrice' }
            }
        }
    ])
    const productCategories = await Product.aggregate([
        {
            $group: {
                _id: '$category' ,
                count: { $sum: 1 }
            }
        }
    ])
    res.send({ users, orders, dailyOrders, productCategories })
} ))

orderRouter.get('/mine', isAuth, expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({user: req.user._id})
    res.send(orders)
}))

orderRouter.get(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id)
        if (order) {
            res.send(order)
        } else {
            res.status(404).send({message: '???????????????????? ???? ????????????????'})
        }
    }))

orderRouter.post(
    '/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        if (req.body.orderItems.length === 0) {
            res.status(400).send({message: '???????????????? ??????????'});
        } else {
            const order = new Order({
                seller: req.body.orderItems[0].seller,
                orderItems: req.body.orderItems,
                shippingAddress: req.body.shippingAddress,
                paymentMethod: req.body.paymentMethod,
                totalPrice: req.body.totalPrice,
                user: req.user._id,
            });
            const createdOrder = await order.save();
            res
                .status(201)
                .send({message: '???????? ????????????????????', order: createdOrder});
        }
    })
);

orderRouter.put("/:id/pay", isAuth, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address
        }
        const updatedOrder = await order.save()
        res.send({message: '???????????????????? ????????????????', order: updatedOrder})
    } else {
        res.status(404).send({message: "???????????????????? ???? ????????????????"})
    }
}))

orderRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const order = Order.findById(req.params.id)

    if (order) {
        const deletedOrder = await order.remove()
        res.send({message: '???????????????????? ???????? ????????????????', order: deletedOrder})
    } else {
        res.status(404).send({message: "???????????????????? ???? ????????????????"})
    }
}))

orderRouter.put("/:id/deliver", isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()
        const updatedOrder = await order.save()
        res.send({message: '???????????????????? ????????????????????', order: updatedOrder})
    } else {
        res.status(404).send({message: "???????????????????? ???? ????????????????"})
    }
}))

export default orderRouter;