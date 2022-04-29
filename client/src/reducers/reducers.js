import { combineReducers } from 'redux'

export const loaderReducer = ( loader = true, action) => {
    switch (action.type) {
        case "LOADING":
            return true
        case "EXIT_LOADING":
            return false
        default:
            return loader;
    }
}

export const userReducer = (user = null, action) => {
    switch (action.type) {
        case "NEW_USER":
            return {...action.payload}
        case "LOGIN_USER":
            return {...action.payload}
        case "NO_USER":
            return user
        case "LOGOUT_USER":
            return user
        default:
           return user
    }
}

export const modalReducer = (modal = null, action) => {
    switch (action.type) {
        case "LOADING_MODAL":
            return { message : action.payload, status: 'loading' }
        case "SUCCESS_MODAL":
            return { message : action.payload, status: 'success' }
        case "ERROR_MODAL":
            return { message : action.payload, status: 'error' }
        case "RESET_MODAL":
            return null
        default:
           return modal
    }
}

export default combineReducers({
    currentUser: userReducer,
    loader: loaderReducer,
    modal: modalReducer
})