import React from 'react';
import ErrorItem from '../ErrorItem_component/ErrorItem';
import ErrorsHeader from '../ErrorsHeader_component/ErrorsHeader';
import classes from './ErrorsList.module.css'


const ErrorsList = ({addedPO, indPO, setAddedPO}) => {
    const titlesHeader= [{id: "id", title:"ID"},
                         {id: "id", title:"Код ошибки"},
                         {title:"Код ПО"},
                         {title:"Описание"},
                         {title:"Поле поиска"},
                         {title:"Статус"},
                         {title:"Коэффициэнт"},
                        ];
   
    if(addedPO===null){
        console.log(addedPO)
        return(
        <strong style={{textAlign:'center', fontSize:16}}>Выберете ПО для просмотра списка ошибок</strong>
        );
    }
    /*console.log(addedPO)*/
    else if(addedPO.message==='No errors'){
        console.log(addedPO)
        
        return(
            <strong style={{textAlign:'center', fontSize:16}}>Ошибки для ПО с кодом ({addedPO.soft}) не найдены, или еще не были добавлены в базу данных</strong>
            );
        
    }
    else if(addedPO.message==='Errors found'){
        console.log(addedPO)
       
        return (
            <div className={classes.ErrorsList}>
                <ErrorsHeader titles={titlesHeader}/>
                {addedPO.data.map((errIter, index) =>
                    <ErrorItem number={index+1} err={errIter} key={errIter.id_er}/>
                )}
            </div>
        );
       
    }
    else{
        console.log(addedPO)
       
        return(
            <div  className={classes.ErrorsList}>
                <strong style={{textAlign:'center', fontSize:16}}>{addedPO.message}</strong>
                <strong style={{textAlign:'center', fontSize:16}}>{addedPO.data}</strong>
            </div>
            );
        
    }     
    
};

export default ErrorsList;