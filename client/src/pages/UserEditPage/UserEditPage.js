import React, {useEffect, useState} from 'react';
import classes from "./UserEditPage.module.scss";
import Header from "../../components/Header/Header";
import {Button, Container, Form} from "react-bootstrap";
import Loading from "../../components/Loading/Loading";
import MessageBox from "../../components/MessageBox/MessageBox";
import {Helmet} from "react-helmet";
import Footer from "../../components/Footer/Footer";
import {useDispatch, useSelector} from "react-redux";
import {detailsUser, updateUser} from "../../store/actions/userActions";
import {USER_UPDATE_RESET} from "../../store/constants/userConstants";

const UserEditPage = (props) => {
    const userId = props.match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [seller, setSeller] = useState(false)
    const [admin, setAdmin] = useState(false)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate

    useEffect(() => {
        if(successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            props.history.push('/user-list')
        }
        if (!user) {
            dispatch(detailsUser(userId))
        } else {
            setName(user.name)
            setEmail(user.email)
            setSeller(user.isSeller)
            setAdmin(user.isAdmin)
        }
    }, [dispatch, userId, user, successUpdate, props.history])

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(updateUser({ _id: userId, name, email, seller, admin }))
    }

    return (
        <div className={classes["user-edit__page"]}>
            <Header/>
            <Container className={classes['user-edit__container']}>
                {loadingUpdate && <Loading />}
                {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                {
                    loading
                        ? <Loading/>
                        : error
                            ? <MessageBox variant="danger">{error}</MessageBox>
                            : (
                                <div className={classes["edit-form__wrapper"]}>
                                    <Helmet>
                                        <title>Змінити продукт</title>
                                    </Helmet>
                                    <h3 className={classes['form-header']}>Змінити дані користувача: {name}</h3>
                                    <Form
                                        className={classes['user-edit__form']}
                                        onSubmit={submitHandler}
                                    >
                                        <Form.Group>
                                            <Form.Label className={classes['form-label']}>ПІБ</Form.Label>
                                            <Form.Control
                                                className={classes['form-input']}
                                                size="lg"
                                                type="text"
                                                placeholder="Введіть ПІБ користувача"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mt-2">
                                            <Form.Label className={classes['form-label']}>Email</Form.Label>
                                            <Form.Control
                                                className={classes['form-input']}
                                                size="lg"
                                                type="text"
                                                placeholder="Введіть ціну продукту"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mt-3 d-flex gap-3">
                                            <Form.Label className={classes['form-label']}>Продавець</Form.Label>
                                            <Form.Check
                                                type="checkbox"
                                                checked={seller}
                                                onChange={(e) => setSeller(e.target.checked)}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mt-2 d-flex gap-3">
                                            <Form.Label className={classes['form-label']}>Admin</Form.Label>
                                            <Form.Check
                                                type="checkbox"
                                                onChange={(e) => setAdmin(e.target.checked)}
                                                checked={admin}
                                            />
                                        </Form.Group>
                                        <Button className="mt-2" type="submit">Оновити</Button>
                                    </Form>
                                </div>
                            )
                }
            </Container>
            <Footer/>
        </div>
    );
};

export default UserEditPage;