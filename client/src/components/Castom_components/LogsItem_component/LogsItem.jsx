import React from 'react';
import classes from './LogsItem.module.css'
const LogsItem = (props) => {
    return (
        <div className={classes.LogsItem}>
            <strong style={{maxWidth:"30px", minWidth:"30px"}}>{props.number}</strong>
            <strong style={{maxWidth:"60px", minWidth:"60px"}}>{props.log.errID}</strong>
            <div className="log_description">
              <p style={{maxWidth:"60px", minWidth:"60px"}}>{props.log.date}</p>
            </div>
            <strong style={{maxWidth:"30px", minWidth:"30px"}}>{props.log.dir}</strong>  
        </div>
    );
};

export default LogsItem;