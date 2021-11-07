import React from 'react';
import Header from "../../../components/Layout/Header/Header";
import {Container, Form, Button, NavLink} from "react-bootstrap";

import classes from './scss/Signin.module.scss'
import Footer from "../../../components/Layout/Footer/Footer";

const SigninPage = () => {
    return (
        <div className={classes["signin-page"]}>
            <Header/>
                <Container className={classes['signin-container']}>
                    <div className={classes["signin-wrapper"]}>
                        <h2 className={classes['form-brand']}>Авторизація</h2>
                        <Form
                            className={classes['signin-form']}
                            // onClick={}
                        >
                            <Form.Group>
                                <Form.Label className={classes['form-label']}>Email</Form.Label>
                                <Form.Control size="lg" type="email" placeholder="Введіть email" />
                            </Form.Group>
                            <Form.Group className="mt-2">
                                <Form.Label className={[classes['form-label'], classes.second]}>Пароль</Form.Label>
                                <Form.Control size="lg"  type="password" placeholder="Введіть пароль" />
                            </Form.Group>
                            <Button size="lg" className={classes["signin-btn"]} variant="primary" type="submit">
                                Увійти
                            </Button>
                            <div className={classes["new-customer"]}>
                                <p>Новий покупець?</p>
                                <NavLink style={{ padding: 0 }}>Стовріть аккаунт</NavLink>
                            </div>
                        </Form>
                    </div>
                </Container>
            <Footer style={{ marginTop: 0 }} />
        </div>
    );
};

export default SigninPage;