import axios from 'axios';

export const addTransaction = async (transaction) => {

    let response = await axios.post('http://localhost:8000/addTransaction', {
        type: transaction.transactionType,
        description: transaction.description,
        amount: transaction.amount,
        accountName: transaction.accountName,
        date: transaction.date,
        token: JSON.parse(localStorage.getItem("token"))
    })
    if (response.data.success) {
        return true;
    }
    return false;

}



export const getTransactions = async () => {
    
    let response = await axios.get('http://localhost:8000/transactions/' ,{headers:{
        "token" :JSON.parse(localStorage.getItem('token'))
    }});
    if (response.data.success) {
        return response.data.transaction
    }
    return false;
}



export const getTransactionByAccountName = async (accountName) => {

    accountName=window.location.pathname.substr(38);
    let response = await axios.get(`http://localhost:8000/transactionByName/${accountName}` ,{headers:{
        "token" :JSON.parse(localStorage.getItem('token'))
    }})
    if(response.data.success){
        return response.data.transactions
    }
    return false;

}


export const getTransactionByTransactionId = async (transactionId) => {
    
    let response = await axios.get('http://localhost:8000/transactionById/'+transactionId);
    if(response.data.success){
        return response.data.transaction;
    }
    return false;
}


export const deleteTransaction = async (transactionId) => {
    
    await axios.delete("http://localhost:8000/deleteTransaction/" + transactionId);

}
export const editTransaction = async (transaction, transId) => {

    // let payload = jwt.decode(JSON.parse(localStorage.getItem("token")));
    await axios.put('http://localhost:8000/editTransaction', {
        id: transId,
        type: transaction.type,
        description: transaction.description,
        amount: transaction.amount,
        accountName:transaction.accountName,
        date: transaction.date,
        token:JSON.parse(localStorage.getItem("token")),
        accountId: transaction.accountId
    })
}

