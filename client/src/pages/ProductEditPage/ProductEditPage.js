import React, {useEffect, useState} from 'react';

import classes from './ProductEditPage.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {detailsProduct, updateProduct} from "../../store/actions/productActions";
import Header from "../../components/Header/Header";
import {Button, Container, Form} from "react-bootstrap";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loading/Loading";
import MessageBox from "../../components/MessageBox/MessageBox";
import {Helmet} from "react-helmet";
import {PRODUCT_UPDATE_RESET} from "../../store/constants/productConstants";
import axios from "axios";

const ProductEditPage = (props) => {
    const dispatch = useDispatch()
    const productId = props.match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState('')
    const [brand, setBrand] = useState('')
    const [description, setDescription] = useState('')

    const [loadingUpload, setLoadingUpload] = useState(false)
    const [errorUpload, setErrorUpload] = useState(false)

    const productDetails = useSelector((state) => state.productDetails);
    const {loading, error, product} = productDetails;

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin

    useEffect(() => {
        if(successUpdate) {
            // props.history.push('/product-list');
            window.location = '/product-list'
        }
        if (!product || product._id !== productId || successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            dispatch(detailsProduct(productId))
        } else {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setBrand(product.brand)
            setDescription(product.description)
        }
    }, [product, dispatch, productId, successUpdate, props.history])

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(updateProduct({
            _id: productId,
            name,
            brand,
            image,
            price,
            category,
            countInStock,
            description
        }))
    }

    const uploadFileHandler = async (e) => {
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
            setImage(data)
            setLoadingUpload(false)
        } catch (err) {
            setErrorUpload(err.message)
            setLoadingUpload(false)
        }
    }

    return (
        <div className={classes["product-edit__page"]}>
            <Header/>
            <Container className={classes['product-edit__container']}>
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
                                    <Form
                                        className={classes['product-edit__form']}
                                        onSubmit={submitHandler}
                                    >
                                        <h3 className={classes['form-header']}>Продукт {product._id}</h3>
                                        <Form.Group>
                                            <Form.Label className={classes['form-label']}>Назва</Form.Label>
                                            <Form.Control
                                                className={classes['form-input']}
                                                size="lg"
                                                type="text"
                                                placeholder="Введіть назву продукту"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mt-2">
                                            <Form.Label className={classes['form-label']}>Ціна</Form.Label>
                                            <Form.Control
                                                className={classes['form-input']}
                                                size="lg"
                                                type="text"
                                                placeholder="Введіть ціну продукту"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mt-2">
                                            <Form.Label className={classes['form-label']}>Фото</Form.Label>
                                            <Form.Control
                                                className={classes['form-input']}
                                                size="lg"
                                                type="text"
                                                placeholder="Оберіть фото продукту"
                                                value={image}
                                                onChange={(e) => setImage(e.target.value)}
                                                disabled
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formFile" className="mb-3">
                                            {/*<Form.Label>Default file input example</Form.Label>*/}
                                            <Form.Control className="mt-3" type="file" onChange={uploadFileHandler} />
                                            {loadingUpload && <Loading />}
                                            {errorUpload && <MessageBox variant="danger">{errorUpload}</MessageBox> }
                                        </Form.Group>
                                        <Form.Group className="mt-2">
                                            <Form.Label className={classes['form-label']}>Категорія</Form.Label>
                                            <Form.Control
                                                className={classes['form-input']}
                                                size="lg"
                                                type="text"
                                                placeholder="Введіть категорію продукту"
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mt-2">
                                            <Form.Label className={classes['form-label']}>Залишок на складі</Form.Label>
                                            <Form.Control
                                                className={classes['form-input']}
                                                size="lg"
                                                type="number"
                                                placeholder="Введіть кількість товару на складі"
                                                value={countInStock}
                                                onChange={(e) => setCountInStock(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mt-2">
                                            <Form.Label className={classes['form-label']}>Бренд</Form.Label>
                                            <Form.Control
                                                className={classes['form-input']}
                                                size="lg"
                                                type="text"
                                                placeholder="Введіть назву бренду"
                                                value={brand}
                                                onChange={(e) => setBrand(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mt-2">
                                            <Form.Label className={classes['form-label']}>Опис</Form.Label>
                                            <Form.Control
                                                className={classes['form-input']}
                                                size="lg"
                                                type="text"
                                                placeholder="Введіть назву продукту"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
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

export default ProductEditPage;