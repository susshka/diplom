import React from 'react';
import Button from '../../../UI/button/Button';
import classes from './POItem.module.css';

/*В этом компоненте по-сути на кнопке должен быть обработчик событий, делающий уже конкретный запрос к бд по post, и как в POAdderForm перекидывает 
полученную инфу в некий jsx отвечающий за отображение подробной инфы об ПО */
const POItem = (props) => {
    
  
    return (
    <div className={classes.POItem}>
        <div className={classes.po_content}>
          <strong>{props.post.id}</strong>
          <strong>{props.post.soft_name}</strong>
          <strong>{props.post.soft_code}</strong>
          <div className="po_description">
              <p>{props.post.last_upd}</p>
          </div>
          <strong>{props.post.err_code}</strong>
          <div className="po_btn">
            <Button onClick={() => props.setAddedPO(props.post)}>Инфо</Button>
          </div>
        </div>
    </div>
    );
};

export default POItem;