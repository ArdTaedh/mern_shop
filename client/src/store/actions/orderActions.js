import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DELETE_FAIL,
    ORDER_DELETE_REQUEST,
    ORDER_DELETE_SUCCESS,
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_MINE_LIST_FAIL,
    ORDER_MINE_LIST_REQUEST,
    ORDER_MINE_LIST_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS, ORDER_SUMMARY_FAIL, ORDER_SUMMARY_REQUEST, ORDER_SUMMARY_SUCCESS
} from "../constants/orderConstants";
import axios from "axios";
import {SET_CART_EMPTY} from "../constants/cartConstants";
import {signout} from "./userActions";

export const createOrder = (order) => async (dispatch, getState) => {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order })

    try {
        const {userSignin: {userInfo}} = getState()
        const {data} = await axios.post('/api/orders', order, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order })
        dispatch({ type: SET_CART_EMPTY })
        localStorage.removeItem("cartItems")
    } catch (err) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        })
    }
}

export const detailsOrder = (orderId) => async (dispatch, getState) => {
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId })
    const {userSignin: {userInfo}} = getState()
    try {
        const {data} = await axios.get(`/api/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
    } catch (err) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        })
    }
}

export const payOrder = (order, paymentResult) => (dispatch, getState) => {
    dispatch({ type: ORDER_PAY_REQUEST, payload: { order, paymentResult } })
    const { userSignin: { userInfo }} = getState()

    try {
        const { data } = axios.put(`/api/orders/${order._id}/pay`, paymentResult, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: ORDER_PAY_SUCCESS, payload: data })
    } catch (err) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        })
    }
}

export const listMineOrders = () => async (dispatch, getState) => {
    dispatch({ type: ORDER_MINE_LIST_REQUEST })
    const { userSignin: { userInfo } } = getState()

    try {
        const { data } = await axios.get('/api/orders/mine', {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: data })
    } catch (err) {
        const message = err.response && err.response.data.message
            ? err.response.data.message
            : err.message;
        dispatch({ type: ORDER_MINE_LIST_FAIL, payload: message })
        if(message === 'Недійсний токен') {
            dispatch(signout())
        }
    }
}

export const listOrders = ({ seller = '' }) => async (dispatch, getState) => {
    dispatch({ type: ORDER_LIST_REQUEST })

    const { userSignin: { userInfo } } = getState()

    try {
        const { data } = await axios.get(`/api/orders?seller=${seller}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: ORDER_LIST_SUCCESS, payload: data })
    } catch (err) {
        const message = err.response && err.response.data.message
            ? err.response.data.message
            : err.message;
        dispatch({ type: ORDER_LIST_FAIL, payload: message })
        if(message === 'Недійсний токен') {
            dispatch(signout())
        }
    }
}

export const deleteOrder = orderId => async (dispatch, getState) => {
    dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId })

    const { userSignin: { userInfo } } = getState()

    try {
        const { data } = await axios.delete(`/api/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: ORDER_DELETE_SUCCESS, payload: data })
    } catch (err) {
        const message = err.response && err.response.data.message
            ? err.response.data.message
            : err.message;
        dispatch({ type: ORDER_DELETE_FAIL, payload: message })
        if(message === 'Недійсний токен') {
            dispatch(signout())
        }
    }
}

export const deliverOrder = (orderId) => (dispatch, getState) => {
    dispatch({ type: ORDER_DELIVER_REQUEST, payload: orderId })
    const { userSignin: { userInfo }} = getState()

    try {
        const { data } = axios.put(`/api/orders/${orderId}/deliver`, {}, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data })
    } catch (err) {
        dispatch({
            type: ORDER_DELIVER_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        })
    }
}

export const summaryOrder = () => async (dispatch, getState) => {
    dispatch({ type: ORDER_SUMMARY_REQUEST })
    const { userSignin: { userInfo }} = getState()

    try {
        const { data } = await axios.get('/api/orders/summary', {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: ORDER_SUMMARY_SUCCESS, payload: data })
    } catch (err) {
        const message = err.response && err.response.data.message
            ? err.response.data.message
            : err.message;
        dispatch({ type: ORDER_SUMMARY_FAIL, payload: message })
    }
}