import React, {useEffect} from 'react';

import classes from './SearchPage.module.scss'
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {Col, Container, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../../store/actions/productActions";
import {useParams} from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import MessageBox from "../../components/MessageBox/MessageBox";
import Product from "../../components/Products/Product";


const SearchPage = (props) => {
    const {name = 'all'} = useParams()

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {loading, error, products} = productList

    useEffect(() => {
        dispatch(listProducts(
            {
                name: name !== 'all'
                    ? name
                    : ''
            }
        ))
    }, [dispatch, name])

    return (
        <div className={classes['search-page']}>
            <Header/>
            <Container
                className={classes['search-page__container']}
            >
                <Row
                    className={classes['search-wrapper']}
                >
                 <Col
                     className={classes['search-results__actions']}
                     xs={2}
                 >
                     {
                         loading
                             ? <Loading/>
                             : error
                                 ? <MessageBox varaint="danger">{error}</MessageBox>
                                 : <div>Результати: {products.length} </div>
                     }
                     <div className="search-results">
                         <h3>Категорії</h3>
                         <ul>
                             <li>Категорія</li>
                         </ul>
                     </div>
                 </Col>
                    <Col
                        className={classes['seeked-products__col']}
                        xs={9}
                    >
                        {
                            loading
                                ? <Loading/>
                                : error
                                    ? <MessageBox varaint="danger">{error}</MessageBox>
                                    : <div className={classes['products']}>
                                        {products.length === 0 && <h3>Товарів по вашому запиту не знайдено</h3>}
                                        {products.map((product) => (
                                            <Product
                                                key={product._id}
                                                id={product._id}
                                                name={product.name}
                                                img={product.image}
                                                price={product.price}
                                                rating={product.rating}
                                                reviews={product.numReviews}
                                                seller={product.seller}
                                            />
                                        ))}
                                    </div>
                        }
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
    );
};

export default SearchPage;