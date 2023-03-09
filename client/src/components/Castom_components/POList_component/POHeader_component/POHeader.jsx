import React from 'react';
import Button from '../../../UI/button/Button';
import classes from './POHeader.module.css'
import {useSoft} from '../../../hook/useSoft';
const POHeader = ({titles, ...props}) => {

    const {setSoftList} = useSoft();
    return (
        <div className={classes.POHeader} {...props}>
            <strong className={classes.title_code}>ID ПО</strong>
            <strong className={classes.title}>Название ПО</strong>
            <strong className={classes.title}>Код ПО</strong>
            <strong className={classes.title}>Последнее обновление</strong>
            <strong className={classes.title_code_err}>Код ошибки</strong>
            <div className={classes.title_btn}>
                <Button onClick={() => {
                  setSoftList()
                }
                }>Refrash</Button>
          </div>
        </div>
    );
};

export default POHeader;