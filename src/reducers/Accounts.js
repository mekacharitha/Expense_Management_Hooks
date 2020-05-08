import {
    accountNameChange,
    accountBalanceChange,
    addAccount, divClicked,
    onDivClick,
    accounts
} from '../actions/accountsActionConstants';

const initialState = {
    accountName: '',
    accountBalance: 0,
    addedAccount: false,
    redirect: '',
    accountClicked: null,
    divClicked: null,
    accounts: [],
}

const accountsReducer = (state = initialState, action) => {
    switch (action.type) {
        case accountNameChange: {
            return {
                ...state,
                accountName: action.payload
            }
        }

        case accountBalanceChange: {
            return {
                ...state,
                accountBalance: action.payload
            }
        }
        case addAccount: {
            return {
                ...state,
                addedAccount: action.payload
            }
        }
        case divClicked: {
            return {
                ...state,
                accountClicked: action.payload
            }
        }
        case onDivClick: {
            return {
                ...state,
                divClicked: action.payload
            }
        }
        case accounts: {
            console.log(action.payload);
            return{
                ...state,
                accounts:action.payload
            }
        }
        default: return state;
    }
}

export default accountsReducer;