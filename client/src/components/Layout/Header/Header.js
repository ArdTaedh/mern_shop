import React, {useState} from 'react';
import {Container, Nav} from "react-bootstrap";


import classes from './Header.module.scss'
import {Link} from "react-router-dom";
import {GiHamburgerMenu} from "react-icons/all";
import Sidebar from "../Sidebar/Sidebar";

const Header = () => {
    const [showSidebar, setShowSidebar] = useState(false)

    const showSidebarHandler = () => {
        setShowSidebar(true)
    }

    const hideSidebarHandler = () => {
        setShowSidebar(false)
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
                            <Nav.Link className={classes["header-nav__link"]}>
                                Кошик
                            </Nav.Link>
                            <Nav.Link className={classes["header-nav__link"]}>
                                Увійти
                            </Nav.Link>
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