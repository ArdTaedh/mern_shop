import React from 'react';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {Helmet} from "react-helmet";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

import Header from "../../components/Header/Header";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import Footer from "../../components/Footer/Footer";

import classes from './PlaceOrderPage.module.scss'


const PlaceOrderPage = () => {
    const cart = useSelector(state => state.cart)

    if(!cart.paymentMethod)
        return <Redirect push to="/payment" />

    const placeOrderHandler = () => {

    }

    return (
        <div className={classes["place-order__page"]}>
            <Helmet>
                <title>Підтвердження замовлення</title>
            </Helmet>
            <Header />
            <Container className={classes["place-order__container"]}>
                <CheckoutSteps
                    step1={25}
                    step2={25}
                    step3={25}
                    step4={25}
                />
                <Row className={classes["order-wrapper"]}>
                    <Col className={classes["order-info__wrapper"]} xs={6    }>
                        <Card className={classes["card-order__info"]}>
                            <div className="shipping-name">
                                <h4>Замовлення</h4>
                            </div>
                            <div className="shipping-info">
                                <div className={classes["shipping-info__name_wrapper"]}>
                                    <span className={classes["customer-name"]}>
                                        ПІБ:
                                    </span>
                                    <div>
                                        {cart.shippingAddress.fullName}
                                    </div>
                                </div>
                                <div className={classes["shipping-info__address_wrapper"]}>
                                    <span className={classes["customer-address__header"]}>
                                        Адреса:
                                    </span>
                                    <div className={classes["customer-address"]}>
                                        <span>{cart.shippingAddress.address},</span>
                                        <span>{cart.shippingAddress.city},</span>
                                        <span>{cart.shippingAddress.postalCode}</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                        <Card className={classes["card-order__payment-method"]}>
                            <div className="shipping-payment__method">
                                <h4>Метод оплати</h4>
                                <span className="payment-method">
                                    {cart.paymentMethod}
                                </span>
                            </div>
                        </Card>
                        <Card className={classes["card-order__cart-items"]}>
                            <h4>Кошик</h4>
                            <div className={classes["cart-items"]}>
                                {cart.cartItems.map((item) => (
                                    <div className={classes["product-wrapper"]} key={item.product}>
                                        <Row className={classes["product-row"]}>
                                            <Col className={classes["cart-img__col"]}>
                                                <img
                                                    className={classes["cart-img"]}
                                                    src={item.image}
                                                    alt={item.name}
                                                />
                                            </Col>
                                            <Col className={classes["cart-name__col"]}>
                                                <div className={classes["product-name"]}>{item.name}</div>
                                            </Col>
                                            <Col className={classes["qty-col"]}>
                                               {item.qty}
                                            </Col>
                                            <Col className={classes["price-col"]}>
                                                ₴{item.price}
                                            </Col>
                                        </Row>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </Col>
                    <Col className={classes["order-actions"]} xs={4}>
                        <Card className={classes["order-actions__card"]}>
                            <div className={classes["checkout-wrapper"]}>
                                <div className="subtotal-wrapper">
                                    <h4 className={classes["subtotal-brand"]}>
                                        Підсумок замовлення
                                    </h4>
                                    <div className={classes['order-qty__wrapper']}>
                                        <div className={classes["order-qty__header"]}>
                                            Кількість позицій:
                                        </div>
                                        <span className={classes['order-qty']}>
                                            {cart.cartItems.reduce((a, c) => a + c.qty, 0)}
                                        </span>
                                    </div>
                                    <div className={classes["order-price__wrapper"]}>
                                        <div className={classes["order-price__header"]}>
                                            Ціна до оплати:
                                        </div>
                                        <span className="order-price">
                                            ₴{cart.cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <Button
                                        className={classes["checkout-btn"]}
                                        onClick={placeOrderHandler}
                                        disabled={cart.cartItems.length === 0}
                                    >
                                        Замовити
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
};

export default PlaceOrderPage;