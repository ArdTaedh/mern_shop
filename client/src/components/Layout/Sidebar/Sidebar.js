import React from 'react';
import {Offcanvas} from "react-bootstrap";

import classes from './Sidebar.module.scss'
import {Link} from "react-router-dom";

const Sidebar = (props) => {
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
                       <Link className={classes["sidebar-nav__link"]} onClick={props.hide}>Кошик</Link>
                   </li>
                    <li className={classes["sidebar-nav__item"]} onClick={props.hide}>
                        <Link className={classes["sidebar-nav__link"]} onClick={props.hide}>Увійти</Link>
                    </li>
                </ul>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default Sidebar;