import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import {Button, Container, Form, NavLink} from "react-bootstrap";

import classes from './scss/Register.module.scss'
import Header from "../../components/Layout/Header/Header";
import Footer from "../../components/Layout/Footer/Footer";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {register} from "../../store/actions/userActions";
import Loading from "../../components/Layout/Loading/Loading";
import MessageBox from "../../components/Layout/MessageBox/MessageBox";

const RegisterPage = (props) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const { userInfo, loading, error } = userRegister

    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/'

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword)
            alert('Паролі не співпадають')
        else
            dispatch(register(name, email, password))
    }

    useEffect(()=> {
        if (userInfo) {
            props.history.push(redirect)
        }
    }, [props.history, redirect, userInfo])

    return (
        <div className={classes["register-page"]}>
            <Helmet>
                <title>Реєстрація</title>
            </Helmet>
            <Header />
            <Container className={classes['register-container']}>
                <div className={classes["register-wrapper"]}>
                    <h2 className={classes["form-brand"]}>Реєстрація</h2>
                    <Form
                        className={classes['register-form']}
                        onSubmit={submitHandler}
                    >
                        { loading && <Loading />}
                        { error && <MessageBox variant="danger">{error}</MessageBox> }
                        <Form.Group>
                            <Form.Label className={classes['form-label']}>Логін</Form.Label>
                            <Form.Control
                                className={classes['form-input']}
                                size="lg"
                                type="text"
                                placeholder="Введіть логін"
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mt-2">
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
                            <Form.Label className={classes['form-label']}>Пароль</Form.Label>
                            <Form.Control
                                className={classes['form-input']}
                                size="lg"
                                type="password"
                                placeholder="Введіть пароль"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label className={classes['form-label']}>Повторіть Пароль</Form.Label>
                            <Form.Control
                                className={classes['form-input']}
                                size="lg"
                                type="password"
                                placeholder="Повторіть пароль"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button size="lg" className={classes["register-btn"]} variant="primary" type="submit">
                            Стоврити акаунт
                        </Button>
                        <div className={classes["new-customer"]}>
                            <p>Маєте акаунт?</p>
                            <NavLink style={{ padding: 0 }} as={Link} to={`/signin?redirect=${redirect}`}>Авторизуйтесь</NavLink>
                        </div>
                    </Form>
                </div>
            </Container>
            <Footer style={{ marginTop  : 0 }} />
        </div>
    );
};

export default RegisterPage;