import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from 'redux-thunk'

import {productCreateReducer, productDetailsReducer, productListReducer} from "./reducers/productReducers";
import {cartReducer} from "./reducers/cartReducers";
import {
    userDetailsReducer,
    userRegisterRedcuer,
    userSigninRedcuer,
    userUpdateProfileReducer
} from "./reducers/userReducers";
import {orderDetailsReducers, orderMineListReducer, orderPayReducer, orderReducers} from "./reducers/orderReducers";

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null
    },
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingAddress: localStorage.getItem('shippingAddress')
            ? JSON.parse(localStorage.getItem('shippingAddress'))
            : {},
        paymentMethod: 'Paypal'
    }
}

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninRedcuer,
    userRegister: userRegisterRedcuer,
    orderCreate: orderReducers,
    orderDetails: orderDetailsReducers,
    orderPay: orderPayReducer,
    orderMineList: orderMineListReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    productCreate: productCreateReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
)

export default store