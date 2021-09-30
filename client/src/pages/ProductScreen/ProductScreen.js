import React from 'react';
import {Breadcrumb, Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'

import classes from './ProductScreen.module.scss'
import data from "../../data";
import Header from "../../components/Layout/Header/Header";
import Footer from "../../components/Layout/Footer/Footer";
import Rating from "../../components/Layout/Rating/Rating";

const ProductScreen = (props) => {
    const product = data.products.find((x) => x._id === props.match.params.id)

    if (!product)
        return <div>Product Not Found</div>

    return (
        <div className={classes["product-screen"]}>
            <Header />
            <Container>
                <Breadcrumb className={classes.breadcrumb}>
                    <LinkContainer to="/"><Breadcrumb.Item>Home</Breadcrumb.Item></LinkContainer>
                    <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
                </Breadcrumb>
                <Row className={classes["product-detail__wrapper"]}>
                    <Col className={classes["photo-col"]}>
                        <img className={classes["product-img"]} src={product.image} />
                    </Col>
                    <Col className={classes["product-description"]}>
                        <h4 className="product-name">{product.name}</h4>
                        <Rating rating={product.rating} reviews={product.numReviews} />
                        <div className={classes["product-price"]}>
                            <div>Ціна: </div>
                            <div className={classes["price"]}>₴{product.price}</div>
                        </div>
                        <h6 className={classes['description']}>Опис:</h6>
                        <p>{product.description}</p>
                    </Col>
                    <Col className="product-actions">
                        <Card className={classes['product-actions__card']}>
                            <div className={classes["product-actions__price"]}>
                                <div>Ціна: </div>
                                <div className={classes["price"]}>₴{product.price}</div>
                            </div>
                            <div className={classes["product-actions__status"]}>
                                <div>Статус</div>
                                <div>{product.countInStock}</div>
                            </div>
                            <Button>Додати у кошик</Button>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
};

export default ProductScreen;