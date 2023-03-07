import React from 'react';
import LogsHeader from '../LogsHeader_component/LogsHeader';
import LogsItem from '../LogsItem_component/LogsItem';
import POHeader from '../POList_component/POHeader_component/POHeader';
import classes from './LogsList.module.css'
const LogsList = ({addedPO, indPO, setAddedPO}) => {
    const titlesHeader = [{title:"ID"},
                          {title:"Код ошибки"},
                          {title:"Статус"},
                          {title:"Время создания"},
                          {title:"Путь"}];

    if(addedPO===null){
        return(
        <h1 style={{textAlign:'center', fontSize:15}}>Выберете ПО для просмотра списка log-файлов</h1>
        );
    }
    else if(addedPO.message==='Логи найдены'){
        console.log(addedPO)
       
        return (
            <div className={classes.LogsList}>
                <LogsHeader/>
                {addedPO.res.map((logIter, index) =>
                    <LogsItem number={index+1} log={logIter} key={logIter.id_log}/>
                )}
            </div>
        );
    }
    else{
        return(
            <h1 style={{textAlign:'center', fontSize:15}}>{addedPO.message}</h1>
            );
    }
    /*return (
        <div className={classes.LogsList}>
            <POHeader style={{width:"100%", justifyContent:"space-around"}}titles={titlesHeader}/>
            {logs.map((logIter, index) =>
                <LogsItem number={index+1} log={logIter} key={logIter.id}/>
            )} 
        </div>
    );*/
};

export default LogsList;