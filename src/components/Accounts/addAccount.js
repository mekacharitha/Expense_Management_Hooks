import React , {useState, useEffect} from 'react';
import {Redirect } from 'react-router-dom';
import { addAccount } from '../../services/accounts';
import './addAccount.css';
import Toast from 'light-toast';
import {useDispatch , useSelector} from 'react-redux';
import {onAccountNameChange,
    onAccountBalanceChange,
    onAddAccount} from '../../actionCreators/accounts/accounts';

function AddAccounts(){

    const dispatch = useDispatch();
    const accountName = useSelector(state=>state.Accounts.accountName) ;
    const accountBalance = useSelector(state=>state.Accounts.accountBalance);
    const [onAccount , onAccountChange] = useState(false);
    
    useEffect(()=>{
        onAccountChange(false)
    } , [])

    const handleAddAccount = async () => {
        let account = await addAccount(accountName, accountBalance)
        if (account) {
            dispatch(onAddAccount(account))
            Toast.success("account added successfully", 500);
            onAccountChange(true)
        }
        else {
            dispatch(onAddAccount(account))
            onAccountChange(false)
            Toast.fail("account name already exists", 500)
        }
    }
    const handleAccountName = (e) => {
        
        dispatch(onAccountNameChange(e.target.value))
    }
    const handleAccountBalance = (e) => {
        
        dispatch(onAccountBalanceChange(e.target.value))
    }
    
       return (
            <div className="mainDivAddAcc">
                <div >
                    <label className="newAccLabel"> NEW ACCOUNT</label>
                    <br />
                </div>
                <div className="elementsDiv" >
                    <label>Account Name</label>
                    <br />
                    <input type="text" onChange={handleAccountName} className="InputField"></input>
                </div>
                <div className="elementsDiv">
                    <label>Starting Balance</label>
                    <br />
                    <input type="text" onChange={handleAccountBalance} className="InputField"></input>
                </div>
                <div className="buttonDiv">
                    <button onClick={handleAddAccount} className="AddAccButton" >Add Account</button> 
                </div>
                {onAccount ? <Redirect to='/accounts'></Redirect> : null}
            </div>
        )
    
}
export default AddAccounts;