import React, { useEffect,useState} from "react";
import { Route, Switch } from "react-router-dom";
import Accounts from '../containers/Accounts/accounts';
import AddAccounts from '../containers/Accounts/addAccount';
import AddTransaction from '../containers/Transactions/addTransaction';
import SpecificAccount from '../containers/Transactions/specificAccountTransaction';
import { localStorageGetItem } from '../services/utils';
import jwt from "jsonwebtoken";
import './routes.css';
import EditTransaction from '../containers/Transactions/editTransaction';
import {AiOutlineLogout } from "react-icons/ai";
import Toast from 'light-toast';
import {useDispatch} from 'react-redux';
import {logout} from '../actionCreators/users/users';

function Dashboard(props) {
    
    const [username, setUserName] = useState('')
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout(null))
        localStorage.removeItem("token")
        Toast.success("logout successful", 500)
    }
    useEffect(() => {
        let payload = jwt.decode(localStorageGetItem("token"));
        setUserName(payload.userName)
    }, [])
    
        return (
            <div>
                <div className="mainDiv">
                    <div className="labelDiv">
                        <label className="label">EXPENSE TRACKER</label>
                    </div>
                    <div className="rightDiv">
                        <div className="labelDiv2"><label className="label">Hi {username}</label></div>
                        <button onClick={handleLogout} className="logoutBtn"><AiOutlineLogout /></button>
                    </div>
                </div>
                <div className="content-container">
                    <Switch>
                        <Route exact path={`${props.match.path}/addaccount`}><AddAccounts /></Route>
                        <Route path={`${props.match.path}/addtransaction`}>  <AddTransaction /> </Route>
                        <Route path={`${props.match.path}/edittransaction`}><EditTransaction /> </Route>
                        <Route path={`${props.match.path}/specificAccountTransactions`}><SpecificAccount /></Route>
                        <Route path={`${props.match.path}`} exact><Accounts /></Route>
                    </Switch>
                </div>
                <div className="footer">
                    
                </div>
            </div>
        )
  
}


export default Dashboard;