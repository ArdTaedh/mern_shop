import React, {useEffect} from 'react';
import {Helmet} from "react-helmet";
import {Button, Container, Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../../store/actions/productActions";

import classes from './ProductListPage.module.scss'
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loading/Loading";
import MessageBox from "../../components/MessageBox/MessageBox";



const ProductListPage = (props) => {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {loading, error, products} = productList

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    const deleteHandler = () => {

    }

    return (
        <div className={classes['product-list__page']}>
            <Header/>
            <Container>
                <Helmet>
                    <title>Продукти</title>
                </Helmet>
                <h3 className="my-2">Продукти</h3>
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