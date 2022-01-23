import React, {useEffect} from 'react';
import classes from './UserListPage.module.scss'
import Header from "../../components/Header/Header";
import {Button, Container, Table} from "react-bootstrap";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loading/Loading";
import MessageBox from "../../components/MessageBox/MessageBox";
import {Helmet} from "react-helmet";
import {useDispatch, useSelector} from "react-redux";
import {deleteUser, usersList} from "../../store/actions/userActions";

const UserListPage = () => {
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const { error, loading, users } = userList

    const userDelete = useSelector(state => state.userDelete)
    const { error: errorDelete, loading: loadingDelete, success: successDelete } = userDelete


    useEffect(() => {
        dispatch(usersList())
    }, [dispatch, successDelete])

    const deleteHandler = (user) => {
        if (window.confirm("Ви впевнені що бажаєте видалити користувача?")) {
            dispatch(deleteUser(user._id))
        }
    }

    return (
        <div className={classes['user-list__page']}>
            <Header />
            <Container className={classes['user-list__container']}>
                <h2>Користувачі</h2>
                { loadingDelete && <Loading style={{ margin: "0.5rem 0" }} /> }
                { errorDelete && <MessageBox variant="danger" style={{ margin: "0.5rem 0" }}>{errorDelete}</MessageBox> }
                { successDelete && <MessageBox variant="success" style={{ margin: "0.5rem 0" }}>Операція успішна</MessageBox> }
                {
                    loading
                        ? <Loading />
                        : error
                            ? <MessageBox variant="danger">{error}</MessageBox>
                            : (
                                <>
                                    <Helmet>
                                        <title>Користувачі</title>
                                    </Helmet>
                                    <Table className={classes.table} responsive>
                                        <thead className={classes['table-head']}>
                                        <tr className={classes['table-row']}>
                                            <th>ID</th>
                                            <th>ПІБ</th>
                                            <th>Email</th>
                                            <th>Продавець</th>
                                            <th>Admin</th>
                                            <th>Дії</th>
                                        </tr>
                                        </thead>
                                        <tbody className={classes['table-body']}>
                                        {
                                            users.map(user => (
                                                <tr
                                                    key={user._id}
                                                    className={classes['table-row']}
                                                >
                                                    <td datatype="ID">{user._id}</td>
                                                    <td datatype="ПІБ">{user.name}</td>
                                                    <td datatype="Email">{user.email}</td>
                                                    <td datatype="Продавець">
                                                        {user.isSeller
                                                            ? (<MessageBox variant="success" style={{ padding: "0.5rem 1rem", marginBottom: "0.3rem" }}>Користувач є продавцем</MessageBox>)
                                                            : (<MessageBox variant="danger" style={{ padding: "0.5rem 1rem", marginBottom: "0.3rem" }}>Користувач не є продавцем</MessageBox>)
                                                        }
                                                    </td>
                                                    <td datatype="Admin">
                                                        {user.isAdmin
                                                            ? (<MessageBox variant="success" style={{ padding: "0.5rem 1rem", marginBottom: "0.3rem" }}>Користувач є адміністратором</MessageBox>)
                                                            : (<MessageBox variant="danger" style={{ padding: "0.5rem 1rem", marginBottom: "0.3rem" }}>Користувач не є адміністратором</MessageBox>)
                                                        }
                                                    </td>
                                                    <td datatype="Дії">
                                                        <div className={classes["order-actions"]}>
                                                            <Button
                                                                type="button"
                                                                // onClick={() => {
                                                                //     props.history.push(`/order/${order._id}`)
                                                                // }}
                                                            >
                                                                Змінити
                                                            </Button>
                                                            <Button
                                                                type="button"
                                                                variant="danger"
                                                                onClick={() => deleteHandler(user)}
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
                }
            </Container>
            <Footer />
        </div>
    );
};

export default UserListPage;