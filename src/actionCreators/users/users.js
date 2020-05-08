import {userNameChange,
    passwordChange,
    onSignin,
    onSignup,
    removeToken} from '../../actions/userActionConstants';

export const usernameChangeHandler = (payload) => {
    return {
        type: userNameChange,
        payload
    }
} 

export const passwordChangeHandler = (payload) => {
    return {
        type: passwordChange,
        payload
    }
}

export const signin = (token) => {
    return {
        type: onSignin,
        payload: {
            token: token ? token : null,
        }
    }
} 

export const signup = (value) => {
    return{
        type: onSignup,
        payload: value,
    }
}

export const logout = (value) => {
    return{
        type:removeToken,
        payload:value,
    }
}