import React from 'react';
import ErrorItem from '../ErrorItem_component/ErrorItem';
import ErrorsHeader from '../ErrorsHeader_component/ErrorsHeader';
import classes from './ErrorsList.module.css'
import { isEmpty } from "lodash";

const ErrorsList = ({addedPO, indPO, setAddedPO}) => {
    const titlesHeader= [{id: "id", title:"ID"},
                         {id: "id", title:"Код ошибки"},
                         {title:"Код ПО"},
                         {title:"Описание"},
                         {title:"Статус"},
                         {title:"Коэффициэнт"},
                        ];
     
    if(addedPO===null && indPO===null){
        return(
        <strong style={{textAlign:'center', fontSize:16}}>Выберете ПО для просмотра списка ошибок</strong>
        );
    }
        console.log(addedPO)               
        return (
            <div className={classes.ErrorsList}>
                <ErrorsHeader titles={titlesHeader}/>
                {addedPO.map((errIter, index) =>
                    <ErrorItem number={index+1} err={errIter} key={errIter.id_er}/>
                )}
            </div>
        );
    
};

export default ErrorsList;