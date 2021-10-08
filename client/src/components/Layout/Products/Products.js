import React, {useEffect} from 'react';

import classes from './scss/Products.module.scss'
import Product from "./Product";
import Loading from "../Loading/Loading";
import MessageBox from "../MessageBox/MessageBox";
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../../../store/actions/productActions";

const Products = () => {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    useEffect(() => {
        dispatch(listProducts())
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