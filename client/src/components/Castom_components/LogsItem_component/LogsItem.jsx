import React from 'react';
import classes from './LogsItem.module.css'
const LogsItem = (props) => {
    var err_code = '-----';
    var err_desc = '-----';
    var err_status = '------';
    if(props.log.err_code) err_code = props.log.err_code;
    if(props.log.err_desc) err_desc = props.log.err_desc;
    if(props.log.err_status) err_status = props.log.err_status;
    return (
        <div className={classes.LogsItem}>
            <strong className={classes.title_code}>{props.log.id_log}</strong>
            <strong className={classes.title_code_err}>{err_code}</strong>
            <div className={classes.title_field}>
              <p className={classes.title_status}>{err_status}</p>
            </div>
            <div className={classes.title_d}>
                <strong className={classes.title_dscr}>{err_desc}</strong>    
            </div>
            <strong className={classes.title_date}>{props.log.create_date} {props.log.create_time}</strong>
            <div className={classes.title_path}>
                <strong className={classes.title_path_log}>{props.log.path_log}</strong>    
            </div>
        </div>
    );
};

export default LogsItem;