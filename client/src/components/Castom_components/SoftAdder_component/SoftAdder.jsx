import React from 'react';
import SoftAdderFields from '../SoftAdderFields_component/SoftAdderFields';
import classes from './SoftAdder.module.css'

const SoftAdder = (props) => {
    return (
        <div className={classes.SoftAdder}>
            <h1 style={{textAlign:'center', fontSize:30}}>Добавить новое ПО</h1>
            <hr style={{margin:'15px 0'}}/>
            <SoftAdderFields/>
        </div>
    );
};

export default SoftAdder;