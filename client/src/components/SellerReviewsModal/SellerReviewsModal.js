import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import MessageBox from "../MessageBox/MessageBox";
import Rating from "../Rating/Rating";
import moment from "moment";
import Loading from "../Loading/Loading";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {SELLER_REVIEW_RESET} from "../../store/constants/userConstants";
import {createSellertReview, getUserSellerInfo} from "../../store/actions/userActions";
import classes from './SellerReviewsModal.module.scss'

const SellerReviewsModal = ({show, hide, sellerId}) => {
    const dispatch = useDispatch()

    const sellerInfo = useSelector(state => state.userSellerCheckInfo)
    const {loading: loadingSeller, error: errorSeller, user: sellerUser} = sellerInfo


    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin

    const sellerReviewCreate = useSelector(state => state.sellerReviewCreate)
    const {loading: loadingReview, error: errorReview, success: successReview} = sellerReviewCreate

    useEffect(() => {
        if (successReview) {
            alert('Відгук залишено успішно')
            setRating('')
            setComment('')
            dispatch({type: SELLER_REVIEW_RESET})
        }

        dispatch(getUserSellerInfo(sellerId))
    }, [dispatch, sellerId, successReview])

    const submitHandler = (e) => {
        e.preventDefault()

        if (comment && rating) {
            dispatch(createSellertReview(sellerId, userInfo._id, {rating, comment, name: userInfo.name}))
        } else {
            alert("Будь ласка заповніть форму відгуку")
        }
    }

    return (
        <Modal show={show} onHide={hide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Відгуки</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    loadingSeller
                        ? <Loading />
                        : errorSeller
                            ? <MessageBox variant="danger">{errorSeller}</MessageBox>
                            : (
                                <div className="review-wrapper">
                                    <h3 style={{fontWeight: "bold"}}>Відгуки</h3>
                                    {
                                        sellerUser.seller.reviews.length === 0 &&
                                        <MessageBox varaint="info">Нема відгуків</MessageBox>
                                    }
                                    <div className="review">
                                        {sellerUser.seller.reviews.map(review => (
                                            <div
                                                className="product-review"
                                                key={review._id}
                                            >
                                                <h4
                                                    className="review-name"
                                                >
                                                    {review.name}
                                                </h4>
                                                <p className="review-time__created" style={{marginBottom: "0.4rem"}}>
                                                    {moment(review.createdAt.substr(0, 10)).format("DD-MM-YYYY")}
                                                </p>
                                                <Rating
                                                    rating={review.rating}
                                                    caption=" "
                                                />
                                                <p className="comment">
                                                    {review.comment}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                    {loadingReview && <Loading/>}
                                    {errorReview && <MessageBox variant="danger" style={{ margin: "1rem auto", width: "50%" }}>{errorReview}</MessageBox>}
                                    <div className={classes["review-form__wrapper"]}>
                                        {
                                            userInfo
                                                ? (
                                                    <Form
                                                        className={classes["review-form"]}
                                                        onSubmit={submitHandler}
                                                    >
                                                        <h3>Залиште свій відгук про товар</h3>
                                                        <Form.Group>
                                                            <Form.Label>
                                                                Рейтинг
                                                            </Form.Label>
                                                            <Form.Select
                                                                value={rating}
                                                                onChange={(e) => setRating(e.target.value)}
                                                            >
                                                                <option value="">Оберіть рейтинг</option>
                                                                <option value="1">Низький</option>
                                                                <option value="2">Непоганий</option>
                                                                <option value="3">Середній</option>
                                                                <option value="4">Вище середнього</option>
                                                                <option value="5">Високий</option>
                                                            </Form.Select>
                                                        </Form.Group>
                                                        <Form.Group>
                                                            <Form.Label>Коментар</Form.Label>
                                                            <Form.Control
                                                                as="textarea"
                                                                value={comment}
                                                                onChange={(e) => setComment(e.target.value)}
                                                            >

                                                            </Form.Control>
                                                        </Form.Group>
                                                        <Button
                                                            type="submit"
                                                        >
                                                            Залишити
                                                        </Button>
                                                    </Form>
                                                )
                                                : (
                                                    <MessageBox>
                                                        <Link to="/signin">Авторизуйтесь</Link> щоб залишити відгук
                                                    </MessageBox>
                                                )
                                        }
                                    </div>
                                </div>
                            )
                }

            </Modal.Body>
        </Modal>
    );
};

export default SellerReviewsModal;