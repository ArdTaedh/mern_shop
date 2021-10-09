import React from 'react';
import {Container} from "react-bootstrap";

import classes from './CartPage.module.scss'
import Header from "../../components/Layout/Header/Header";
import Footer from "../../components/Layout/Footer/Footer";

const CartPage = (props) => {
    const productId = props.match.params.id
    const qty = props.location.search
        ? Number(props.location.search.split('=')[1])
        : 1

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