import React from 'react';
import {Container} from "react-bootstrap";
import {RiInstagramLine, RiYoutubeFill, RiFacebookCircleFill, RiVisaLine, RiMastercardFill } from 'react-icons/ri'

import classes from './Footer.module.scss'


const Footer = () => {
    return (
        <footer className={classes.footer}>
            <Container className={classes.container}>
                <div className={classes["footer-wrapper"]}>
                    <div className="footer-brand">
                        <h4 className={classes["footer-brand__text1"]}>
                            E-Store
                        </h4>
                        <h6 className={classes["footer-brand__text2"]}>Усі права захищено</h6>
                    </div>
                    <div className={classes["footer-social"]}>
                        <h5 className={classes["footer-social__brand"]}>
                            Ми в соцмережах
                        </h5>
                        <div className={classes["social-networks"]}>
                            <div className="insta-wrapper">
                                <RiInstagramLine  className={classes['insta-logo']}/>
                            </div>
                            <div className="youtube-wrapper">
                                <RiYoutubeFill  className={classes['youtube-logo']}/>
                            </div>
                            <div className="facebook-wrapper">
                                <RiFacebookCircleFill version='2' className={classes['facebook-logo']}/>
                            </div>
                        </div>
                    </div>
                    <div className="footer-payment">
                        <h5 className={classes['footer-payment__text']}>Способи оплати</h5>
                        <div className={classes["payment-methods"]}>
                            <div className={classes["visa-wrapper"]}>
                                <RiVisaLine className={classes['visa-icon']} />
                            </div>
                            <div className="mastercard-wrapper">
                                <RiMastercardFill className={classes['mastercard-icon']} />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;