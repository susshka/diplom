import React from 'react';
import LogsList from '../LogsList_component/LogsList';
import classes from './LogsForm.module.css'
const LogsForm = ({addedPO, indPO, setAddedPO}) => {
    return (
        <div className={classes.LogsForm}>
            <div className={classes.title}>
                <h1 style={{textAlign:'left', fontSize:30}}>Список log-файлов</h1>
            </div>
            <hr style={{margin:'15px 0'}}/>
            <LogsList addedPO={addedPO} indPO={indPO} setAddedPO={setAddedPO}/>
        </div>
    );
};

export default LogsForm;