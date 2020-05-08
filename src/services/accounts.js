import jwt from 'jsonwebtoken'
import axios from 'axios';

export const addAccount = async (accountName, accBalance) => {
    let response = await axios.post('http://localhost:8000/addAccount', {
        token: JSON.parse(localStorage.getItem("token")),     
        accountName: accountName,
        accountBalance: accBalance,
    })
    if (response.data.success) {
        return true
    }
    return false;

}

export const getAccounts = async () => {
    let response = await axios.get("http://localhost:8000/accountsByUserId" , {headers:{
        "token" :JSON.parse(localStorage.getItem('token'))
    }})
    if (response.data.success) {
        return response.data.accountsData
    }
    return false;
}

export const getAccountBalance = async (accountName) => {

    try {
        accountName = window.location.pathname.substr(38)
        let response = await axios.get('http://localhost:8000/accountBalanceByAccountName/' + accountName + '/' , {headers:{
            "token" :JSON.parse(localStorage.getItem('token'))
        }})
        return response.data.balance
    }
    catch (err) {
        return false
    }

}

export const getAccountNameById = async (accId) => {

    try {
        let response = await axios.get('http://localhost:8000/accountNameByAccountId/'  + accId , {headers:{
            "token" :JSON.parse(localStorage.getItem('token'))
        }})
        return response.data.accountName
    }
    catch (err) {
        return false
    }
}
