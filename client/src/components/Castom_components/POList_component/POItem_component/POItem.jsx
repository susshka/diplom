import React from 'react';
import Button from '../../../UI/button/Button';
import classes from './POItem.module.css';
import {useSoft} from '../../../hook/useSoft'
/*В этом компоненте по-сути на кнопке должен быть обработчик событий, делающий уже конкретный запрос к бд по post, и как в POAdderForm перекидывает 
полученную инфу в некий jsx отвечающий за отображение подробной инфы об ПО */
const POItem = (props) => {
  const {getSoftInfo} = useSoft(); 
  const {getSoftErrorsInfo} = useSoft();
  const {getTable} = useSoft();  
  var date = '-----';
  var ec = '-----';
  if(props.post.last_upd) date = new Date(props.post.last_upd).toLocaleString();
  if(props.post.err_code) ec = props.post.err_code

    return (
    <div className={classes.POItem}>
        <div className={classes.po_content}>

            <strong className={classes.title_code}>{props.post.id}</strong>
            <strong className={classes.title}>{props.post.soft_name}</strong>
            <strong className={classes.title}>{props.post.soft_code}</strong>
            <p className={classes.title}>{date}</p>
            <strong className={classes.title_code_err}>{ec}</strong>
          <div className={classes.title}>
            <Button onClick={() => {
              /*props.setAddedPO(props.post)*/
              if(props.location ==="/soft_info"){
                getSoftInfo(props.post.soft_code, props.setAddedPO)
                props.setIndex(props.number)
              }
              else if(props.location ==="/errors"){
                props.setIndex(props.number)
                getSoftErrorsInfo(props.post.soft_code, props.setAddedPO)
              }
              else if(props.location ==="/logs_list"){
                props.setIndex(props.number)
                getTable(props.post.soft_code, props.setAddedPO)
              }
            }
            }>Инфо</Button>
          </div>
        </div>
    </div>
    );
};

export default POItem;