import React from 'react';
import {Card} from "react-bootstrap";

import classes from './scss/Product.module.scss'
import Rating from "../Rating/Rating";
import {Link} from "react-router-dom";

const Product = (props) => {
    return (
        <Card className={classes["product"]}>
            <Link to={`/product/${props.id}`}>
                <Card.Img
                    className={classes['card-img']}
                    variant='top'
                    src={props.img}
                />
            </Link>
            <Card.Body>
                <Link to={`/product/${props.id}`}>
                    <Card.Title>
                        {props.name}
                    </Card.Title>
                </Link>
                <Rating rating={props.rating} reviews={props.reviews} />
                <div className={classes['price-wrapper']}>
                    <h5 className={classes.price}>₴{props.price}</h5>
                </div>
            </Card.Body>
        </Card>
    );
};

export default Product;