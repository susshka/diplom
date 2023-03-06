import React from 'react';
import LinkButton from '../../UI/linkbutton/LinkButton';
import POInfoFields from '../POInfoFields/POInfoFields';
import classes from './POInfo.module.css'
const POInfo = ({addedPO, indPO, setAddedPO}) => {
    return (
        <div className={classes.POInfo}>
            <div className={classes.title}>
                <h1 style={{textAlign:'left', fontSize:30}}>Состояние ПО</h1>
                <LinkButton to="/add_soft">Добавить</LinkButton>
            </div>
            <hr style={{margin:'15px 0'}}/>
            <POInfoFields addedPO={addedPO} indPO={indPO} setAddedPO={setAddedPO}/>
        </div>
    );
};

export default POInfo;