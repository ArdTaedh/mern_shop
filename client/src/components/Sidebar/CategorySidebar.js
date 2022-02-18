import React, {useEffect} from 'react';
import {Offcanvas} from "react-bootstrap";

import classes from './scss/CategorySidebar.module.scss'
import Search from "../Search/Search";
import { NavLink, Route, useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../../store/actions/productActions";
import Loading from "../Loading/Loading";
import MessageBox from "../MessageBox/MessageBox";
import {prices, ratings} from "../../utils/utils";
import Rating from "../Rating/Rating";

const CategorySidebar = (props) => {

    const {
        name = 'all',
        category = 'all',
        min = 0,
        max = 0,
        rating = 0,
        order = 'newest'
    } = useParams()

    const dispatch = useDispatch()

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

    return (
        <Offcanvas
            className={classes.sidebar}
            show={props.show}
            onHide={props.hide}
            placement={"start"}
        >
            <Offcanvas.Header>
                <Route render={({history}) => <Search className={classes['header-search']} history={history} hideSidebar={props.hide}/>}/>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div className="product-actions">
                    {
                        loadingCategories
                            ? <Loading/>
                            : errorCategories
                                ? <MessageBox varaint="danger">{errorCategories}</MessageBox>
                                : (
                                    <>
                                        <h5>Категорії</h5>
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
                                                        onClick={props.hide}
                                                    >
                                                        {category}
                                                    </NavLink>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )
                    }
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
                                        activeClassName={classes['active-rating']}
                                        to={getFilteredUrl({min: price.min, max: price.max})}
                                        onClick={props.hide}
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

            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default CategorySidebar;