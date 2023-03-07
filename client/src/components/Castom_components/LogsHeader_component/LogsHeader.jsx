import React from 'react';
import classes from './LogsHeader.module.css'

const LogsHeader = (props) => {
    return (
        <div className={classes.LogsHeader}>
            <strong className={classes.title_code}>ID</strong>
            <strong className={classes.title_code_err}>Код ошибки</strong>
            <strong className={classes.title_field}>Статус</strong>
            <strong className={classes.title}>Описание</strong>
            <strong className={classes.title}>Время создания</strong>
            <strong className={classes.title}>Путь</strong>
        </div>
    );
};

export default LogsHeader;