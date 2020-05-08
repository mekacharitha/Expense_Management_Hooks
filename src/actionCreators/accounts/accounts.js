import {
    divClicked,
    onDivClick,
    accountNameChange,
    accountBalanceChange,
    addAccount,
    accounts
} from '../../actions/accountsActionConstants';

export const handleDivClicked = (value) => {
    // console.log("in div clicked"+ value);
    return {
        type: divClicked,
        payload: value
    }
}

export const onDivClicked = (value) => {
   return {
        type: onDivClick,
        payload: value
    }
}

export const handleAccounts = (value) => {
    return {
        type:accounts,
        payload:value
    }
}

export const onAccountNameChange = (value) => {
    return {
        type: accountNameChange,
        payload: value
    }
}

export const onAccountBalanceChange = (value) => {
    return {
        type: accountBalanceChange,
        payload: value,
    }
}

export const onAddAccount = (value) => {
    return {
        type: addAccount,
        payload: value,
    }   
}