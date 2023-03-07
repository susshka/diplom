import React from 'react';
import classes from './LogsItem.module.css'
const LogsItem = (props) => {
    return (
        <div className={classes.LogsItem}>
            <strong className={classes.title_code}>{props.log.id_log}</strong>
            <strong className={classes.title_code_err}>{props.log.err_code}</strong>
            <div className="log_description">
              <p className={classes.title_field}>{props.log.err_status}</p>
            </div>
            <strong className={classes.title}>{props.log.create_time}</strong>
            <strong className={classes.title}>{props.log.path_log}</strong>    
        </div>
    );
};

export default LogsItem;