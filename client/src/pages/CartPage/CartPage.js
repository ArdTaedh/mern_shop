import React, {useEffect} from 'react';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";

import classes from './CartPage.module.scss'
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {addToCart, removeFromCart} from "../../store/actions/cartActions";
import {Helmet} from "react-helmet";
import MessageBox from "../../components/MessageBox/MessageBox";
import {Link} from "react-router-dom";

const CartPage = (props) => {
    const dispatch = useDispatch()
    const productId = props.match.params.id
    const qty = props.location.search
        ? Number(props.location.search.split('=')[1])
        : 1
    const cart = useSelector(state => state.cart)
    const { cartItems, error } = cart


    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        props.history.push('/signin?redirect=shipping')
    }

    return (
        <div className={classes["cart-page"]}>
            <Helmet>
                <title>Кошик</title>
            </Helmet>
            <Header/>
            <Container>
                <Row className={classes["cart-wrapper"]}>
                    <Col className={classes["cart-items__col"]} xs={7}>
                        <h2 className="mt-2">Кошик</h2>
                        { error && <MessageBox variant="danger">{error}</MessageBox> }
                        {
                            cartItems.length === 0
                                ? <MessageBox
                                    className={classes["message-box"]}
                                    variant="info"
                                >
                                    Кошик порожній
                            </MessageBox>
                                : (
                                    <div className={classes["cart-items"]}>
                                        {cartItems.map((item) => (
                                            <Card className={classes["product-wrapper"]} key={item.product}>
                                                <Row className={classes["product-row"]}>
                                                    <Col className={classes["cart-img__col"]}>
                                                        <img
                                                            className={classes["cart-img"]}
                                                            src={item.image}
                                                            alt={item.name}
                                                        />
                                                    </Col>
                                                    <Col className={classes["cart-name__col"]}>
                                                        <Link className={["product-link"]} to={`/product/${item.product}`}>{item.name}</Link>
                                                    </Col>
                                                    <Col className={classes["qty-col"]}>
                                                        <select
                                                            value={item.qty}
                                                            onChange={e =>
                                                                dispatch(addToCart
                                                                    (item.product,
                                                                    Number(e.target.value))
                                                                )
                                                            }
                                                        >
                                                            {
                                                                [...Array(item.countInStock).keys()].map(x => (
                                                                    <option key={x+1} value={x+1}>{x+1}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </Col>
                                                    <Col className={classes["price-col"]}>
                                                        ₴{item.price}
                                                    </Col>
                                                    <Col className={classes["remove-col"]}>
                                                        <Button
                                                            className={classes['cart-btn']}
                                                            type="button"
                                                            variant="primary"
                                                            onClick={()=> removeFromCartHandler(item.product)}
                                                        >
                                                            Видалити
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Card>
                                        ))}
                                    </div>
                                )
                        }
                    </Col>
                        <Col className={classes["checkout-col"]} xs={4}>
                            <Card className={classes["checkout-card"]}>
                                <div className={classes["checkout-wrapper"]}>
                                    <div className="subtotal-wrapper">
                                        <h3 className={classes["subtotal-brand"]}>
                                            Підсумок
                                        </h3>
                                        <h4>
                                            {cartItems.reduce((a, c) => a + c.qty, 0)} позицій : ₴{cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                                        </h4>
                                    </div>
                                    <div>
                                        <Button
                                            className={classes["checkout-btn"]}
                                            onClick={checkoutHandler}
                                            disabled={cartItems.length === 0}
                                        >
                                            Перейти до оплати
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
    );
};

export default CartPage;