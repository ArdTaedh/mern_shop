 import axios from "axios";
import {
    CART_ADD_ITEM, CART_ADD_ITEM_FAIL,
    CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD,
    CART_SET_SHIPPING_ADDRESS
} from "../constants/cartConstants";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${productId}`)

    const { cart: { cartItems }} = getState()

    if (cartItems.length > 0 && data.seller._id !== cartItems[0].seller._id) {
        dispatch({
            type: CART_ADD_ITEM_FAIL,
            payload: `Додавати товари у кошик можна лише товари ${cartItems[0].seller.seller.name} у поточному замовленні`
        })
    } else {
        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                product: data._id,
                seller: data.seller,
                qty
            }
        })
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    }


}

export const removeFromCart = (productID) => async (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productID })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const setShippingAddress = (data) => async (dispatch) => {
    dispatch({
        type: CART_SET_SHIPPING_ADDRESS,
        payload: data
    })
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

 export const savePaymentMethod = (data) => async (dispatch) => {
     dispatch({
         type: CART_SAVE_PAYMENT_METHOD,
         payload: data
     })
 }