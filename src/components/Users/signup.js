import React, { useEffect } from 'react';
import { createUser } from '../../services/users';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './signup.css'
import Toast from 'light-toast';
import {
    usernameChangeHandler,
    passwordChangeHandler,
    signup
} from '../../actionCreators/users/users';



function Signup() {

    const userName = useSelector(state => state.Users.userName);
    const password = useSelector(state => state.Users.password);
    const signUpToggle = useSelector(state => state.Users.signUpToggle);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(signup(false))
    }, [])

    const onUserNameChange = (event) => {
        dispatch(usernameChangeHandler(event.target.value))
    }
    const onPasswordChange = (event) => {
        dispatch(passwordChangeHandler(event.target.value))
    }
    const onSignup = async () => {
        let user = {
            userName: userName,
            password: password
        }
        let bool = await createUser(user)
        if (bool) {
            dispatch(signup(bool))
            Toast.success("signup successful", 500)
        }
        else {
            Toast.fail("User already exist!", 500)
        }
    }

    return (
        <div>
            <div className="mainDivSign">
                <h2>EXPENSE TRACKER</h2>
                <div className="InputDivision">
                    <input type="text" placeholder="USERNAME" className="Input" onChange={e => onUserNameChange(e)} />
                </div>
                <div className="InputDivision">
                    <input type="password" placeholder="PASSWORD" className="Input" onChange={e => onPasswordChange(e)} />
                </div>
                <div className="InputDivision">
                    <Link to="/login">Have an account ? Signin here</Link>
                </div>
                <div className="InputDivision">
                    <button className="Button" onClick={onSignup} style={{ cursor: "pointer" }}>SIGNUP</button>
                </div>
            </div>
            {signUpToggle ? <Redirect to='/login'></Redirect> : <Redirect to='/signup'></Redirect>}
        </div>
    );

}

export default Signup;