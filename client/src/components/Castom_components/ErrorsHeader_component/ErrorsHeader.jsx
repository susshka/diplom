import React from 'react';
import classes from './ErrorsHeader.module.css'

const ErrorsHeader = ({titles, ...props}) => {
    return (
        <div className={classes.ErrorsHeader}>
            <strong className={classes.title_code}>ID ошибки</strong>
            <strong className={classes.title_code}>Код ошибки</strong>
            <strong className={classes.title_code}>Код ПО</strong>
            <strong className={classes.title}>Описание</strong>
            <strong className={classes.title}>Статус</strong>
            <strong className={classes.title_coef}>Коэфф.</strong>
        </div>
    );
};

export default ErrorsHeader;