import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import UserContext from '../context/userContext';

const AuthContainer = (props) => {
    let token = localStorage.getItem('token');

    const [fetchStatus, updateFetchStatus] = useState('IDLE');
    const [ , updateFetchError] = useState(null);
    const [loginResult, updateLoginResult] = useState({ token });
    const [username, updateUserName] = useState('');
    const [password, updatePassword] = useState('');

    const changeUserNameHandler = (event) => updateUserName(event.target.value);

    const changePasswordHandler = (event) => updatePassword(event.target.value);

    const loginHandler = (event) => {
        event.preventDefault();

        updateFetchStatus('STARTED');

        fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { "Content-Type": "application/json" }
        })
            .then(response => response.json())
            .then((result) => {
                updateLoginResult(result);

                if (result.token) {
                    localStorage.setItem('token', result.token);
                    updateFetchStatus('SUCCEED');
                } else {
                    updateFetchError(result.error || 'No token returned');
                    updateFetchStatus('FAILED');
                }
            })
            .catch(err => {
                updateFetchError(err.message);
                updateFetchStatus('FAILED');
            })
    };

    let tokenPayload = {};

    if (loginResult.token) {
        const [, encodedPayload] = loginResult.token.split('.');
        tokenPayload = JSON.parse(atob(encodedPayload));
    }

    return (
        <UserContext.Provider value={tokenPayload}>
            <div className="auth-container">
                {!loginResult.token && (
                    <LoginForm
                        loginHandler={loginHandler}
                        changeUserNameHandler={changeUserNameHandler}
                        changePasswordHandler={changePasswordHandler}
                        username={username}
                        password={password}
                        disabled={fetchStatus === 'STARTED'}
                    />
                )}

                {loginResult.token && props.children}
            </div>
        </UserContext.Provider>
    );
};

export default AuthContainer;