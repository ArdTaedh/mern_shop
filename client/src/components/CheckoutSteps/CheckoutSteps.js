import React from 'react';
import {ProgressBar} from "react-bootstrap";

import classes from './CheckoutSteps.module.scss'

const CheckoutSteps = (props) => {
    return (
        <ProgressBar
            className={classes["checkout-steps"]}
        >
            <ProgressBar className={classes['checkout-step']} now={props.step1 ? props.step1 : null} key={1} label={"Авторизація"} />
            <ProgressBar className={classes['checkout-step']} now={props.step2 ? props.step2 : null} key={2} label="Адреса Доставки" />
            <ProgressBar className={classes['checkout-step']} now={props.step3 ? props.step3 : null} key={3} label="Оплата" />
            <ProgressBar className={classes['checkout-step']} now={props.step4 ? props.step4 : null} key={4} label="Замовлення" />
        </ProgressBar>
    );
};

export default CheckoutSteps;