import React from 'react';
import RegisterForm from '../components/Castom_components/RegisterForm_component/RegisterForm';
import classes from './RegisterPage.module.css'

const RegisterPage = (props) => {
    return (
        <div className={classes.RegisterPage}>
            <RegisterForm/>
        </div>
    );
};

export default RegisterPage;