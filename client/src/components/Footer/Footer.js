import React from 'react';

import './Footer.scss'
import {Container} from "react-bootstrap";

const Footer = () => {
    return (
        <footer className='footer'>
            <Container>
                <div className="footer-wrapper">
                    <div className="footer-brand">
                        <h2 className="footer-brand__logo">
                            Footer
                        </h2>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;