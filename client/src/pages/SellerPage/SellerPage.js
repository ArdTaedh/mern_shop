import React, {useEffect, useState} from 'react';

import classes from './SellerPage.module.scss'
import Header from "../../components/Header/Header";
import {Card, Col, Container, Row} from "react-bootstrap";
import Footer from "../../components/Footer/Footer";
import { getUserSellerInfo } from "../../store/actions/userActions";
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../../store/actions/productActions";
import Loading from "../../components/Loading/Loading";
import MessageBox from "../../components/MessageBox/MessageBox";
import Rating from "../../components/Rating/Rating";
import {Helmet} from "react-helmet";
import Product from "../../components/Products/Product";
import SellerReviewsModal from "../../components/SellerReviewsModal/SellerReviewsModal";

const SellerPage = (props) => {
    const dispatch = useDispatch()

    const [show, setShow] = useState(false);

    const modalHandler = () => setShow(!show);

    const userDetails = useSelector(state => state.userSellerCheckInfo)
    const {loading, error, user} = userDetails

    const productList = useSelector(state => state.productList)
    const {loading: loadingProducts, error: errorProducts, products} = productList

    const sellerId = props.match.params.id

    useEffect(() => {
        dispatch(getUserSellerInfo(sellerId))
        dispatch(listProducts({seller: sellerId}))
    }, [dispatch, sellerId])

    return (
        <>
            <div
                className={classes['seller-page']}
            >
                <Header/>
                <Container className={classes['seller-container']}>
                    {
                        loading
                            ? <Loading/>
                            : error
                                ? <MessageBox variant="danger">{error}</MessageBox>
                                : (
                                    <>
                                        <>
                                            <Helmet>
                                                <title>{`Продавець: ${user.seller.name}`}</title>
                                            </Helmet>
                                        </>
                                        <Row className={classes['seller-page__content']}>
                                            <Col className={classes['seller-col']}>
                                                <Card className={classes['seller-card']}>
                                                    <div className={classes["seller-card__content"]}>
                                                        <Card.Img src={user.seller.logo} alt={user.seller.name}
                                                                  className={classes["seller-img"]}/>
                                                        <div className={classes["seller-info"]}>
                                                            <h4 className={classes['seller-ingo__header']}>Продавець: {user.seller.name}</h4>
                                                            <Rating
                                                                rating={user.seller.rating}
                                                                reviews={user.seller.numReviews}
                                                            />
                                                            <div className="contact-with__seller">
                                                                <a href={`mailto:${user.email}`}>
                                                                    Contact Seller
                                                                </a>
                                                            </div>
                                                            <div className="seller-description">
                                                                {user.seller.description}
                                                            </div>
                                                            <div className={classes["user-reviews"]} onClick={modalHandler}>
                                                                Відгуки
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </Col>
                                            <Col className={classes['products-col']}>
                                                {
                                                    loadingProducts
                                                        ? <Loading/>
                                                        : errorProducts
                                                            ? <MessageBox variant="danger">{errorProducts}</MessageBox>
                                                            : (
                                                                <>
                                                                    {
                                                                        products.length === 0 && (
                                                                            <h2> У даного продавця немає доступних товарів </h2>)
                                                                    }
                                                                    <div className={classes["products-wrapper"]}>
                                                                        {
                                                                            products.map((product) => (
                                                                                <Product
                                                                                    key={product._id}
                                                                                    id={product._id}
                                                                                    name={product.name}
                                                                                    img={product.image}
                                                                                    price={product.price}
                                                                                    rating={product.rating}
                                                                                    reviews={product.numReviews}
                                                                                    seller={product.seller}

                                                                                    cardCN={classes['seller-card__product']}
                                                                                    cardImgCN={classes['seller-card__product-img']}
                                                                                />
                                                                            ))
                                                                        }
                                                                    </div>
                                                                </>
                                                            )
                                                }
                                            </Col>
                                        </Row>
                                    </>
                                )
                    }
                </Container>
                <Footer/>
            </div>
            <SellerReviewsModal show={show} hide={modalHandler} sellerId={sellerId} />
        </>
    );
};

export default SellerPage;