import React, {useEffect} from 'react';
import {Offcanvas} from "react-bootstrap";

import classes from './scss/CategorySidebar.module.scss'
import Search from "../Search/Search";
import {Link, Route, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../../store/actions/productActions";
import Loading from "../Loading/Loading";
import MessageBox from "../MessageBox/MessageBox";

const CategorySidebar = (props) => {

    const {name = 'all', category = 'all'} = useParams()

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
                    : ''
            }
        ))
    }, [dispatch, name, category])

    const getFilteredUrl = (filter) => {
        const filteredCategory = filter.category || category
        const filteredName = filter.name || name
        return `/search/category/${filteredCategory}/name/${filteredName}`
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
                                                <Link
                                                    to={getFilteredUrl({category: category})}
                                                >
                                                    {category}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )
                }
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default CategorySidebar;