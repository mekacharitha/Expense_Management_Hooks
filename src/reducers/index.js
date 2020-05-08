import { combineReducers } from 'redux';
import Users from './Users';
import Accounts from './Accounts'
import Transactions from './Transactions'
export default combineReducers({
    Users,
    Accounts,
    Transactions
    
})