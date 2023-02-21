import React from 'react';
import AuthForm from '../components/Castom_components/AuthorizForm_component/AuthForm';
import classes from './LoginPage.module.css'
const LoginPage = (props) => {
    return (
        
        <div className={classes.LoginPage}>
            <AuthForm/>
        </div>
    );
};

export default LoginPage;