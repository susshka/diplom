import React, {useState, useMemo,useEffect } from 'react';
import LogsForm from '../LogsForm_component/LogsForm';
import NavigationForm from '../NavigationForm_component/NavigationForm';
/*import POAdderForm from '../POAdderForm_component/POAdderForm';*/
import {useSoft} from '../../hook/useSoft'
import {useLocation} from 'react-router-dom';
import classes from './WorkspaseLogs.module.css';

const WorkspaceLogs = ({posts, setPosts, usersData, saveUserData}) => {
 
const {setSoftList} = useSoft();
const {soft} = useSoft();
const location = useLocation().pathname;
useEffect(() => {
        setSoftList();
},[])
    
const [addedPOLog, setAddedPOLog]= useState(null)
const [indexAddedPO, setIndexAddedPO] = useState(null)
    
const addedSoftLogs = useMemo(() => {
        console.log("отработал хук useMemo для логов")
        return addedPOLog;
}, [addedPOLog])   

/*const POinfo = (PO) =>{
    setAddedPOs({id:PO.id, title:PO.title, date:PO.date, status:PO.status, errorDIS:PO.errorDIS, errorID: PO.errorID});
}*/

//из дочернего компонента POItem вытаскиваем нужный элемент массива и удаляем, меняя состояние массива
/*const delitePOs = (POs) => {
setPosts(posts.filter(p=>p.id!==POs.id))
}*/

/*const [modal, setModal] = useState(false);*/
/*переменная modal для отслеживания, включено модальное окно или нет, по умолчанию - нет */

/*Функция выбора сортировки, берет значение value из Select'a и используя обработчик состояния переменной selectedSort из Workspase'a, меняет его*/

const [filter, setFilter] = useState({sort:"", query:""})
/*В value Select'a передается переменная filter из Workspase'a, у которой есть обработчик событий */
 /*filter.sort - выбранный вид сортировки, по какому из полей массива posts, выбирается в navigationform в select'e*/

const sortedPOs = useMemo(() => {
    console.log("отработал хук useMemo")
    if(filter.sort==="soft_name"){
        return [...soft].sort((a,b) => a[filter.sort].localeCompare(b[filter.sort]));
    }
    else if(filter.sort==="last_upd"){
        return [...soft].sort((a,b) => {
            if (a[filter.sort]>b[filter.sort]) return -1
            else if(a[filter.sort]===b[filter.sort]) return 0
            else return 1
        });
    }
    else return soft;
},[filter.sort, soft]) /*sortedPOs - переменная с отсортированным списком, при создании переменной будет с значениями из posts без сортировки*/
/*useMemo, чтобы  navigationform обновлялась только при изменении выбранной сортировки и добавлении значений в список*/

const sortedAndSearchedPOs = useMemo(() => {
    return sortedPOs.filter(PO => PO.soft_name.toLowerCase().includes(filter.query.toLowerCase()))
},[filter.query, sortedPOs]) /*sortedAndSearchedPOs - переменная составляется и кешируется из отсортированного списка с фильтром, чтобы элементы этого списка содержали в названии то, */
/* что содерждит строка поиска из navigationform */


    return (
        <div className={classes.WorkspaceLogs}>
            <NavigationForm setAddedPO={setAddedPOLog} location={location} setIndex={setIndexAddedPO} filter={filter} setFilter={setFilter} posts={sortedAndSearchedPOs} title="Cписок программного обеспечения"/>
            <LogsForm addedPO={addedSoftLogs} indPO={indexAddedPO} setAddedPO={setAddedPOLog}/>
        </div>
    );
};

export default WorkspaceLogs;