import React, {useEffect} from 'react';

import classes from './SearchPage.module.scss'
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {Col, Container, Form, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../../store/actions/productActions";
import {Link, NavLink, useParams} from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import MessageBox from "../../components/MessageBox/MessageBox";
import Product from "../../components/Products/Product";
import {prices, ratings} from "../../utils/utils";
import Rating from "../../components/Rating/Rating";


const SearchPage = (props) => {
    const {
        name = 'all',
        category = 'all',
        min = 0,
        max = 0,
        rating = 0,
        order = 'newest'
    } = useParams()

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {loading, error, products} = productList

    const productCategoryList = useSelector(state => state.productCategoryList)
    const {loading: loadingCategories, error: errorCategories, categories} = productCategoryList

    useEffect(() => {
        dispatch(listProducts(
            {
                name: name !== 'all'
                    ? name
                    : '',
                category: category !== 'all'
                    ? category
                    : '',
                min,
                max,
                rating,
                order
            }
        ))
    }, [dispatch, name, category, min, max, rating, order])

    const getFilteredUrl = (filter) => {
        const filteredCategory = filter.category || category
        const filteredName = filter.name || name
        const filteredMin = filter.min ? filter.min : filter.min === 0 ? 0 : min
        const filteredMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
        const filteredRating = filter.rating || rating
        const sortOrder = filter.order || order
        return `/search/category/${filteredCategory}/name/${filteredName}/min/${filteredMin}/max/${filteredMax}/rating/${filteredRating}/order/${sortOrder}`
    }

    const sortProductsHandler = (e) => {
        return props.history.push(getFilteredUrl({ order: e.target.value }))
    }

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
                        xs={3}
                    >
                        {
                            loading
                                ? <Loading/>
                                : error
                                    ? <MessageBox varaint="danger">{error}</MessageBox>
                                    : <h3>Результати: {products.length} </h3>
                        }
                        <div className="search-results">
                            {
                                loadingCategories
                                    ? <Loading/>
                                    : errorCategories
                                        ? <MessageBox varaint="danger">{errorCategories}</MessageBox>
                                        : (
                                            <div className={classes['search-categories']}>
                                                <h5 className={classes['categories-header']}>Категорії</h5>
                                                <ul
                                                    className={classes['category-list']}
                                                >
                                                    {categories.map(category => (
                                                        <li
                                                            key={category}
                                                        >
                                                            <NavLink
                                                                activeClassName={classes['active']}
                                                                to={getFilteredUrl({category: category})}
                                                            >
                                                                {category}
                                                            </NavLink>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <div className="product-price">
                                                    <h5>Ціна</h5>
                                                    <ul
                                                        className={classes['product-price__list']}
                                                    >
                                                        {prices.map(price => (
                                                            <li
                                                                key={price.name}
                                                            >
                                                                <NavLink
                                                                    key={price.max}
                                                                    activeClassName={classes['price-active']}
                                                                    to={getFilteredUrl({min: price.min, max: price.max})}
                                                                >
                                                                    {price.name}
                                                                </NavLink>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div className="product-rating">
                                                    <h5>Рейтинг</h5>
                                                    <ul
                                                        className={classes['product-rating__list']}
                                                    >
                                                        {ratings.map(rating => (
                                                            <li
                                                                key={rating.name}

                                                            >
                                                                <NavLink
                                                                    key={rating.max}
                                                                    activeClassName={classes['rating-active']}
                                                                    to={getFilteredUrl({ rating: rating.rating })}
                                                                >
                                                                    <Rating caption={rating.name} rating={rating.rating}/>
                                                                </NavLink>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        )
                            }
                        </div>
                    </Col>
                    <Col
                        className={classes['seeked-products__col']}
                        xs={8}
                    >
                        <div className={classes["sort-actions"]}>
                            <h5>Відсортувати</h5>
                            <Form.Select
                                value={order}
                                onChange={sortProductsHandler}
                            >
                                <option value="newest">За новизною</option>
                                <option value="lowest">Від найдешевших</option>
                                <option value="highest">Від найдорожчих</option>
                                <option value="toprated">За рейтингом</option>
                            </Form.Select>
                        </div>
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