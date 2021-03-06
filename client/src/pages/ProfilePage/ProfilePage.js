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
import axios from "axios";

const ProfilePage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [sellerName, setSellerName] = useState('')
    const [sellerLogo, setSellerLogo] = useState('')
    const [loadingUpload, setLoadingUpload] = useState(false)
    const [errorUpload, setErrorUpload] = useState(false)
    const [sellerDescription, setSellerDescription] = useState('')

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

            if (user.seller) {
                setSellerName(user.seller.name)
                setSellerLogo(user.seller.logo)
                setSellerDescription(user.seller.description)
            }
        }

    }, [dispatch, userInfo._id, user])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            alert('???????????? ???? ??????????????????????')
        } else {
            dispatch(updateUserProfile({
                userId: user._id,
                name,
                email,
                password,
                sellerName,
                sellerLogo,
                sellerDescription,
            }))
        }
    }

    const uploadSellerLogoHandler = async (e) => {
        const file = e.target.files[0]
        const bodyFormData = new FormData()

        bodyFormData.append('image', file)
        setLoadingUpload(true)

        try {
            const { data } = await axios.post('/api/uploads', bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            })
            setSellerLogo(data)
            setLoadingUpload(false)
        } catch (err) {
            setErrorUpload(err.message)
            setLoadingUpload(false)
        }
    }

    return (
        <div className={classes["profile-page"]}>
            <Header />
            <Container className={classes.container}>
                <div className="text-center">
                    <h1>?????? ??????????????</h1>
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
                                            {successUpdate && <MessageBox variant="success">???????? ???????? ???????????????? ??????????????</MessageBox>}
                                            <Helmet>
                                                <title>??????????????</title>
                                            </Helmet>
                                            <FormGroup className={classes["name-control"]}>
                                                <Form.Label className={classes['form-label']}>??????</Form.Label>
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
                                                <FormLabel className={classes['form-label']}>????????????</FormLabel>
                                                <FormControl
                                                    type="password"
                                                    size="lg"
                                                    placeholder="?????????????? ????????????"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </FormGroup>
                                            <FormGroup className={classes['confirm-password__control']}>
                                                <FormLabel className={classes['form-label']}>?????????????????????? ????????????</FormLabel>
                                                <FormControl
                                                    type="password"
                                                    size="lg"
                                                    placeholder="?????????????????????? ????????????"
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                />
                                            </FormGroup>
                                            {
                                                user.isSeller && (
                                                    <>
                                                        <h3>???????????????????? ?????? ????????????????</h3>
                                                        <FormGroup className={classes["name-control"]}>
                                                            <Form.Label className={classes['form-label']}>?????? ????????????????</Form.Label>
                                                            <FormControl
                                                                type="text"
                                                                value={sellerName}
                                                                placeholder="?????????????? ?????? ????????????????"
                                                                onChange={(e) => setSellerName(e.target.value)}
                                                                size="lg"
                                                            />
                                                        </FormGroup>
                                                        <Form.Group className="mt-2">
                                                            <Form.Label className={classes['form-label']}>????????</Form.Label>
                                                            <Form.Control
                                                                className={classes['form-input']}
                                                                size="lg"
                                                                type="text"
                                                                placeholder="?????????????? ???????? ????????????????"
                                                                value={sellerLogo}
                                                                onChange={(e) => setSellerLogo(e.target.value)}
                                                                disabled
                                                            />
                                                        </Form.Group>
                                                        <Form.Group controlId="formFile" className="mt-3">
                                                            <Form.Control type="file" onChange={uploadSellerLogoHandler} />
                                                            {loadingUpload && <Loading />}
                                                            {errorUpload && <MessageBox variant="danger">{errorUpload}</MessageBox> }
                                                        </Form.Group>
                                                        <FormGroup className={classes["seller-description__control"]}>
                                                            <Form.Label className={classes['form-label']}>???????? ????????????????</Form.Label>
                                                            <FormControl
                                                                type="text"
                                                                value={sellerDescription}
                                                                placeholder="?????????????? ???????? ????????????????"
                                                                onChange={(e) => setSellerDescription(e.target.value)}
                                                                size="lg"
                                                            />
                                                        </FormGroup>
                                                    </>
                                                )
                                            }
                                            <div className="actions mt-2">
                                                <Button
                                                    type="submit"
                                                    size="lg"
                                                >
                                                    ??????????????
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