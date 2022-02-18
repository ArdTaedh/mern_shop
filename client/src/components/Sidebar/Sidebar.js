import React from 'react';
import {Accordion, Badge, Offcanvas} from "react-bootstrap";
import classNames from "classnames";

import classes from './scss/Sidebar.module.scss'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {signout} from "../../store/actions/userActions";

const Sidebar = (props) => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin

    const {cartItems} = cart

    const signoutHandler = () => {
        dispatch(signout())
    }

    return (
        <Offcanvas
            className={classes.sidebar}
            show={props.show}
            onHide={props.hide}
            placement={"end"}
        >
            <Offcanvas.Header className={classes['sidebar-header']}/>
            <Offcanvas.Body className={classes['sidebar-body']}>
                <ul className={classes["sidebar-nav"]}>
                    <li className={classes["sidebar-nav__item"]} onClick={props.hide}>
                        <Link
                            className={classes["sidebar-nav__link"]}
                            onClick={props.hide}
                            to="/cart"
                        >
                            Кошик {cartItems.length > 0 &&
                            <Badge className={classes['cart-badge']}>{cartItems.length}</Badge>}
                        </Link>
                    </li>
                    {
                        userInfo ? (
                                <Accordion className={classes['sidebar-accordion']}>
                                    <Accordion.Item eventKey="0" className={classes['sidebar-accordion__item']}>
                                        <Accordion.Button className={classes['sidebar-accordion__btn']}>
                                            {userInfo.name}
                                        </Accordion.Button>
                                        <Accordion.Body className={classes['accordion-body']}>
                                            <li className={classes['dropdown-item']}>
                                                <Link className={classes['dropdown-item__link']} to="/orders">
                                                    Замовлення
                                                </Link>
                                            </li>
                                            <li className={classes['dropdown-item']}>
                                                <Link className={classes['dropdown-item__link']} to="/profile">
                                                    Профіль
                                                </Link>
                                            </li>
                                            <li className={classNames(classes['dropdown-item'], classes.signout)} onClick={signoutHandler}>
                                                Вийти
                                            </li>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            )
                            : (
                                <li className={classes["sidebar-nav__item"]} onClick={props.hide}>
                                    <Link
                                        className={classes["sidebar-nav__link"]}
                                        onClick={props.hide}
                                        to="/signin"
                                    >
                                        Увійти
                                    </Link>
                                </li>
                            )
                    }
                    {
                        userInfo && userInfo.isSeller && (
                            <Accordion className={classes['sidebar-accordion']}>
                                <Accordion.Item eventKey="0" className={classes['sidebar-accordion__item']}>
                                    <Accordion.Button className={classes['sidebar-accordion__btn']}>Продавець</Accordion.Button>
                                    <Accordion.Body className={classes['accordion-body']}>
                                        <li className={classes['dropdown-item']}>
                                            <Link className={classes['dropdown-item__link']} to="/product-list/seller">
                                                Товари
                                            </Link>
                                        </li>
                                        <li className={classes['dropdown-item']}>
                                            <Link className={classes['dropdown-item__link']} to="/order-list/seller">
                                                Замовлення
                                            </Link>
                                        </li>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        )
                    }
                    {
                        userInfo && userInfo.isAdmin && (
                            <Accordion className={classes['sidebar-accordion']}>
                                <Accordion.Item eventKey="0" className={classes['sidebar-accordion__item']}>
                                    <Accordion.Button className={classes['sidebar-accordion__btn']}>Admin</Accordion.Button>
                                    <Accordion.Body className={classes['accordion-body']}>
                                        <li className={classes['dropdown-item']}>
                                            <Link className={classes['dropdown-item__link']} to="/dashboard">
                                                Панель Інструментів
                                            </Link>
                                        </li>
                                        <li className={classes['dropdown-item']}>
                                            <Link className={classes['dropdown-item__link']} to="/product-list">
                                                Товари
                                            </Link>
                                        </li>
                                        <li className={classes['dropdown-item']}>
                                            <Link className={classes['dropdown-item__link']} to="/order-list">
                                                Замовлення
                                            </Link>
                                        </li>
                                        <li className={classes['dropdown-item']}>
                                            <Link className={classes['dropdown-item__link']} to="/user-list">
                                                Користувачі
                                            </Link>
                                        </li>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        )
                    }
                </ul>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default Sidebar;