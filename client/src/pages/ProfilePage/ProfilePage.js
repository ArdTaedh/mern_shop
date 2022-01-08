import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Container, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";

import {detailsUser, updateUserProfile} from "../../store/actions/userActions";

import classes from './ProfilePage.module.scss'
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loading/Loading";
import MessageBox from "../../components/MessageBox/MessageBox";
import {Helmet} from "react-helmet";
import {USER_UPDATE_PROFILE_RESET} from "../../store/constants/userConstants";

const ProfilePage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()

    const userUpdate = useSelector(state => state.userUpdateProfile)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate

    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    useEffect(() => {
        if(!user) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET })
            dispatch(detailsUser(userInfo._id))
        } else {
            setName(user.name)
            setEmail(user.email)
        }

    }, [dispatch, userInfo._id, user])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            alert('Паролі не співпадають')
        } else {
            dispatch(updateUserProfile({
                userId: user._id,
                name,
                email,
                password
            }))
        }
    }

    return (
        <div className={classes["profile-page"]}>
            <Header />
            <Container className={classes.container}>
                <div className="text-center">
                    <h1>Ваш профіль</h1>
                </div>
                <div className={classes["form-wrapper"]}>
                    <Form className={classes["user-form"]} onSubmit={submitHandler}  >

                        {
                            loading
                                ? <Loading />
                                : error
                                    ? <MessageBox variant="danger">{error}</MessageBox>
                                    : ( <>
                                            {loadingUpdate && <Loading />}
                                            {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                                            {successUpdate && <MessageBox variant="success">Дані було оновлені успішно</MessageBox>}
                                            <Helmet>
                                                <title>Профіль</title>
                                            </Helmet>
                                            <FormGroup className={classes["name-control"]}>
                                                <Form.Label className={classes['form-label']}>ПІБ</Form.Label>
                                                <FormControl
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    size="lg"
                                                />
                                            </FormGroup>
                                            <FormGroup className={classes["email-control"]}>
                                                <FormLabel className={classes['form-label']}>Email</FormLabel>
                                                <FormControl
                                                    type="email"
                                                    value={email}
                                                    size="lg"
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </FormGroup>
                                            <FormGroup className={classes['password-control']}>
                                                <FormLabel className={classes['form-label']}>Пароль</FormLabel>
                                                <FormControl
                                                    type="password"
                                                    size="lg"
                                                    placeholder="Введіть пароль"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </FormGroup>
                                            <FormGroup className={classes['confirm-password__control']}>
                                                <FormLabel className={classes['form-label']}>Підтвердіть Пароль</FormLabel>
                                                <FormControl
                                                    type="password"
                                                    size="lg"
                                                    placeholder="Підтвердіть пароль"
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                />
                                            </FormGroup>
                                            <div className="actions">
                                                <Button
                                                    type="submit"
                                                    size="lg"
                                                >
                                                    Оновити
                                                </Button>
                                            </div>
                                        </>
                                    )
                        }
                    </Form>
                </div>
            </Container>
            <Footer />
        </div>
    );
};

export default ProfilePage;