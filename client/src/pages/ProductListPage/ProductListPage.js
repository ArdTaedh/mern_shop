import React, {useEffect} from 'react';
import {Helmet} from "react-helmet";
import {Button, Container, Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {createProduct, listProducts} from "../../store/actions/productActions";

import classes from './ProductListPage.module.scss'
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loading/Loading";
import MessageBox from "../../components/MessageBox/MessageBox";
import {PRODUCT_CREATE_RESET} from "../../store/constants/productConstants";



const ProductListPage = (props) => {
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {loading, error, products} = productList

    const productCreate = useSelector(state => state.productCreate)
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct
    } = productCreate

    useEffect(() => {
        if (successCreate) {
            dispatch({ type: PRODUCT_CREATE_RESET })
            props.history.push(`/product/${createdProduct._id}/edit`)
        }
        dispatch(listProducts())
    }, [dispatch, createdProduct, props.history, successCreate])

    const createHandler = () => {
        dispatch(createProduct())
    }

    const deleteHandler = () => {

    }

    return (
        <div className={classes['product-list__page']}>
            <Header/>
            <Container>
                <Helmet>
                    <title>Продукти</title>
                </Helmet>
                <div className={classes["product-header"]}>
                    <h3 className="">Продукти</h3>
                    <Button
                        type="button"
                        onClick={createHandler}
                    >
                        Стоврити
                    </Button>
                </div>
                { loadingCreate && <Loading /> }
                { errorCreate && <MessageBox variant="danger">{error}</MessageBox> }
                {
                    loading
                        ? <Loading/>
                        : error
                            ? <MessageBox variant="danger">{error}</MessageBox>
                            : (
                                <Table className={classes.table} responsive>
                                    <thead className={classes['table-head']}>
                                    <tr className={classes['table-row']}>
                                        <th>ID</th>
                                        <th>Назва</th>
                                        <th>Ціна</th>
                                        <th>Категорія</th>
                                        <th>Бренд</th>
                                        <th>Дії</th>
                                    </tr>
                                    </thead>
                                    <tbody className={classes['table-body']}>
                                    {
                                        products.map(product => (
                                            <tr
                                                key={product._id}
                                                className={classes['table-row']}
                                            >
                                                <td datatype="ID">{product._id}</td>
                                                <td datatype="Назва">{product.name}</td>
                                                <td datatype="Ціна">{product.price}</td>
                                                <td datatype="Категорія">
                                                    {product.category}
                                                </td>
                                                <td datatype="Бренд">
                                                    {product.brand}
                                                </td>
                                                <td datatype="Дії">
                                                    {/*<Button*/}
                                                    {/*    type="button"*/}
                                                    {/*    onClick={() => {*/}
                                                    {/*        props.history.push(`/order/${order._id}`)*/}
                                                    {/*    }}*/}
                                                    {/*>*/}
                                                    {/*    Деталі*/}
                                                    {/*</Button>*/}
                                                    <div className={classes["product-actions"]}>
                                                        <Button
                                                            type="button"
                                                            onClick={() =>
                                                                props.history.push(`/product/${product._id}/edit`)
                                                            }
                                                        >
                                                            Змінити
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            variant="danger"
                                                            onClick={() => deleteHandler(product) }
                                                        >
                                                            Видалити
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </Table>
                            )
                }
            </Container>
            <Footer/>

        </div>
    );
};

export default ProductListPage;