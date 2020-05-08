import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import './signin.css';
import Toast from 'light-toast';
import { useSelector, useDispatch } from 'react-redux';
import {
    usernameChangeHandler,
    passwordChangeHandler,
    signin
} from '../../actionCreators/users/users';
import {localStorageSetItem} from '../../services/utils';
import {verifyUser} from '../../services/users';

function Signin() {

    const dispatch = useDispatch();

    const userName = useSelector(state => state.Users.userName);
    const password = useSelector(state => state.Users.password);
    const token = useSelector(state => state.Users.token)

    const onUserNameChange = (event) => {
        dispatch(usernameChangeHandler(event.target.value))
    }
    const onPasswordChange = (event) => {
        dispatch(passwordChangeHandler(event.target.value))
    }

    const onSignin = async () => {
        let user ={
            userName,
            password
        }
        let token = await verifyUser(user)
        if (!token)
            Toast.fail("signin failed", 500)
        localStorageSetItem("token", token);

        dispatch(signin(token))

    }


    return (
        <div>
            <div className="mainDivSign">
                <h2>EXPENSE TRACKER</h2>
                <div className="InputDivision">
                    <input type="text" placeholder="USERNAME" className="Input" onChange={onUserNameChange} />
                </div>
                <div className="InputDivision">
                    <input type="password" placeholder="PASSWORD" className="Input" onChange={onPasswordChange} />
                </div>
                <div className="InputDivision">
                    <Link to="/signup">Does not have an account ? Register here</Link>
                </div>
                <div className="InputDivision">
                    <button className="Button" onClick={onSignin} style={{ cursor: "pointer" }}>SIGNIN</button>
                </div>
                {token ? <Redirect to='/accounts' /> : null}
            </div>

        </div>
    );

}

export default Signin