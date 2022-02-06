import React from 'react';
import {Card} from "react-bootstrap";

import classes from './scss/Product.module.scss'
import Rating from "../Rating/Rating";
import {Link} from "react-router-dom";

const Product = (props) => {
    return (
        <Card className={props.cardCN || classes["product"]}>
            <Link to={`/product/${props.id}`}>
                <div className={classes["img-wrapper"]}>
                    <Card.Img
                        className={props.cardImgCN || classes['card-img']}
                        variant='top'
                        src={props.img}
                    />
                </div>
            </Link>
            <Card.Body>
                <Link to={`/product/${props.id}`}>
                    <Card.Title>
                        {props.name}
                    </Card.Title>
                </Link>
                <div className="seller d-flex gap-2">
                    <h5>Продавець:</h5>
                    <Link to={`/seller/${props.seller._id}`} style={{ fontSize: '1.2rem'}}>{props.seller.seller.name}</Link>
                </div>
                <Rating rating={props.rating} reviews={props.reviews} />
                <div className={classes['price-wrapper']}>
                    <h5 className={classes.price}>₴{props.price}</h5>
                </div>
            </Card.Body>
        </Card>
    );
};

export default Product;