import React from 'react';
import SoftAdder from '../components/Castom_components/SoftAdder_component/SoftAdder';
import classes from './AddingSoftPage.module.css'
const AddingSoftPage = (props) => {
    return (
        <div className={classes.AddingSoftPage}>
            <SoftAdder/>
        </div>
    );
};

export default AddingSoftPage;