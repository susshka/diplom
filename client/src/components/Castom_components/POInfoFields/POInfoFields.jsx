import React from 'react';
import classes from './POInfoFields.module.css'
import {useSoft} from '../../hook/useSoft'
import Button from '../../UI/button/Button';
const POInfoFields = ({addedPO, indPO, setAddedPO}) => {

    const {soft} = useSoft();
    const {setDefaultTime} = useSoft();
    const {getSoftInfo} = useSoft();

    var last_upd='-----';
    var last_log_id ='-----';
    var err_code ='-----';
    if(addedPO===null || indPO===null){
        return (
            <div className={classes.POInfoFields}>
                <strong className='infoNone'>Для просмотра информации выберете программное обеспечение</strong>
            </div>
        )
    } 
    else{
       /* console.log(addedPO)*/
        if(soft[indPO].last_upd) last_upd=soft[indPO].last_upd;
        if(soft[indPO].last_log_id) last_log_id =soft[indPO].last_log_id;
        if(soft[indPO].err_code) err_code =soft[indPO].err_code;

        return (
            <div className={classes.POInfoFields}>
                <div className='fields'>
                    <strong className='infoTitle'>Код ПО: </strong>
                    <p className='infoDiscr'>{addedPO.soft_code}</p>
                </div>
                <div className='fields'>
                    <strong className='infoTitle'>Название ПО: </strong>
                    <p className='infoDiscr'>{addedPO.soft_name}</p>
                </div>
                <div className='fields'>
                    <strong className='infoTitle'>Дата последнего обновления:</strong>
                    <p className='infoDiscr'>{last_upd}</p>
                </div>
                <div className='fields'>
                    <strong className='infoTitle'>ID последнего лога:</strong>
                    <p className='infoDiscr'>{last_log_id}</p>
                </div>
                <div className='fields'>
                    <strong className='infoTitle'>Код ошибки: </strong>
                    <p className='infoDiscr'>{err_code}</p>
                </div>
                <div className='fields'>
                    <strong className='infoTitle'>Тип хранения логов: </strong>
                    <p className='infoDiscr'>{addedPO.save_type_logs}</p>
                </div>
                <div className='fields'>
                    <strong className='infoTitle'>Время отслеживания по-умолчанию: </strong>
                    <p className='infoDiscr'>{addedPO.default_time_watching}</p>
                </div>
                <div className='fields'>
                    <strong className='infoTitle'>Текущее время отслеживания: </strong>
                    <p className='infoDiscr'>{addedPO.active_time_watching}</p>
                    <Button style={{marginLeft:'0'}} onClick={() => {
                        setDefaultTime(addedPO.soft_code)
                        getSoftInfo(addedPO.soft_code, setAddedPO)
                    }}>Привести к дефолтному</Button>
                </div>
            </div>
        );
    }
};

export default POInfoFields;