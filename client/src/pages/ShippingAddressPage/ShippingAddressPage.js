import React, {useState} from 'react';
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import classes from './ShippingAddress.module.scss'
import {Button, Container, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {setShippingAddress} from "../../store/actions/cartActions";

const ShippingAddressPage = (props) => {
    const userSignin = useSelector(state => state.userSignin)
    const cart = useSelector(state => state.cart)

    const { userInfo } = userSignin
    const { cartItems } = cart

    const [fullName, setFullName] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')

    const dispatch = useDispatch()

    if (!userInfo) {
        props.history.push('/signin')
    } else if (cartItems.length === 0) {
        props.history.push('/')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(setShippingAddress({ fullName, address, city, postalCode }))
        props.history.push('/payment')
    }

    return (
        <div className={classes["shipping-page"]}>
            <Header/>
            <Container className={classes['shipping-container']}>
                <CheckoutSteps step1={25} step2={25}/>
                <div className={classes["shipping-wrapper"]}>
                    <Form
                        className={classes['shipping-form']}
                        onSubmit={submitHandler}
                    >
                        <h2 className={classes['form-brand']}>Адреса Доставки</h2>
                        <Form.Group>
                            <Form.Label className={classes['form-label']}>ПІБ</Form.Label>
                            <Form.Control
                                className={classes['form-input']}
                                size="lg"
                                type="text"
                                placeholder="Введіть ПІБ"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label
                                className={classes['form-label']}
                            >
                                Місто або Населений пункт
                            </Form.Label>
                            <Form.Control
                                className={classes['form-input']}
                                size="lg"
                                type="text"
                                value={city}
                                placeholder="Введіть місто або населений пункт"
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label className={classes['form-label']}>Адреса</Form.Label>
                            <Form.Control
                                className={classes['form-input']}
                                size="lg"
                                type="text"
                                value={address}
                                placeholder="Введіть адресу"
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label className={classes['form-label']}>Поштовий індекс</Form.Label>
                            <Form.Control
                                className={classes['form-input']}
                                size="lg"
                                type="number"
                                value={postalCode}
                                placeholder="Введіть поштовий індекс"
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button size="lg" className={classes["shipping-btn"]} variant="primary" type="submit">
                            Перейти до оплати
                        </Button>
                    </Form>
                </div>
            </Container>
            <Footer/>
        </div>
    );
};

export default ShippingAddressPage;