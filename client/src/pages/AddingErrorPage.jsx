import React from 'react';
import ErrorAdder from '../components/Castom_components/ErrorAdder_component/ErrorAdder';
import classes from './AddingErrorPage.module.css'


const AddingErrorPage = (props) => {
    return (
        <div className={classes.AddingErrorPage}>
            <ErrorAdder/>
        </div>
    );
};

export default AddingErrorPage;