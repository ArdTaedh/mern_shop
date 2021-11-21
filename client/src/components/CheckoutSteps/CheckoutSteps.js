import React from 'react';
import {ProgressBar} from "react-bootstrap";

import classes from './CheckoutSteps.module.scss'

const CheckoutSteps = (props) => {
    return (
        <ProgressBar
            className={classes["checkout-steps"]}
        >
            <ProgressBar className={classes['checkout-step']} now={props.step1} key={1} label={"Авторизація"} />
            <ProgressBar className={classes['checkout-step']} now={props.step2} key={2} label="Адреса Доставки" />
            <ProgressBar now={props.step3 ? props.step3 : null} key={3} label="Оплата" />
            <ProgressBar now={props.step3 ? props.step3 : null} key={4} label="Замовлення" />
        </ProgressBar>
    );
};

export default CheckoutSteps;