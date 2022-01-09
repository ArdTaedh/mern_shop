import React, {useState} from 'react';
import {Badge, Container, Dropdown, Nav} from "react-bootstrap";


import classes from './Header.module.scss'
import {Link} from "react-router-dom";
import {GiHamburgerMenu} from "react-icons/all";
import Sidebar from "../Sidebar/Sidebar";
import {useDispatch, useSelector} from "react-redux";
import {signout} from "../../store/actions/userActions";

const Header = () => {
    const [showSidebar, setShowSidebar] = useState(false)

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin

    const { cartItems } = cart

    const showSidebarHandler = () => {
        setShowSidebar(true)
    }

    const hideSidebarHandler = () => {
        setShowSidebar(false)
    }

    const signoutHandler = () => {
        dispatch(signout())
    }

    return (
        <>
            <header className={classes.header}>
                <Container className={classes.container}>
                    <div className={classes["header-wrapper"]}>
                        <div className="header-logo">
                            <h2 className={classes["header-logo__brand"]}><Link to='/'>E-Store</Link></h2>
                        </div>
                        <div className={classes["header-nav"]}>
                            <Nav.Link className={classes["header-nav__link"]} as={Link} to="/cart">
                                Кошик
                                { cartItems.length > 0 && <Badge className={classes['cart-badge']}>{cartItems.length}</Badge>}
                            </Nav.Link>
                            {
                                userInfo
                                    ? (
                                        <Dropdown>
                                            <Dropdown.Toggle
                                                variant=""
                                                className={classes.dropdown}
                                            >
                                                {userInfo.name}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu
                                                className={classes['dropdown-menu']}
                                            >
                                                <Dropdown.Item
                                                    as={Link}
                                                    to="/orders"
                                                    className={classes['dropdown-menu__item']}
                                                >
                                                    Замовлення
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    as={Link}
                                                    to="/profile"
                                                    className={classes['dropdown-menu__item']}
                                                >
                                                    Профіль
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    className={classes['dropdown-menu__item']}
                                                    onClick={signoutHandler}
                                                >
                                                    Вийти
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    )
                                    : (
                                        <Nav.Link className={classes["header-nav__link"]} as={Link} to="/signin">
                                            Увійти
                                        </Nav.Link>
                                    )}
                            { userInfo && userInfo.isAdmin && (
                                // <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
                                <Dropdown>
                                    <Dropdown.Toggle
                                        variant=""
                                        className={classes.dropdown}
                                    >
                                        Admin
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu
                                        className={classes['dropdown-menu']}
                                    >
                                        <Dropdown.Item
                                            as={Link}
                                            to="/dashboard"
                                            className={classes['dropdown-menu__item']}
                                        >
                                            Панель інструментів
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            as={Link}
                                            to="/product-list"
                                            className={classes['dropdown-menu__item']}
                                        >
                                            Продукти
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            as={Link}
                                            to="/order-list"
                                            className={classes['dropdown-menu__item']}
                                        >
                                            Замовлення
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            as={Link}
                                            to="/user-list"
                                            className={classes['dropdown-menu__item']}
                                        >
                                            Користувачі
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            )}
                            <GiHamburgerMenu className={classes.toggle} onClick={showSidebarHandler} />
                        </div>
                    </div>
                </Container>
            </header>
            <Sidebar show={showSidebar} hide={hideSidebarHandler} />
        </>
    );
};

export default Header;