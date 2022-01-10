import bcrypt from 'bcrypt'

const data = {
    users: [
        {
            name: 'Артем',
            email: 'admin@example.com',
            password: bcrypt.hashSync('admin', 8),
            isAdmin: true
        },
        {
            name: 'Покупець',
            email: 'customer@example.com',
            password: bcrypt.hashSync('customer', 8),
            isAdmin: false
        },
    ],
    products: [
        {
            name: 'Nike Slim Shirt',
            category: 'Футболки',
            image: '/images/p1.jpg',
            price: 120,
            countInStock: 10,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product',
        },
        {
            name: 'Adidas Fit Shirt',
            category: 'Футболки',
            image: '/images/p2.jpg',
            price: 100,
            countInStock: 17,
            brand: 'Adidas',
            rating: 4.0,
            numReviews: 10,
            description: 'high quality product',
        },
        {
            name: 'Lacoste Free Shirt',
            category: 'Футболки',
            image: '/images/p3.jpg',
            price: 220,
            countInStock: 12,
            brand: 'Lacoste',
            rating: 4.8,
            numReviews: 17,
            description: 'high quality product',
        },
        {
            name: 'Nike Slim Pant',
            category: 'Штани',
            image: '/images/p4.jpg',
            price: 78,
            countInStock: 5,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 14,
            description: 'high quality product',
        },
        {
            name: 'Puma Slim Pant',
            category: 'Штани',
            image: '/images/p5.jpg',
            price: 65,
            countInStock: 8,
            brand: 'Puma',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product',
        },
        {
            name: 'Adidas Fit Pant',
            category: 'Штани',
            image: '/images/p6.jpg',
            price: 139,
            countInStock: 0,
            brand: 'Adidas',
            rating: 4.5,
            numReviews: 15,
            description: 'high quality product',
        },
    ],
};

export default data;