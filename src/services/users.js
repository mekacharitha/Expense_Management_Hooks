
import axios from 'axios';
import { localStorageSetItem} from './utils';

export const createUser = async (user) => {
    console.log(user)
    let response = await axios.post('http://localhost:8000/signup',{
        userName:user.userName,
        password:user.password
    })
   
    if(response.data.success){
        return true
    }
    return false;
  
}


export const verifyUser = async (user) => {

    let response = await axios.post('http://localhost:8000/signin',{
        userName:user.userName,
        password:user.password
    })
    if(response.data.success){
        localStorageSetItem("token" , response.data.token)
        return response.data.token
    }
    return false

}