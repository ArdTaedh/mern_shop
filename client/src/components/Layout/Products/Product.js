import React from 'react';
import {Button, Card} from "react-bootstrap";

import classes from './Product.module.scss'
import img from './p1.jpg'
import Rating from "../Rating/Rating";

const Product = (props) => {
    return (
        <Card className={classes["product"]}>
            <a href='/product'>
                <Card.Img
                    className={classes['card-img']}
                    variant='top'
                    src={props.img}
                />
            </a>
            <Card.Body>
                <a href='/product'>
                    <Card.Title>
                        {props.name}
                    </Card.Title>
                </a>
                <Rating rating={props.rating} reviews={props.reviews} />
                <div className={classes['price-wrapper']}>
                    <h5 className={classes.price}>${props.price}</h5>
                </div>
                <Button variant='primary'>
                    Add to Cart
                </Button>
            </Card.Body>
        </Card>
    );
};

export default Product;