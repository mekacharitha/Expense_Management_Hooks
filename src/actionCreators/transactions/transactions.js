import {handleTransaction , editTransaction} from '../../actions/transactionsActionConstants';

export const handleTransactions = (value) => {
    return {
        type : handleTransaction,
        payload : value
    }
}

export const handleEditTransaction = (value) => {
    return {
        type : editTransaction,
        payload : value
    }
}