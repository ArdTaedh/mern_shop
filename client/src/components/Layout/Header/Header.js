import React from 'react';
import {Container, Nav} from "react-bootstrap";

import classes from './Header.module.scss'

const Header = () => {
    return (
        <header className={classes.header}>
            <Container className={classes.container}>
                <div className={classes["header-wrapper"]}>
                    <div className={classes["header-logo"]}>
                        <h2 className={classes["header-logo__brand"]}>E-Store</h2>
                    </div>
                    <div className={classes["header-nav"]}>
                        <Nav.Link className={classes["header-nav__link"]}>
                            Кошик
                        </Nav.Link>
                        <Nav.Link className={classes["header-nav__link"]}>
                            Увійти
                        </Nav.Link>
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default Header;