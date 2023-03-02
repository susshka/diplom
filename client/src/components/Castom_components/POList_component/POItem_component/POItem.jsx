import React from 'react';
import Button from '../../../UI/button/Button';
import classes from './POItem.module.css';
import {useSoft} from '../../../hook/useSoft'
/*В этом компоненте по-сути на кнопке должен быть обработчик событий, делающий уже конкретный запрос к бд по post, и как в POAdderForm перекидывает 
полученную инфу в некий jsx отвечающий за отображение подробной инфы об ПО */
const POItem = (props) => {
  const {getSoftInfo} = useSoft();    
  var date = new Date(props.post.last_upd);
    return (
    <div className={classes.POItem}>
        <div className={classes.po_content}>

            <strong className={classes.title}>{props.post.id}</strong>
            <strong className={classes.title}>{props.post.soft_name}</strong>
            <strong className={classes.title}>{props.post.soft_code}</strong>
            <p className={classes.title}>{date.toLocaleString()}</p>
            <strong className={classes.title}>{props.post.err_code}</strong>
          <div className={classes.title}>
            <Button onClick={() => {
              /*props.setAddedPO(props.post)*/
              getSoftInfo(props.post.soft_code, props.setAddedPO)
              props.setIndex(props.number)
            }
            }>Инфо</Button>
          </div>
        </div>
    </div>
    );
};

export default POItem;