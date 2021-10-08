import React, {useEffect} from 'react';
import {Badge, Breadcrumb, Button, Card, Col, Container, Row} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector} from "react-redux";

import classes from './ProductScreen.module.scss'
import Header from "../../components/Layout/Header/Header";
import Footer from "../../components/Layout/Footer/Footer";
import Rating from "../../components/Layout/Rating/Rating";
import Loading from "../../components/Layout/Loading/Loading";
import MessageBox from "../../components/Layout/MessageBox/MessageBox";
import {detailsProduct} from "../../store/actions/productActions";

const ProductScreen = (props) => {
    const dispatch = useDispatch()
    const productId = props.match.params.id

    const product = useSelector(state => state.productDetails.product)
    const loading = useSelector(state => state.productDetails.loading)
    const error = useSelector(state => state.productDetails.error)
    // const {loading, error, product} = productDetails

    useEffect(() => {
        dispatch(detailsProduct(productId))
    }, [dispatch, productId])

    return (
        <div className={classes["product-screen"]}>
            <Header/>
            {
                loading
                    ? <Loading/>
                    : error ? (<MessageBox variant="danger">{error}</MessageBox>)
                        : (
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
                                        <h6 className={classes['description']}>Опис:</h6>
                                        <p>{product.description}</p>
                                    </Col>
                                    <Col className="product-actions">
                                        <Card className={classes['product-actions__card']}>
                                            <div className={classes["product-actions__price"]}>
                                                <div>Ціна:</div>
                                                <div className={classes["price"]}>₴{product.price}</div>
                                            </div>
                                            <div className={classes["product-actions__status"]}>
                                                <div>Статус:</div>
                                                <div>
                                                    {product.countInStock
                                                        ?
                                                        <h5 className={classes.badge}><Badge pill bg="success">У
                                                            наявності</Badge></h5>
                                                        : <h5 className={classes.badge}><Badge pill
                                                                                               bg="danger">Відсутній</Badge>
                                                        </h5>
                                                    }
                                                </div>
                                            </div>
                                            <Button>Додати у кошик</Button>
                                        </Card>
                                    </Col>
                                </Row>
                            </Container>

                        )
            }
            <Footer/>
        </div>
    )
};

export default ProductScreen;