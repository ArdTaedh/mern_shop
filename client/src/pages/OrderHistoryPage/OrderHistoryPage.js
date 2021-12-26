import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import Loading from "../../components/Loading/Loading";
import MessageBox from "../../components/MessageBox/MessageBox";
import Header from "../../components/Header/Header";
import {Helmet} from "react-helmet";
import {Button, Container, Table} from "react-bootstrap";
import Footer from "../../components/Footer/Footer";

import classes from './OrderHistoryPage.module.scss'
import {Redirect} from "react-router-dom";
import {listMineOrders} from "../../store/actions/orderActions";
import moment from "moment";

const OrderHistoryPage = (props) => {
    const orderMineList = useSelector(state => state.orderMineList)
    const { loading, error, orders } = orderMineList

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listMineOrders())
    }, [dispatch])

    return (
        <div className={classes["order-history__page"]}>
            {
                loading
                    ? <Loading />
                    : error
                        ? <MessageBox variant="danger">{error}</MessageBox>
                        : (
                            <>
                                <Helmet>
                                    <title>Замовлення</title>
                                </Helmet>
                                <Header />
                                <Container className={classes['order-history__container']}>
                                    <Table className="table">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Дата</th>
                                                <th>Ціна</th>
                                                <th>Оплачено</th>
                                                <th>Доставлено</th>
                                                <th>Дії</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {


                                                orders.map(order => (
                                                    <tr key={order._id}>
                                                        <td>{order._id}</td>
                                                        <td>{moment(order.createdAt).format("DD-MM-YYYY HH:mm")}</td>
                                                        <td>{order.totalPrice}</td>
                                                        <td>{order.isPaid ? moment(order.paidAt).format("DD-MM-YYYY HH:mm") : "Не оплачено"}</td>
                                                        <td>{order.isDelivered ? order.isDelivered : "Не доставлено"}</td>
                                                        <td>
                                                            <Button
                                                                type="button"
                                                                size="sm"
                                                                onClick={()=> {props.history.push(`/order/${order._id}`)}}
                                                            >
                                                                Деталі
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </Table>
                                </Container>
                                <Footer />
                            </>
                        )
            }

        </div>
    );
};

export default OrderHistoryPage;