import React, {useEffect} from 'react';
import {Container} from "react-bootstrap";
import {useDispatch} from "react-redux";

import classes from './CartPage.module.scss'
import Header from "../../components/Layout/Header/Header";
import Footer from "../../components/Layout/Footer/Footer";
import {addToCart} from "../../store/actions/cartActions";

const CartPage = (props) => {
    const dispatch = useDispatch()
    const productId = props.match.params.id
    const qty = props.location.search
        ? Number(props.location.search.split('=')[1])
        : 1

    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    return (
        <div className={classes["cart-page"]}>
            <Header />
            <Container>
                <h1>Cart Page</h1>
                <p>ADD TO CART : productID : {productId} QTY : {qty} </p>
            </Container>
            <Footer />
        </div>
    );
};

export default CartPage;