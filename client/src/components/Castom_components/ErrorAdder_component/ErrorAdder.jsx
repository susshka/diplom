import React from 'react';
import ErrorAdderFields from '../ErrorAdderFields_component/ErrorAdderFields';
import classes from './ErrorAdder.module.css'

const ErrorAdder = (props) => {
    return (
        <div className={classes.ErrorAdder}>
            <h1 style={{textAlign:'center', fontSize:30}}>Добавить ошибку для ПО</h1>
            <hr style={{margin:'15px 0'}}/>
            <ErrorAdderFields/>
        </div>
    );
};

export default ErrorAdder;