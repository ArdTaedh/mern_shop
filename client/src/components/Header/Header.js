import React from 'react';
import {Container} from "react-bootstrap";

import './Header.scss'

const Header = () => {
    return (
        <header className='header'>
            <Container>
                <div className="header-wrapper">
                    <div className="header-logo">
                        <h2 className="header-logo__brand">E-Store</h2>
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default Header;