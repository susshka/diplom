import React from 'react';
import LogsItem from '../LogsItem_component/LogsItem';
import POHeader from '../POList_component/POHeader_component/POHeader';
import classes from './LogsList.module.css'
const LogsList = ({logs}) => {
    const titlesHeader = [{title:"ID Log-файла"},
                          {title:"Код ошибки"},
                          {title:"Последнее обновление"},
                          {title:"Путь"}];

    if(!logs.length){
        return(
        <h1 style={{textAlign:'center', fontSize:15}}>Log-файлы не найдены, или не выбрано ПО. Нажмите кнопку "Инфо" напротив ПО, либо выберете другое</h1>
        )
    }
    return (
        <div className={classes.LogsList}>
            <POHeader style={{width:"100%", justifyContent:"space-around"}}titles={titlesHeader}/>
            {logs.map((logIter, index) =>
                <LogsItem number={index+1} log={logIter} key={logIter.id}/>
            )} 
        </div>
    );
};

export default LogsList;