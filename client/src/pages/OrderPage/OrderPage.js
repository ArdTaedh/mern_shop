import React, {useEffect, useState} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import {Helmet} from "react-helmet";
import {useDispatch, useSelector} from "react-redux";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import classes from './OrderPage.module.scss'
import {detailsOrder} from "../../store/actions/orderActions";
import Loading from "../../components/Loading/Loading";
import MessageBox from "../../components/MessageBox/MessageBox";
import axios from "axios";
import {PayPalButton} from "react-paypal-button-v2";


const OrderPage = (props) => {
    const [paypalSDKReady, setPaypalSDKReady] = useState(false)

    const dispatch = useDispatch()
    const orderDetails = useSelector(state => state.orderDetails)

    const orderId = props.match.params.id
    const {order, loading, error} = orderDetails

    useEffect(() => {
        const addPapalScript = async () => {
            const {data} = await axios.get('/api/config/paypal')

            const scriptElement = document.createElement('script')

            scriptElement.type="text/javascript"
            scriptElement.src=`https://www.paypal.com/sdk/js?client-id=${data}`
            scriptElement.async = true
            scriptElement.onload = () => { setPaypalSDKReady(true) }

            document.body.appendChild(scriptElement)
        }

        if (!order) {
            dispatch(detailsOrder(orderId))
        } else {
            if (!order.isPaid) {
                if (!window.paypal) {
                    addPapalScript()
                } else {
                    setPaypalSDKReady(true)
                }
            }
        }
    }, [dispatch, order, orderId, setPaypalSDKReady, paypalSDKReady])

    const successPaymentHandler = () => {
        //sadasd
    }

    return (
        <div className={classes["order__page"]}>
            <Header/>
            <Container className={classes["order__container"]}>
                {
                    loading
                        ? <Loading/>
                        : error
                            ? <MessageBox variant="danger">{error}</MessageBox>
                            : (<>
                                    <Helmet>
                                        <title>Замовлення: {order._id}</title>
                                    </Helmet>

                                        <Row className={classes["order-wrapper"]}>
                                            <Col className={classes["order-info__wrapper"]} xs={6}>
                                                <Card className={classes["card-order__info"]}>
                                                    <div className={classes["shipping-name"]}>
                                                        <h4>Замовлення: {order._id}</h4>
                                                    </div>
                                                    <div className="shipping-info">
                                                        <div className={classes["shipping-info__name_wrapper"]}>
                                                            <span className={classes["customer-name"]}>
                                                                ПІБ:
                                                            </span>
                                                            <div>
                                                                {order.shippingAddress.fullName}
                                                            </div>
                                                        </div>
                                                        <div className={classes["shipping-info__address_wrapper"]}>
                                                            <span className={classes["customer-address__header"]}>
                                                                Адреса:
                                                            </span>
                                                            <div className={classes["customer-address"]}>
                                                                <span>{order.shippingAddress.address},</span>
                                                                <span>{order.shippingAddress.city},</span>
                                                                <span>{order.shippingAddress.postalCode}</span>
                                                            </div>
                                                        </div>
                                                        <div className={classes["is-delivered"]}>
                                                            {order.isDelivered
                                                                ? <MessageBox className={classes.success} variant="success">Доставлено {order.deliveredAt}</MessageBox>
                                                                : <MessageBox className={classes.alert} variant="danger">Не доставлено</MessageBox>
                                                            }
                                                        </div>
                                                    </div>
                                                </Card>
                                                <Card className={classes["card-order__payment-method"]}>
                                                    <div className="shipping-payment__method">
                                                        <h4>Метод оплати</h4>
                                                        <span className="payment-method">
                                                            {order.paymentMethod}
                                                        </span>
                                                        <div className={classes["is-paid"]}>
                                                            {order.isDelivered
                                                                ? <MessageBox className={classes.success} variant="success">Оплачено {order.isPaid}</MessageBox>
                                                                : <MessageBox className={classes.alert} variant="danger">Не оплачено</MessageBox>
                                                            }
                                                        </div>
                                                    </div>
                                                </Card>
                                                <Card className={classes["card-order__cart-items"]}>
                                                    <h4>Замовленні товари</h4>
                                                    <div className={classes["cart-items"]}>
                                                        {order.orderItems.map((item) => (
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
                                                                    {order.orderItems.reduce((a, c) => a + c.qty, 0)}
                                                                </span>
                                                            </div>
                                                            <div className={classes["order-price__wrapper"]}>
                                                                <div className={classes["order-price__header"]}>
                                                                    Ціна до оплати:
                                                                </div>
                                                                <span className="order-price">
                                                                    ₴{order.totalPrice}
                                                                </span>
                                                            </div>
                                                            {
                                                                !order.isPaid && (
                                                                    <div className={classes["pay-order"]}>
                                                                        {
                                                                            !paypalSDKReady
                                                                                ? <Loading style={{ marginTop: '0.5rem' }} />
                                                                                : (
                                                                                    <PayPalButton
                                                                                        amount={order.totalPrice}
                                                                                        onSuccess={successPaymentHandler}
                                                                                    />
                                                                                )
                                                                        }
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                </Card>
                                            </Col>
                                        </Row>

                                </>
                            )
                }
            </Container>
            <Footer/>
        </div>
    );
};

export default OrderPage;