import React from 'react';

import classes from './Products.module.scss'
import data from "../../../data";
import Product from "./Product";

const Products = () => {
    return (
        <div className={classes.products}>
            {data.products.map((product) => (
                <Product
                    key={product._id}
                    id={product._id}
                    name={product.name}
                    img={product.image}
                    price={product.price}
                    rating={product.rating}
                    reviews={product.numReviews}
                />
            ))}
        </div>
    );
};

export default Products;