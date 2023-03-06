import React,{useState, useMemo, useEffect} from 'react';
import classes from './WorkspaseErrors.module.css'
import NavigationForm from '../NavigationForm_component/NavigationForm';
import {useSoft} from '../../hook/useSoft'
import {useLocation} from 'react-router-dom';
import ErrorsForm from '../ErrorsForm_component/ErrorsForm';

const WorkspaseErrors = () => {

const {setSoftList} = useSoft();
const {soft} = useSoft();
const location = useLocation().pathname;
useEffect(() => {
    setSoftList();
},[])

const [addedPOErr, setAddedPOErr]= useState(null)
const [indexAddedPO, setIndexAddedPO] = useState(null)

const addedSoftErrors = useMemo(() => {
    console.log("отработал хук useMemo для ошибок")
    return addedPOErr;
}, [addedPOErr])

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
},[filter.query, sortedPOs])

    return (
        <div className={classes.WorkspaceErrors}>
            <NavigationForm setAddedPO={setAddedPOErr} location={location} setIndex={setIndexAddedPO} filter={filter} setFilter={setFilter} posts={sortedAndSearchedPOs} title="Cписок программного обеспечения"/>
            <ErrorsForm addedPO={addedSoftErrors} indPO={indexAddedPO} setAddedPO={setAddedPOErr}/>
        </div>
    );
};

export default WorkspaseErrors;