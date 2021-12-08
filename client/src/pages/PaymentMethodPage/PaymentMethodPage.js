import React, {useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";

import classes from './PaymentMethodPage.module.scss'
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {savePaymentMethod} from "../../store/actions/cartActions";

const PaymentMethodPage = (props) => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)

    const { shippingAddress } = cart

    if(!shippingAddress.address) {
        props.history.push('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        props.history.push('/placeorder')
    }

    console.log(paymentMethod)

    return (
        <div className={classes['payment-method__page']}>
            <Header />
            <Container className={classes['payment-container']}>
                <CheckoutSteps step1={25} step2={25} step3={25} />
                <div className={classes["payment-wrapper"]}>
                    <Form className={classes["payment-form"]} onSubmit={submitHandler}>
                        <div className="payment-heading">
                            <h2 className="payment-heading__text">Оберіть тип оплати</h2>
                        </div>
                        <div className={classes["payment-methods"]}>
                            <div className={classes["paypal-method"]}>
                                <Form.Check
                                    type="radio"
                                    id="paypal"
                                    label='PayPal'
                                    value="PayPal"
                                    defaultChecked={paymentMethod}
                                    name="paymentMethod"
                                    required
                                    onChange={() => setPaymentMethod('Paypal')}
                                />
                            </div>
                            <div className={classes["stripe-method"]}>
                                <Form.Check
                                    type="radio"
                                    id="stripe"
                                    value="Stripe"
                                    label='Stripe'
                                    // value={paymentMethod}
                                    checked={paymentMethod === 'Stripe'}
                                    name="paymentMethod"
                                    required
                                    onChange={() => setPaymentMethod('Stripe')}
                                />
                            </div>
                        </div>
                        <div className="payment-actions">
                            <Button
                                className={classes['payment-btn']}
                                type="submit"
                            >
                                Продовжити
                            </Button>
                        </div>
                    </Form>
                </div>
            </Container>
            <Footer />
        </div>
    );
};

export default PaymentMethodPage;