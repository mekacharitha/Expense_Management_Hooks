import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { addTransaction } from '../../services/transactions'
import { getAccounts } from '../../services/accounts'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import './addTransaction.css'
import Toast from 'light-toast'
import { useSelector, useDispatch } from 'react-redux';
import { handleAccounts } from '../../actionCreators/accounts/accounts'

function AddTransactions() {
    
    const [onAddTransaction, onAddTransactionChange] = useState(false);
    const [transactionType, setTransactionType] = useState('');
    const [accountName, setAccountName] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');

    const dispatch = useDispatch();
    const accounts = useSelector(state => state.Accounts.accounts)
    const accountClicked = useSelector(state => state.Accounts.accountClicked)

    
    const getAcc = async () => {
        let acc = await getAccounts();
        dispatch(handleAccounts(acc))
    }

    useEffect(() => {
        getAcc();
        setTransactionType('');
        setAccountName('');
        setAmount('');
        setDescription('');
        setDate('');
        onAddTransactionChange(false)

    }, [])

    const handleAddTransaction = async () => {
        let transaction = {
            transactionType: transactionType,
            description: description,
            amount: amount,
            date: date,
            accountName: accountName
        }
        if (!accountName)
            transaction = {
                ...transaction,
                accountName: accountClicked
            }
        let onAddTransaction = await addTransaction(transaction)
        if (onAddTransaction) {
            onAddTransactionChange(true);
           
        }
        else
            onAddTransactionChange(false);
            setTransactionType('');
            setAccountName('');
            setAmount('');
            setDescription('');
            setDate('');
       
        Toast.success("added transaction successfully", 500)
    }

    return (
        <div className="mainDivAddTran">
            <h2> TRANSACTION</h2>
            <input type="radio" value="income"
                checked={transactionType === "income"}
                style={{ margin: "5px" }}
                onChange={(event) => setTransactionType(event.target.value)} />
            <label className="incomeLabel">Income</label>
            <input type="radio" value="expense"
                checked={transactionType === "expense"}
                style={{ margin: "5px" }}
                onChange={(event) => setTransactionType(event.target.value)} />
            <label className="label">Expense</label>
            <div className="inputDiv">
                <label className="label">Description</label>
                <br />
                <input type="text" onChange={(event) => setDescription(event.target.value)} value={description} className="InputField"></input>
            </div>
            {accountClicked ?
                <div className="inputDiv">
                    <label className="label">Account</label>
                    <br />
                    <select value={accountClicked} onChange={(event) => setAccountName(event.target.value)} className="InputField" disabled>
                        <option label={accountClicked} ></option>
                    </select>
                </div>
                :
                <div className="inputDiv">
                    <label className="label">Account</label>
                    <br />
                    <select value={accountName} onChange={(event) => setAccountName(event.target.value)} className="InputField">
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
                <input type="text" onChange={(event) => setAmount(event.target.value)} value={amount} className="InputField"></input>
            </div>
            <div className="inputDiv">
                <label className="label">Date</label>
                <br />
                <DatePicker
                    dateFormat='dd-MM-yyyy'
                    selected={date}
                    onChange={(date) => setDate(date)}
                    value={date}
                    className="InputField"
                />
            </div>
            <button onClick={handleAddTransaction} className="AddTranscButton" style={{ marginLeft: "50px", height: "50px", width: "200px" }}> Add Transaction</button>
            {onAddTransaction ? <Redirect to='/accounts'></Redirect> : null}
        </div>
    )

}
export default AddTransactions