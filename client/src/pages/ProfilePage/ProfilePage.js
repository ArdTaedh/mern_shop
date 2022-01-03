import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Container, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";

import {detailsUser} from "../../store/actions/userActions";

import classes from './ProfilePage.module.scss'
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loading/Loading";
import MessageBox from "../../components/MessageBox/MessageBox";

const ProfilePage = () => {
    const dispatch = useDispatch()

    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    useEffect(() => {
        dispatch(detailsUser(userInfo._id))
    }, [dispatch, userInfo._id])

    const submitHandler = (e) => {
        e.preventDefault()
    }

    return (
        <div className={classes["profile-page"]}>
            <Header />
            <Container className={classes.container}>
                <div className="text-center">
                    <h1>Ваш профіль</h1>
                </div>
                <div className={classes["form-wrapper"]}>
                    <Form className={classes["user-form"]}  >

                        {
                            loading
                                ? <Loading />
                                : error
                                    ? <MessageBox variant="danger">{error}</MessageBox>
                                    : ( <>
                                            <FormGroup className={classes["name-control"]}>
                                                <Form.Label className={classes['form-label']}>ПІБ</Form.Label>
                                                <FormControl type="text" value={user.name} size="lg" />
                                            </FormGroup>
                                            <FormGroup className={classes["email-control"]}>
                                                <FormLabel className={classes['form-label']}>Email</FormLabel>
                                                <FormControl type="email" value={user.email} size="lg" />
                                            </FormGroup>
                                            <FormGroup className={classes['password-control']}>
                                                <FormLabel className={classes['form-label']}>Пароль</FormLabel>
                                                <FormControl type="password" size="lg"  />
                                            </FormGroup>
                                            <FormGroup className={classes['confirm-password__control']}>
                                                <FormLabel className={classes['form-label']}>Підтвердіть Пароль</FormLabel>
                                                <FormControl type="password" size="lg" placeholder="Підтвердіть пароль" />
                                            </FormGroup>
                                            <div className="actions">
                                                <Button
                                                    type="submit"
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