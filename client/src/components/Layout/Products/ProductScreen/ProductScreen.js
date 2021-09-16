import React from 'react';

import classes from './ProductScreen.module.scss'
import {Breadcrumb, Container,} from "react-bootstrap";
import Header from "../../Header/Header";
import {Link} from "react-router-dom";

const divider = <div className={classes.divider}>/</div>

const ProductScreen = () => {
    return (
        <div className="product-page">
            <Header />
            <Container>
            <div className={classes.breadcrumb}>
                <Link to='/'>Home</Link>
                {divider}
                <Breadcrumb.Item active>
                    Product
                </Breadcrumb.Item>
            </div>
            <div className="image-wrapper">

            </div>
            <div className="product-description">

            </div>
            <div className="product-actions">

            </div>
            </Container>
        </div>
    );
};

export default ProductScreen;