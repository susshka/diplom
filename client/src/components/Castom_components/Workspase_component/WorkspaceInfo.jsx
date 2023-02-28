import React, {useState, useMemo } from 'react';
import NavigationForm from '../NavigationForm_component/NavigationForm';
import POInfo from '../POInfo_component/POInfo';
import {useSoft} from '../../hook/useSoft'
/*import POAdderForm from '../POAdderForm_component/POAdderForm';*/

import classes from './WorkspaseInfo.module.css';

const WorkspaceInfo = ({posts}) => {
 
const {setSoftList} = useSoft();
const {soft} = useSoft();


const [addedPOs, setAddedPOs]= useState({id:null, title:"", date:null, status:"", errorID:"",errorDIS:""})
/*const [addedPOs, setAddedPOs]= useState({id:null, soft_code:"", date:null, status:"", errorID:"",errorDIS:""})*/
const POinfo = (PO) =>{
    setAddedPOs({id:PO.id, title:PO.title, date:PO.date, status:PO.status, errorDIS:PO.errorDIS, errorID: PO.errorID});
}


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
        <div className={classes.WorkspaceInfo}>
            <NavigationForm setAddedPO={POinfo} filter={filter} setFilter={setFilter} posts={sortedAndSearchedPOs} title="Cписок программного обеспечения"/>
            <POInfo addedPO={addedPOs}/>
        </div>
    );
};

export default WorkspaceInfo;