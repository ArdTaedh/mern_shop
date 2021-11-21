import React, {useEffect, useState} from 'react';
import {Badge, Breadcrumb, Button, Card, Col, Container, Row} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector} from "react-redux";

import classes from './ProductPage.module.scss'
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Rating from "../../components/Rating/Rating";
import Loading from "../../components/Loading/Loading";
import MessageBox from "../../components/MessageBox/MessageBox";
import {detailsProduct} from "../../store/actions/productActions";
import {Helmet} from "react-helmet";

const ProductPage = (props) => {
    const dispatch = useDispatch()
    const productId = props.match.params.id

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const [qty, setQty] = useState(1)

    useEffect(() => {
        dispatch(detailsProduct(productId))
    }, [dispatch, productId])

    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`)
    }

    return (
        <div className={classes["product-screen"]}>
            <Header/>
            {
                loading
                    ? <Loading/>
                    : error ? (<MessageBox variant="danger">{error}</MessageBox>)
                        : (
                            <>
                                <Helmet>
                                    <title>{product.name}</title>
                                </Helmet>
                            <Container>
                                <Breadcrumb className={classes.breadcrumb}>
                                    <LinkContainer to="/">
                                        <Breadcrumb.Item>Головна</Breadcrumb.Item>
                                    </LinkContainer>
                                    <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
                                </Breadcrumb>
                                <Row className={classes["product-detail__wrapper"]}>
                                    <Col className={classes["photo-col"]} xs={6}>
                                        <img className={classes["product-img"]} src={product.image} alt={product.name}/>
                                    </Col>
                                    <Col className={classes["product-description"]}>
                                        <h4 className="product-name">{product.name}</h4>
                                        <Rating rating={product.rating} reviews={product.numReviews}/>
                                        <div className={classes["product-price"]}>
                                            <div>Ціна:</div>
                                            <div className={classes["price"]}>₴{product.price}</div>
                                        </div>
                                        <h6 className={classes['description-text']}>Опис:</h6>
                                        <p className={classes.description}>{product.description}</p>
                                    </Col>
                                    <Col className="product-actions">
                                        <Card className={classes['product-actions__card']}>
                                            <div className={classes["product-actions__price"]}>
                                                <div>Ціна:</div>
                                                <div className={classes["price"]}>₴{product.price}</div>
                                            </div>
                                            <div className={classes["product-actions__status"]}>
                                                <div className="product-status__text">Статус:</div>
                                                <div className="product-status">
                                                    {product.countInStock > 0
                                                        ?
                                                        <h5 className={classes.badge}><Badge pill bg="success">У наявності</Badge></h5>
                                                        : <h5 className={classes.badge}><Badge pill bg="danger">Відсутній</Badge>
                                                        </h5>
                                                    }
                                                </div>
                                            </div>
                                            {
                                                product.countInStock > 0 && (
                                                    <>
                                                        <div className={classes["qty-wrapper"]}>
                                                            <div className="qty-text">Кількість</div>
                                                            <div className="qty-input__wrapper">
                                                                <select
                                                                    className="qty-input"
                                                                    value={qty}
                                                                    onChange={(e) => setQty(e.target.value)}
                                                                >
                                                                    {
                                                                        [...Array(product.countInStock).keys()].map(x => (
                                                                            <option key={x+1} value={x+1}>{x+1}</option>
                                                                        ))
                                                                    }
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <Button onClick={addToCartHandler}>Додати у кошик</Button>
                                                    </>
                                                )
                                            }
                                        </Card>
                                    </Col>
                                </Row>
                            </Container>
</>
                        )
            }
            <Footer/>
        </div>
    )
};

export default ProductPage;