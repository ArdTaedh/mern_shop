import React from 'react';
import {Badge, Offcanvas} from "react-bootstrap";

import classes from './Sidebar.module.scss'
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const Sidebar = (props) => {
    const cart = useSelector(state => state.cart)

    const { cartItems } = cart

    return (
        <Offcanvas
            className={classes.sidebar}
            show={props.show}
            onHide={props.hide}
            placement={"end"}
        >
            <Offcanvas.Header className={classes['sidebar-header']} />
            <Offcanvas.Body className={classes['sidebar-body']}>
                <ul className={classes["sidebar-nav"]}>
                   <li className={classes["sidebar-nav__item"]} onClick={props.hide}>
                       <Link
                           className={classes["sidebar-nav__link"]}
                           onClick={props.hide}
                           to="/cart"
                       >
                           Кошик { cartItems.length > 0 && <Badge className={classes['cart-badge']}>{cartItems.length}</Badge>}
                       </Link>
                   </li>
                    <li className={classes["sidebar-nav__item"]} onClick={props.hide}>
                        <Link
                            className={classes["sidebar-nav__link"]}
                            onClick={props.hide}
                            to="/signin"
                        >
                            Увійти
                        </Link>
                    </li>
                </ul>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default Sidebar;