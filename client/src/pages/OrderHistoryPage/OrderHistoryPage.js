import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import Loading from "../../components/Loading/Loading";
import MessageBox from "../../components/MessageBox/MessageBox";
import Header from "../../components/Header/Header";
import {Helmet} from "react-helmet";
import {Breadcrumb, Button, Container, Table} from "react-bootstrap";
import Footer from "../../components/Footer/Footer";

import classes from './OrderHistoryPage.module.scss'
import {listMineOrders} from "../../store/actions/orderActions";
import moment from "moment";
import {LinkContainer} from "react-router-bootstrap";

const OrderHistoryPage = (props) => {
    const orderMineList = useSelector(state => state.orderMineList)
    const {loading, error, orders} = orderMineList

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listMineOrders())
    }, [dispatch])

    return (
        <div className={classes["order-history__page"]}>
            <Header/>
            <Container className={classes['order-history__container']}>
            {
                loading
                    ? <Loading/>
                    : error
                        ? <MessageBox variant="danger">{error}</MessageBox>
                        : orders.length > 0
                            ? (
                            <>
                                <Helmet>
                                    <title>Замовлення</title>
                                </Helmet>
                                    <Breadcrumb className={classes.breadcrumb}>
                                        <LinkContainer to="/">
                                            <Breadcrumb.Item>Головна</Breadcrumb.Item>
                                        </LinkContainer>
                                        <Breadcrumb.Item active>Історія замовлень</Breadcrumb.Item>
                                    </Breadcrumb>
                                    <h2 className="mb-2">Історія замовлень</h2>
                                    <Table className={classes.table} responsive>
                                        <thead className={classes['table-head']}>
                                        <tr className={classes['table-row']}>
                                            <th>ID</th>
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
                                                    <td datatype="Дата">{moment(order.createdAt).format("DD-MM-YYYY HH:mm")}</td>
                                                    <td datatype="Ціна">{order.totalPrice}</td>
                                                    <td datatype="Оплачено">
                                                        {order.isPaid
                                                            ? (<MessageBox className={classes.success} variant="success">
                                                                {moment(order.paidAt).format("DD-MM-YYYY HH:mm")}
                                                            </MessageBox>)
                                                            : (<MessageBox className={classes.success} variant="danger">
                                                                Не оплачено
                                                            </MessageBox>)
                                                        }
                                                    </td>
                                                    <td datatype="Доставлено">
                                                        {order.isDelivered
                                                            ? (<MessageBox className={classes.success} variant="success">
                                                                {moment(order.isDelivered).format("DD-MM-YYYY HH:mm")}
                                                            </MessageBox>)
                                                            : (<MessageBox className={classes.success} variant="danger">
                                                                Не доставлено
                                                            </MessageBox>)
                                                        }
                                                    </td>
                                                    <td datatype="Дії">
                                                        <Button
                                                            type="button"
                                                            onClick={() => {
                                                                props.history.push(`/order/${order._id}`)
                                                            }}
                                                        >
                                                            Деталі
                                                        </Button>
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

export default OrderHistoryPage;