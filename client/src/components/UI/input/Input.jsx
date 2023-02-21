import React from 'react';
import classes from './Input.module.css'

const Input = (props, ref) => {
    return (
        <input className={classes.Inp} {...props}/>
    );
};
//forvardRef для неуправляемого компонента
export default Input;