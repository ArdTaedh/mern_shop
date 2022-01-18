import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteOrder, listOrders} from "../../store/actions/orderActions";
import classes from "./OrderListPage.module.scss";
import Header from "../../components/Header/Header";
import {Breadcrumb, Button, Container, Table} from "react-bootstrap";
import Loading from "../../components/Loading/Loading";
import MessageBox from "../../components/MessageBox/MessageBox";
import {Helmet} from "react-helmet";
import {LinkContainer} from "react-router-bootstrap";
import moment from "moment";
import Footer from "../../components/Footer/Footer";
import {ORDER_DELETE_RESET} from "../../store/constants/orderConstants";

const OrderListPage = (props) => {
    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orderList)
    const {error, loading, orders} = orderList

    const orderDelete = useSelector(state => state.orderDelete)
    const {error: errorDelete, loading: loadingDelete, success: successDelete} = orderDelete

    useEffect(() => {
        dispatch({ type: ORDER_DELETE_RESET })
        dispatch(listOrders())
    }, [dispatch, successDelete])

    const deleteHandler = (order) => {
        if (window.confirm('Ви впевнені що хочете видалити замовлення?')) {
            dispatch(deleteOrder(order._id))
        }
    }



    return (
        <div className={classes["order-list__page"]}>
            <Header/>
            <Container className={classes['order-list__container']}>
                {
                    loading
                        ? <Loading/>
                        : error
                            ? <MessageBox variant="danger">{error}</MessageBox>
                            : orders.length > 0
                                ? (
                                    <>
                                        <Helmet>
                                            <title>Зомовлення клієнтів</title>
                                        </Helmet>
                                        <Breadcrumb className={classes.breadcrumb}>
                                            <LinkContainer to="/">
                                                <Breadcrumb.Item>Головна</Breadcrumb.Item>
                                            </LinkContainer>
                                            <Breadcrumb.Item active>Історія замовлень</Breadcrumb.Item>
                                        </Breadcrumb>
                                        <h2 className="mb-2">Історія замовлень</h2>
                                        {loadingDelete && <Loading />}
                                        {errorDelete && <MessageBox variant="danger">{orderDelete}</MessageBox>}

                                        <Table className={classes.table} responsive>
                                            <thead className={classes['table-head']}>
                                            <tr className={classes['table-row']}>
                                                <th>ID</th>
                                                <th>Користувач</th>
                                                <th>Дата</th>
                                                <th>Ціна</th>
                                                <th>Оплачено</th>
                                                <th>Доставлено</th>
                                                <th>Дії</th>
                                            </tr>
                                            </thead>
                                            <tbody className={classes['table-body']}>
                                            {


                                                orders.map(order => (
                                                    <tr
                                                        key={order._id}
                                                        className={classes['table-row']}
                                                    >
                                                        <td datatype="ID">{order._id}</td>
                                                        <td datatype="ID">{order.user.name}</td>
                                                        <td datatype="Дата">{moment(order.createdAt).format("DD-MM-YYYY HH:mm")}</td>
                                                        <td datatype="Ціна">{order.totalPrice}</td>
                                                        <td datatype="Оплачено">
                                                            {order.isPaid
                                                                ? (<MessageBox className={classes.success}
                                                                               variant="success">
                                                                    {moment(order.paidAt).format("DD-MM-YYYY HH:mm")}
                                                                </MessageBox>)
                                                                : (<MessageBox className={classes.success} variant="danger">
                                                                    Не оплачено
                                                                </MessageBox>)
                                                            }
                                                        </td>
                                                        <td datatype="Доставлено">
                                                            {order.isDelivered
                                                                ? (<MessageBox
                                                                        className={classes.success}
                                                                        variant="success"
                                                                    >
                                                                    Доставлено {moment(order.deliveredAt).format("DD-MM-YYYY HH:mm")}
                                                                    </MessageBox>)
                                                                : (<MessageBox className={classes.success} variant="danger">
                                                                    Не доставлено
                                                                </MessageBox>)
                                                            }
                                                        </td>
                                                        <td datatype="Дії">
                                                            <div className={classes["order-actions"]}>
                                                                <Button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        props.history.push(`/order/${order._id}`)
                                                                    }}
                                                                >
                                                                    Деталі
                                                                </Button>
                                                                <Button
                                                                    type="button"
                                                                    variant="danger"
                                                                    onClick={() => deleteHandler(order)}
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

                                    </>
                                )
                                : (<MessageBox variant="info">У вас немає замовлень</MessageBox>)
                }
            </Container>
            <Footer/>
        </div>
    );
};

export default OrderListPage;