import React from 'react';
import POInfoFields from '../POInfoFields/POInfoFields';
import classes from './POInfo.module.css'
const POInfo = ({addedPO, indPO, setAddedPO}) => {
    return (
        <div className={classes.POInfo}>
            <h1 style={{textAlign:'left', fontSize:30}}>Состояние программного обеспечения</h1>
            <hr style={{margin:'15px 0'}}/>
            <POInfoFields addedPO={addedPO} indPO={indPO} setAddedPO={setAddedPO}/>
        </div>
    );
};

export default POInfo;