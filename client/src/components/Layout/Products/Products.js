import React, {useEffect, useState} from 'react';
import axios from "axios";

import classes from './scss/Products.module.scss'
import Product from "./Product";
import Loading from "../Loading/Loading";
import MessageBox from "../MessageBox/MessageBox";

const Products = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get('/api/products')
                setLoading(false)
                setProducts(data)
            } catch (err) {
                setError(err.message)
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return (
        <div className={classes.products}>
            {loading
                ? (<Loading /> )
                : error ? (<MessageBox variant="danger">{error}</MessageBox>)
                : ( products.map((product) => (
                    <Product
                        key={product._id}
                        id={product._id}
                        name={product.name}
                        img={product.image}
                        price={product.price}
                        rating={product.rating}
                        reviews={product.numReviews}
                    />)
            ))}
        </div>
    );
};

export default Products;