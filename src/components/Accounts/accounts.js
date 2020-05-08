import React ,{useEffect} from 'react';
import { Redirect, Link } from 'react-router-dom';
import { getTransactions } from '../../services/transactions';
import TransactionDisplay from '../../containers/Transactions/transactionDisplay';
import { getAccounts } from '../../services/accounts';
import './accounts.css';
import { FaRegSmileWink } from "react-icons/fa";
import {useSelector , useDispatch} from 'react-redux';
import {handleDivClicked , handleAccounts} from '../../actionCreators/accounts/accounts';
import {handleTransactions} from '../../actionCreators/transactions/transactions';

function Accounts(){
    let backgroundIndex = -1;
    const backgroundColors = [["#adf1f7", "#5cebf7"],
    ["#f7bcbc", "#f75757"],
    ["#d8bcf7", "#9236f7"],
    ["#f7abe3", "#f046c3"],
    ["#f29dae", "#f04668"],
    ["#a7e1f2", "#5ad0f2"]]
    
    const dispatch =  useDispatch();
    const accounts=useSelector(state=>state.Accounts.accounts)
    const transactions=useSelector(state=>state.Transactions.transactions)
    const accountClicked=useSelector(state=>state.Accounts.accountClicked)

    async function getUserAccounts() {
        let accounts = await getAccounts()
        console.log(accounts)
        dispatch(handleAccounts(accounts))
    }
    async function getUserTransactions() {
        let transactions = await getTransactions()
        dispatch(handleTransactions(transactions))
    }

    useEffect(() => {
        getUserAccounts()
        getUserTransactions()
    }, [])

    
    const handleDelete = async () => {
        let accounts = await getAccounts()
        dispatch(handleAccounts(accounts))
        let transactions = await getTransactions()
        dispatch(handleTransactions(transactions))
    }
    const handleDivisionClicked = (name) => {
        dispatch(handleDivClicked(name))
    }
    
        return (
            <div>
                <div className="divMain">
                    <div className="divAccountLabel">
                        <label className="accountsLabel" >ACCOUNTS</label>
                    </div>
                    <div className="divAccounts">
                        {accounts.map(obj => {
                            let display = (++backgroundIndex) % 5;
            
                            return (<div className="AccountCard" 
                            style={{ background: "linear-gradient(" + backgroundColors[display][0] + "," + backgroundColors[display][1] + ")" }} 
                            onClick={() => { handleDivisionClicked(obj.accountName) }}>
                                <div className="smileDiv">
                                    <FaRegSmileWink />
                                </div>
                                <div className="AccountCardSub">
                                    <label className="accNameLabel" > {obj.accountName} </label>
                                    <b className="balanceLabel"> ₹ {obj.accountBalance.toLocaleString('en-IN')} </b>
                                </div>
                            </div>)
                        })
                        }
                        <div className="AccountCard">
                            <Link to='/accounts/addaccount' className="addAccLink" >+</Link>
                        </div>
                    </div>
                </div>
                <div className="transactionDiv">
                    <div className="transactionDiv2">
                        <label className="addTransactionLabel"> RECENT TRANSACTIONS</label>
                        <Link to="/accounts/addtransaction" className="AddTransactionButton">Add Transaction</Link>
                    </div>
                </div>
                <div className="transDisplayTopDiv" >

                    {transactions.length !== 0 ? transactions.map(item => {
                        return <TransactionDisplay onDelete={handleDelete}>{item}</TransactionDisplay>
                    }) : <h1>NO RECENT TRANSACTIONS</h1>}
                </div>
                {accountClicked ? <Redirect to={`/accounts/specificAccountTransactions/${accountClicked}`} /> : null}
            </div>
        )
   
}
export default Accounts;