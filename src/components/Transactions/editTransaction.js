import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { editTransaction, getTransactionByTransactionId } from '../../services/transactions';
import { getAccounts, getAccountNameById } from '../../services/accounts';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import './editTransaction.css';
import Toast from 'light-toast';
import { useSelector, useDispatch } from 'react-redux';
import { handleAccounts } from '../../actionCreators/accounts/accounts';
import moment from 'moment';


function EditTransaction() {

    const [onEditTransaction, setOnEditTransaction] = useState(false);
    const [transactionType, setTransactionType] = useState('');
    const [accountName, setAccountName] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');


    const dispatch = useDispatch();
    const accounts = useSelector(state => state.Accounts.accounts)
    const accountClicked = useSelector(state => state.Accounts.accountClicked)
    const transactionClicked = useSelector(state => state.Transactions.transactionClicked)


    const getTransacId = async (transactionClicked) => {
       
        if (transactionClicked) {
            let obj = await getTransactionByTransactionId(transactionClicked)
            setTransactionType(obj.transactionType)
            let accountName = await getAccountNameById(obj.accountId)
            setAccountName(accountName)
            setDescription(obj.description)
            setAmount(obj.amount)
            setDate(new Date(obj.date))
        }
        else {
            setTransactionType('')
            setAccountName('')
            setDescription('')
            setAmount('')
            setDate('')
        }
        let accounts = await getAccounts()
        dispatch(handleAccounts(accounts))
        setOnEditTransaction(false)
    }

    useEffect(() => {
        getTransacId(transactionClicked)
    }, [transactionClicked])

    const handleEditTransaction = async () => {
        let transaction = {
            transactionType: transactionType,
            description: description,
            amount: amount,
            date: moment(date).format('DD-MM-YYYY'),
            accountName: accountName
        }
        console.log(transaction);
        if (await editTransaction(transaction, transactionClicked)) {
            setOnEditTransaction(true)
        }
        else {

            setOnEditTransaction(true);
        }
        setTransactionType('');
        setAccountName('');
        setAmount('');
        setDescription('');
        setDate('');
        Toast.success("edited transaction successfully", 500)


    }

    return (
        <div className="mainDivEdit">
            <h2> TRANSACTION</h2>
            <input type="radio" value="income" checked={transactionType === "income"}
                style={{ margin: "5px" }}
                onChange={event => setTransactionType(event.target.value)} />
            <label className="incomeLabel">Income</label>
            <input type="radio" value="expense" checked={transactionType === "expense"}
                style={{ margin: "5px" }}
                onChange={event => setTransactionType(event.target.value)} />
            <label className="label">Expense</label>
            <div style={{ margin: "10px" }}>
                <label className="label">Description</label>
                <br />
                <input type="text" onChange={event => setDescription(event.target.value)} value={description} className="InputField"></input>
            </div>

            {accountClicked ?
                <div className="inputDiv">
                    <label className="label">Account</label>
                    <br />
                    <select value={accountClicked} onChange={event => setAccountName(event.target.value)} className="InputField" disabled>
                        <option label={accountClicked} ></option>
                    </select>
                </div>
                :
                <div className="inputDiv">
                    <label className="label">Account</label>
                    <br />
                    <select value={accountName} onChange={event => setAccountName(event.target.value)} className="InputField">
                        <option label="Select an Account "></option>
                        {accounts.map(obj => {
                            return (<option label={obj.accountName}>{obj.accountName}</option>);
                        })}
                    </select>
                </div>
            }

            <div className="inputDiv">
                <label className="label">Amount</label>
                <br />
                <input type="text" onChange={event => setAmount(event.target.value)} value={amount} className="InputField"></input>
            </div>

            <div className="inputDiv">
                <label className="label">Date</label>
                <br />
                <DatePicker
                    dateFormat='dd-MM-yyyy'
                    selected={date}
                    onChange={date => setDate(date)}
                    value={date}
                    className="InputField"
                />
            </div>

            <button onClick={() => handleEditTransaction()} className="AddTranscButton" style={{ marginLeft: "50px", height: "50px", width: "200px" }}> Edit Transaction</button>
            {onEditTransaction ? <Redirect to="/accounts" /> : null}
        </div>
    )

}

export default EditTransaction;