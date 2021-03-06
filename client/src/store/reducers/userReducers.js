import {
    SELLER_REVIEW_CREATE_FAIL,
    SELLER_REVIEW_CREATE_REQUEST, SELLER_REVIEW_CREATE_SUCCESS, SELLER_REVIEW_RESET,
    USER_CHECK_FAIL,
    USER_CHECK_REQUEST,
    USER_CHECK_SUCCESS,
    USER_DELETE_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_RESET,
    USER_DELETE_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_RESET,
    USER_DETAILS_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS, USER_SELLER_CHECK_INFO_FAIL, USER_SELLER_CHECK_INFO_REQUEST, USER_SELLER_CHECK_INFO_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_TOPSELLERS_LIST_FAIL,
    USER_TOPSELLERS_LIST_REQUEST,
    USER_TOPSELLERS_LIST_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_RESET,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_REQUEST,
    USER_UPDATE_RESET,
    USER_UPDATE_SUCCESS
} from "../constants/userConstants";

export const userSigninRedcuer = (state = {}, action) => {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { loading: true }
        case USER_SIGNIN_SUCCESS:
            return  { loading: false, userInfo: action.payload }
        case USER_SIGNIN_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {  }
        default:
            return state
    }
}

export const userRegisterRedcuer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true }
        case USER_REGISTER_SUCCESS:
            return  { loading: false, userInfo: action.payload }
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userDetailsReducer = (state = {loading: true}, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { loading: true }
        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload }
        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        case USER_DETAILS_RESET:
            return { loading: true }
        default:
            return state
    }
}

export const userCheckReducer = (state = {loading: true}, action) => {
    switch (action.type) {
        case USER_CHECK_REQUEST:
            return { loading: true }
        case USER_CHECK_SUCCESS:
            return { loading: false, user: action.payload }
        case USER_CHECK_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return { loading: true }
        case USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: true }
        case USER_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload }
        case USER_UPDATE_PROFILE_RESET:
            return {}
        default:
            return state
    }
}

export const userListReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return { loading: true }
        case USER_LIST_SUCCESS:
            return { loading: false, users: action.payload }
        case USER_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DELETE_REQUEST:
            return { loading: true }
        case USER_DELETE_SUCCESS:
            return { loading: false, success: true }
        case USER_DELETE_FAIL:
            return { loading: false, error: action.payload }
        case USER_DELETE_RESET:
            return {}
        default:
            return state
    }
}

export const userUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return { loading: true }
        case USER_UPDATE_SUCCESS:
            return { loading: false, success: true }
        case USER_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case USER_UPDATE_RESET:
            return {}
        default:
            return state
    }
}

export const topSellerListReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case USER_TOPSELLERS_LIST_REQUEST:
            return { loading: true }
        case USER_TOPSELLERS_LIST_SUCCESS:
            return { loading: false, sellers: action.payload }
        case USER_TOPSELLERS_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userSellerDetailsReducer = (state = {loading: true}, action) => {
    switch (action.type) {
        case USER_SELLER_CHECK_INFO_REQUEST:
            return { loading: true }
        case USER_SELLER_CHECK_INFO_SUCCESS:
            return { loading: false, user: action.payload }
        case USER_SELLER_CHECK_INFO_FAIL:
            return { loading: false, error: action.payload }
        // case USER_DETAILS_RESET:
        //     return { loading: true }
        default:
            return state
    }
}

export const userSellerReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case SELLER_REVIEW_CREATE_REQUEST:
            return { loading: true }
        case SELLER_REVIEW_CREATE_SUCCESS:
            return { loading: false, success: true, review: action.payload }
        case SELLER_REVIEW_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case SELLER_REVIEW_RESET:
            return {}
        default:
            return state
    }
}