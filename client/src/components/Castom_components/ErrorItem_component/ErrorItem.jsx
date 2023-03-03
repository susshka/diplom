import React from 'react';
import classes from './ErrorItem.module.css'

const ErrorItem = (props) => {
    return (
        <div className={classes.ErrorItem}>
            <strong className={classes.title_code}>{props.err.id_er}</strong>
            <strong className={classes.title_code}>{props.err.err_code}</strong>
            <strong className={classes.title_code}>{props.err.sf_code}</strong>
            <div className={classes.title}>
              <p>{props.err.err_descr}</p>
            </div>
            <strong className={classes.title}>{props.err.err_status}</strong>
            <div className={classes.title_coef}>
              <p>{props.err.coef_status}</p>
            </div>  
        </div>
    );
};

export default ErrorItem;