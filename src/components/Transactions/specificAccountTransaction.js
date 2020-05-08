import React, { useState, useEffect } from 'react'
import { deleteTransaction, getTransactionByAccountName } from '../../services/transactions'
import { getAccountBalance } from '../../services/accounts'
import { Link } from 'react-router-dom'
import { IoMdArrowRoundBack } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import './specificAccountTransaction.css'
import moment from 'moment';
import Toast from 'light-toast';
import { FaRegSmileWink } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { onDivClicked, handleDivClicked } from '../../actionCreators/accounts/accounts';
import { handleEditTransaction } from '../../actionCreators/transactions/transactions';

function SpecificAccountTransaction() {
    
    const [accountBalance, setAcccountBalance] = useState(0)
    const [transaction, setTransaction] = useState([])
     const [accountName, setAccountName] = useState('')
    const accountClicked = useSelector(state => state.Accounts.accountClicked)
    const accounts = useSelector(state => state.Accounts.accounts)
    const dispatch = useDispatch()

    async function fetchTransactionByAccountName() {
        let trans = await getTransactionByAccountName(accountClicked)
        setTransaction(trans)
    }
    async function fetchAccountBalance() {
        let accBalance = await getAccountBalance(accountClicked)
        setAcccountBalance(accBalance)
    }
    const handleDelete = async (transactionId) => {
        await deleteTransaction(transactionId)
        fetchTransactionByAccountName()
        fetchAccountBalance()
        Toast.success("transaction deleted successfully", 500)
    }
    useEffect(() => {
        fetchTransactionByAccountName()
        fetchAccountBalance()
    }, [])

    return (
        <div>
            <div className="linkDiv">
                <Link onClick={() => { dispatch(handleDivClicked(null)) }} to="/accounts"><IoMdArrowRoundBack style={{ fontSize: "50px", color: "black" }} /></Link>
            </div>
            <div className="subDivBtn">
                <div className="AccountCard2">
                    <div className="smileDiv">
                        <FaRegSmileWink />
                    </div>
                    <div className="AccountCardSub">
                        <label className="nameLabel" >{window.location.pathname.substr(38)}</label>
                        <b className="accName"> ₹ {(accountBalance).toLocaleString('en-IN')} </b>
                    </div>
                </div>
                <div className="buttonDiv">
                    <Link to={`/accounts/addtransaction/${accountClicked}`} className="AddTransactionButton">Add Transaction</Link>
                </div>
            </div>
            <div className="mainTransc">
                {transaction.length !== 0 ? transaction.map(obj => {
                    return <div className="transactionCard">
                        <div className="TransactionItem1">   {obj.type}</div>
                        <div className="TransactionItem2"> {obj.description}</div>
                        <div className="TransactionItem3">{moment(obj.date).format('DD-MM-YYYY')}</div>
                        <div className="TransactionItem4"> {obj.amount.toLocaleString('en-IN')}</div>
                        <div>
                            <MdDelete className="deleteIcon" onClick={() => handleDelete(obj.id)} />
                            <Link className="editIcon" onClick={() => { dispatch(handleEditTransaction(obj.id)) }} to={`/accounts/edittransaction/${obj.transactionId}`}><FiEdit style={{ color: "black" }} /></Link>
                        </div>
                    </div>
                }) : <h1>No Recent transactions</h1>}
            </div>
        </div>
    )

}
export default SpecificAccountTransaction;



