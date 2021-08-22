import React from 'react';

import './Header.scss'
import {Container} from "react-bootstrap";

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