import React from 'react';
import classes from './LogsHeader.module.css'

const LogsHeader = (props) => {
    return (
        <div className={classes.LogsHeader}>
            <strong className={classes.title_code}>ID</strong>
            <strong className={classes.title_code_err}>Код ошибки</strong>
            <strong className={classes.title_status}>Статус</strong>
            <strong className={classes.title_field}>Описание</strong>
            <strong className={classes.title_date}>Время создания</strong>
            <strong className={classes.title_path}>Путь</strong>
        </div>
    );
};

export default LogsHeader;