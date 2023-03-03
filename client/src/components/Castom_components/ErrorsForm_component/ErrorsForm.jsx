import React from 'react';
import ErrorsList from '../ErrorsList_component/ErrorsList';
import classes from './ErrorsForm.module.css'

const ErrorsForm = ({addedPO, indPO, setAddedPO}) => {
    return (
        <div className={classes.ErrorsForm}>
            <h1 style={{textAlign:'left', fontSize:30}}>Ошибки</h1>
            <hr style={{margin:'15px 0'}}/>
            <ErrorsList addedPO={addedPO} indPO={indPO} setAddedPO={setAddedPO}/>
        </div>
    );
};

export default ErrorsForm;