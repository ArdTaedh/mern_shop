import React from 'react';

import './Products.scss'
import Product from "./Product";

const Products = () => {
    return (
        <div className='products'>
            <Product className='p1' />
            <Product className='p2' />
            <Product className='p3' />
            <Product className='p4' />
            <Product className='p5' />
            <Product className='p6' />
        </div>
    );
};

export default Products;