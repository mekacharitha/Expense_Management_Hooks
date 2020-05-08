import React, { useState, useEffect } from 'react'
import { deleteTransaction } from '../../services/transactions'
import { Link, Redirect } from 'react-router-dom'
import { FiEdit } from "react-icons/fi"
import { MdDelete } from "react-icons/md"
import './transactions.css'
import { getAccountNameById } from '../../services/accounts'
import Toast from 'light-toast';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { handleEditTransaction } from '../../actionCreators/transactions/transactions';

function TransactionDisplay(props) {
    const dispatch = useDispatch()
    const [onDeleteTransaction, setOnDeleteTransaction] = useState(false)
    const [accountName, setAccountName] = useState('')
    useEffect(() => {
        fetchAccountNameById(props.children.accountId)
        setOnDeleteTransaction(false)
    }, [props.children.accountId])
    
    const handleDelete = async (transactionId) => {
        await deleteTransaction(transactionId)
        props.onDelete()
        Toast.success("transaction deleted", 500)
    }
    async function fetchAccountNameById(accountId) {
        let accName = await getAccountNameById(props.children.accountId)
        setAccountName(accName)
    }
   
    
    return (
        <div className="transactionCard" >
            <div className="TransactionItem1"> {props.children.type}</div>
            <div className="TransactionItem2"> {props.children.description}</div>
            <div className="TransactionItem3"> {moment(props.children.date).format('DD-MM-YYYY')}</div>
            <div className="TransactionItem4"> ₹ {props.children.amount.toLocaleString('en-IN')}</div>
            <div className="TransactionItem5">{accountName}</div>
            <div className="iconDiv">
                <MdDelete onClick={async () => await handleDelete(props.children.id)} className="deleteIcon" />
                <Link className="editIcon" 
                    onClick={() => { dispatch(handleEditTransaction(props.children.id) )}} 
                    to={`/accounts/edittransaction/${props.children.id}`}><FiEdit style={{ color: "black" }} /></Link>
            </div>
        </div>
    )

}
export default TransactionDisplay;



