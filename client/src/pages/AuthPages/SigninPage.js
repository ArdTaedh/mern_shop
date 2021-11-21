import React, {useEffect, useState} from 'react';
import Header from "../../components/Header/Header";
import {Container, Form, Button, NavLink} from "react-bootstrap";

import classes from './scss/Signin.module.scss'
import Footer from "../../components/Footer/Footer";
import {Helmet} from "react-helmet";
import {useDispatch, useSelector} from "react-redux";
import {signin} from "../../store/actions/userActions";
import Loading from "../../components/Loading/Loading";
import MessageBox from "../../components/MessageBox/MessageBox";
import {Link} from "react-router-dom";

const SigninPage = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const userSignin = useSelector(state => state.userSignin)
    const { userInfo, loading, error } = userSignin


    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/'

    useEffect(()=> {
        if (userInfo) {
            props.history.push(redirect)
        }
    }, [props.history, redirect, userInfo])

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(signin(email, password))
    }

    return (
        <div className={classes["signin-page"]}>
            <Helmet>
                <title>Авторизація</title>
            </Helmet>
            <Header/>
                <Container className={classes['signin-container']}>
                    <div className={classes["signin-wrapper"]}>
                        <h2 className={classes['form-brand']}>Авторизація</h2>
                        <Form
                            className={classes['signin-form']}
                            onSubmit={submitHandler}
                        >
                            { loading && <Loading />}
                            { error && <MessageBox variant="danger">{error}</MessageBox> }
                            <Form.Group>
                                <Form.Label className={classes['form-label']}>Email</Form.Label>
                                <Form.Control
                                    className={classes['form-input']}
                                    size="lg"
                                    type="email"
                                    placeholder="Введіть email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mt-2">
                                <Form.Label className={[classes['form-label'], classes.second]}>Пароль</Form.Label>
                                <Form.Control
                                    className={classes['form-input']}
                                    size="lg"
                                    type="password"
                                    placeholder="Введіть пароль"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Button size="lg" className={classes["signin-btn"]} variant="primary" type="submit">
                                Увійти
                            </Button>
                            <div className={classes["new-customer"]}>
                                <p>Новий покупець?</p>
                                <NavLink style={{ padding: 0 }} as={Link} to={`/register?redirect=${redirect}`}>Стовріть аккаунт</NavLink>
                            </div>
                        </Form>
                    </div>
                </Container>
            <Footer style={{ marginTop: 0 }} />
        </div>
    );
};

export default SigninPage;