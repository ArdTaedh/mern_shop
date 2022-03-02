import React, {useEffect} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import { Chart } from 'react-google-charts'

import classes from './DashboardPage.module.scss'
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loading/Loading";
import MessageBox from "../../components/MessageBox/MessageBox";
import { BsFillCartFill, FaUserAlt, RiMoneyDollarCircleFill } from "react-icons/all";
import {useDispatch, useSelector} from "react-redux";
import {summaryOrder} from "../../store/actions/orderActions";

const DashboardPage = () => {
    const dispatch = useDispatch()

    const orderSummary = useSelector(state => state.orderSummary)
    const { loading, error, summary } = orderSummary

    useEffect(() => {
        dispatch(summaryOrder())
    }, [dispatch])

    return (
        <div
            className={classes['dashboard-page']}
        >
            <Header/>
            <Container
                className={classes['dashboard-container']}
            >
                <h2>Панель інструментів</h2>
                {
                    loading
                        ? <Loading />
                        : error
                            ? <MessageBox variant="danger">{error}</MessageBox>
                            : (
                <Row
                    className={classes['dashboard-wrapper__row']}
                >
                    <Col
                        className={classes['dashboard-info__first']}
                    >
                        <Card
                            className={classes["dashboard-users"]}
                        >
                            <Card.Header>
                                <FaUserAlt/>
                                Користувачі
                            </Card.Header>
                            <Card.Body>
                                {summary.users[0].numUsers}
                            </Card.Body>
                        </Card>
                        <Card
                            className={classes["dashboard-orders"]}
                        >
                            <Card.Header>
                                <BsFillCartFill/>
                                Замовлення
                            </Card.Header>
                            <Card.Body>
                                {summary.orders[0] ? summary.orders[0].numOrders : 0}
                            </Card.Body>
                        </Card>
                        <Card
                            className={classes["dashboard-sales"]}
                        >
                            <Card.Header>
                                <RiMoneyDollarCircleFill/>
                                Продажі
                            </Card.Header>
                            <Card.Body>
                                ₴{
                                    summary.orders[0]
                                        ? summary.orders[0].totalSales.toFixed(2)
                                        : 0
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col
                        className={classes['dashboard-info__second']}
                    >
                        <h2>Продажі</h2>
                        {
                            summary.dailyOrders.length === 0
                                ? (
                                    <MessageBox>Інформація відсутня</MessageBox>
                                )
                                : (
                                    <Chart
                                        width='100%'
                                        height='400px'
                                        chartType='AreaChart'
                                        loader={<Loading />}
                                        data={[
                                            ['Дата', 'Витрачено'],
                                            ...summary.dailyOrders.map((x) => [x._id, x.sales])
                                        ]}
                                    />
                                )
                        }
                    </Col>
                    <Col
                        className={classes['dashboard-info__third']}
                    >
                        <h2>Категорії</h2>
                        {
                            summary.dailyOrders.length === 0
                                ? (
                                    <MessageBox>Інформація відсутня</MessageBox>
                                )
                                : (
                                    <Chart
                                        width='100%'
                                        height='400px'
                                        chartType='PieChart'
                                        loader={<Loading />}
                                        data={[
                                            ['Категорія', 'Товари'],
                                            ...summary.productCategories.map((x) => [x._id, x.count])
                                        ]}
                                    />
                                )
                        }
                    </Col>
                </Row>
                            )
                }
            </Container>
            <Footer/>
        </div>
    );
};

export default DashboardPage;