import React from 'react';
import {Button, Card} from "react-bootstrap";

import './Product.scss'
import img from './p1.jpg'

const Product = () => {
    return (
        <Card className="product position-relative">
            <a href='/product'>
                <Card.Img
                    className='card-img'
                    variant='top'
                    src={img}
                />
            </a>
            <Card.Body>
                <a href='/product'>
                    <Card.Title>
                        Nike SLim Shirts
                    </Card.Title>
                </a>
                <div className="card-rating">
                    <span><i className="fa fa-star"></i></span>
                    <span><i className="fa fa-star"></i></span>
                    <span><i className="fa fa-star"></i></span>
                    <span><i className="fa fa-star"></i></span>
                    <span><i className="fa fa-star"></i></span>
                </div>
                <Button variant='primary'>
                    Add to Cart
                </Button>
            </Card.Body>
        </Card>
    );
};

export default Product;