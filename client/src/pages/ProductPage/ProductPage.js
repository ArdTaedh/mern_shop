import React, {useEffect, useState} from 'react';
import {Badge, Breadcrumb, Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector} from "react-redux";

import classes from './ProductPage.module.scss'
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Rating from "../../components/Rating/Rating";
import Loading from "../../components/Loading/Loading";
import MessageBox from "../../components/MessageBox/MessageBox";
import {createProductReview, detailsProduct} from "../../store/actions/productActions";
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom"
import {PRODUCT_REVIEW_RESET} from "../../store/constants/productConstants";
import moment from "moment";

const ProductPage = (props) => {
    const dispatch = useDispatch()
    const productId = props.match.params.id

    const [qty, setQty] = useState(1)

    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const {loading: loadingReview, error: errorReview, success: successReview} = productReviewCreate

    useEffect(() => {
        if (successReview) {
            alert('Відгук залишено успішно')
            setRating('')
            setComment('')
            dispatch({type: PRODUCT_REVIEW_RESET})
        }

        dispatch(detailsProduct(productId))
    }, [dispatch, productId, successReview])

    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()

        if (comment && rating) {
            dispatch(createProductReview(productId, {rating, comment, name: userInfo.name}))
        } else {
            alert("Будь ласка заповніть форму відгуку")
        }
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
                                                            <h5 className={classes.badge}><Badge pill bg="success">У
                                                                наявності</Badge></h5>
                                                            : <h5 className={classes.badge}><Badge pill
                                                                                                   bg="danger">Відсутній</Badge>
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
                                                                                <option key={x + 1}
                                                                                        value={x + 1}>{x + 1}</option>
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
                                    <div className="review-wrapper">
                                        <h3 style={{fontWeight: "bold"}}>Відгуки</h3>
                                        {
                                            product.reviews.length === 0 &&
                                            <MessageBox varaint="info">Нема відгуків</MessageBox>
                                        }
                                        <div className="review">
                                            {product.reviews.map(review => (
                                                <div
                                                    className="product-review"
                                                    key={review._id}
                                                >
                                                    <h4
                                                        className="review-name"
                                                    >
                                                        {review.name}
                                                    </h4>
                                                    <Rating
                                                        rating={review.rating}
                                                        caption=" "
                                                    />
                                                    <p className="review-time__created" style={{marginBottom: "0.4rem"}}>
                                                        {moment(review.createdAt.substr(0, 10)).format("DD-MM-YYYY")}
                                                    </p>
                                                    <p className="comment">
                                                        {review.comment}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                        {loadingReview && <Loading/>}
                                        {errorReview && <MessageBox variant="danger" style={{ margin: "1rem auto", width: "50%" }}>{errorReview}</MessageBox>}
                                        <div className={classes["review-form__wrapper"]}>
                                            {
                                                userInfo
                                                    ? (
                                                        <Form
                                                            className={classes["review-form"]}
                                                            onSubmit={submitHandler}
                                                        >
                                                            <h3>Залиште свій відгук про товар</h3>
                                                            <Form.Group>
                                                                <Form.Label>
                                                                    Рейтинг
                                                                </Form.Label>
                                                                <Form.Select
                                                                    value={rating}
                                                                    onChange={(e) => setRating(e.target.value)}
                                                                >
                                                                    <option value="">Оберіть рейтинг</option>
                                                                    <option value="1">Низький</option>
                                                                    <option value="2">Непоганий</option>
                                                                    <option value="3">Середній</option>
                                                                    <option value="4">Вище середнього</option>
                                                                    <option value="5">Високий</option>
                                                                </Form.Select>
                                                            </Form.Group>
                                                            <Form.Group>
                                                                <Form.Label>Коментар</Form.Label>
                                                                <Form.Control
                                                                    as="textarea"
                                                                    value={comment}
                                                                    onChange={(e) => setComment(e.target.value)}
                                                                >

                                                                </Form.Control>
                                                            </Form.Group>
                                                            <Button
                                                                type="submit"
                                                            >
                                                                Залишити
                                                            </Button>
                                                        </Form>
                                                    )
                                                    : (
                                                        <MessageBox>
                                                            <Link to="/signin">Авторизуйтесь</Link> щоб залишити відгук
                                                        </MessageBox>
                                                    )
                                            }
                                        </div>
                                    </div>
                                </Container>
                            </>
                        )
            }
            <Footer/>
        </div>
    )
};

export default ProductPage;