import React from 'react';
import classes from './POInfoFields.module.css'
const POInfoFields = ({addedPO}) => {
    return (
        <div className={classes.POInfoFields}>
            <div className='fields'>
                <strong className='infoTitle'>Название ПО: </strong>
                <p className='infoDiscr'>{addedPO.title}</p>
            </div>
            <div className='fields'>
                <strong className='infoTitle'>Дата последнего обновления:</strong>
                <p className='infoDiscr'>{addedPO.date}</p>
            </div>
            <div className='fields'>
                <strong className='infoTitle'>Состояние: </strong>
                <p className='infoDiscr'>{addedPO.status}</p>
            </div>
            <div className='fields'>
                <strong className='infoTitle'>Код ошибки: </strong>
                <p className='infoDiscr'>{addedPO.errorID}</p>
            </div>
            <div className='fields'>
                <strong className='infoTitle'>Описание: </strong>
                <p className='infoDiscr'>{addedPO.errorDIS}</p>
            </div>
        </div>
    );
};

export default POInfoFields;