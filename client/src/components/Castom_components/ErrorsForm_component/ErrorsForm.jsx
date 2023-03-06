import React from 'react';
import Button from '../../UI/button/Button';
import LinkButton from '../../UI/linkbutton/LinkButton';
import ErrorsList from '../ErrorsList_component/ErrorsList';
import classes from './ErrorsForm.module.css'

const ErrorsForm = ({addedPO, indPO, setAddedPO}) => {
    return (
        <div className={classes.ErrorsForm}>
            <div className={classes.title}>
                <h1 style={{textAlign:'left', fontSize:30}}>Список кодов ошибок</h1>
                <LinkButton to="/add_error">Добавить</LinkButton>
            </div>
            <hr style={{margin:'15px 0'}}/>
            <ErrorsList addedPO={addedPO} indPO={indPO} setAddedPO={setAddedPO}/>
        </div>
    );
};

export default ErrorsForm;