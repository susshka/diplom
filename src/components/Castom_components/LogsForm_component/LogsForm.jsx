import React from 'react';
import LogsList from '../LogsList_component/LogsList';
import classes from './LogsForm.module.css'
const LogsForm = ({logs}) => {
    return (
        <div className={classes.LogsForm}>
            <h1 style={{textAlign:'left', fontSize:30}}>Список log-файлов</h1>
            <hr style={{margin:'15px 0'}}/>
            <LogsList logs={logs}/>
        </div>
    );
};

export default LogsForm;