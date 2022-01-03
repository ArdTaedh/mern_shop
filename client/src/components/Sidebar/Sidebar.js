import React, {useState} from 'react';
import {Badge, Offcanvas} from "react-bootstrap";

import classes from './Sidebar.module.scss'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {signout} from "../../store/actions/userActions";
import { IoMdArrowDropdown } from 'react-icons/io'

const Sidebar = (props) => {
    const [dropdown, showDropwdown] = useState(false)

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin

    const { cartItems } = cart

    const signoutHandler = () => {
        dispatch(signout())
    }

    let dropdownItems = (
        <ul className={dropdown ? classes['dropdown-active'] : classes.dropdown}>
            <li className={classes['dropdown-item']}><Link className={classes['dropdown-item__link']} to="/orders">Замовлення</Link></li>
            <li className={classes['dropdown-item']}><Link className={classes['dropdown-item__link']} to="/profile">Профіль</Link></li>
            <li className={classes['dropdown-item']} onClick={signoutHandler}>Вийти</li>
        </ul>
    )

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
                    <div className={classes["sidebar-nav__item"]}>
                        {
                            userInfo
                                ? (
                                    <li className={classes['name-item']} onClick={() => showDropwdown(!dropdown)}>
                                        {userInfo.name} <IoMdArrowDropdown className={dropdown ? classes['arrow-up'] : classes['arrow-down']} />
                                        {
                                            dropdown && dropdownItems
                                        }
                                    </li>
                                )
                                : (
                                    <Link
                                        className={classes["sidebar-nav__link"]}
                                        onClick={props.hide}
                                        to="/signin"
                                    >
                                        Увійти
                                    </Link>
                                )
                        }
                    </div>
                </ul>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default Sidebar;