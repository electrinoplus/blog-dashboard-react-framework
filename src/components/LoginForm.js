import React from 'react';

const LoginForm = (props) => {
    const {
        loginHandler,
        changeUserNameHandler,
        changePasswordHandler,
        username,
        password,
        disabled,
    } = props;

    return (
        <form onSubmit={loginHandler}>
            <input
                type="text"
                placeholder="username"
                disabled={disabled}
                value={username}
                onChange={changeUserNameHandler}
            />
            <br/>
            <input
                type="password"
                placeholder="password"
                disabled={disabled}
                value={password}
                onChange={changePasswordHandler}
            />
            <br/>
            <input type="submit" value="Login" disabled={disabled}/>
        </form>
    );
};

export default LoginForm;
