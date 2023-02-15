import React, {useState, useMemo } from 'react';
import NavigationForm from '../NavigationForm_component/NavigationForm';
import POInfo from '../POInfo_component/POInfo';
/*import POAdderForm from '../POAdderForm_component/POAdderForm';*/

import classes from './WorkspaseInfo.module.css';

const WorkspaceInfo = ({posts, setPosts, usersData, saveUserData}) => {
    /*var Dates = new Array(4);
    var date = new Date(2018, 1, 15, 11, 33, 30, 0);
    for(var p = 0; p < 4; p++) {
        date.setDate(date.getDate() + 1);
        Dates[p] = new Date(date);   
        //document.write("<br>"+d);// тут работает
    }

    const usersData = [{login:"Aboba", password:"1234"},
                        {login:"Lola", password:"12345"},
                        {login:"Pop", password:"1111fg"}]
    */
    /*здесь в posts по-сути должны лежать значения из запроса к базе, который происходит перед созданием самого массива posts и отображает всё ПО*/
    /* const [posts, setPosts]=useState([{id: Date.now()+1, title:'ARM NSI', date: Dates[0].toLocaleString(), status:"Ok", errorID:"23R345",errorDIS:"щукапмущшкомщушкомшщуком"},
                                    {id: Date.now()+2, title:'SiteLine', date: Dates[1].toLocaleString(), status:"Ok",errorID:"23R33345",errorDIS:"цйумуцйщшмщшцйрмцрйм"},
                                    {id: Date.now()+3, title:'Kontur', date: Dates[2].toLocaleString(), status:"Ok",errorID:"23R3rqd45",errorDIS:"цуйщшрмцйррррзршмцймсцвсй"},
                                    {id: Date.now()+4, title:'Polearm', date: Dates[3].toLocaleString(), status:"Ok",errorID:"23Rr32345",errorDIS:"цйумщшгмцййршщвтсцймщшгм"},
                                    ]); */

/*const [POName, setPOName]=useState(); //для управляемого компонента
const [PODiscr, setPODiscr]=useState(); //можно создавать состояния для каждой переменной*/
/*const inpRef = useRef(); //для не управляемого компонента*/

/*const userData= {login:"", password:""};
const saveUserData = (data) => {
    if (usersData.find(ud => ud.login===data.login && ud.password===data.password)){  
        userData.login=data.login;
        userData.password=data.password;
        return true;
    }
    else{
        userData.login="";
        userData.password="";
        return false;
    }
}*/

/*const createPOs = (newPO) => {
setPosts([...posts, newPO])
}*/

const [addedPOs, setAddedPOs]= useState({id:null, title:"", date:null, status:"", errorID:"",errorDIS:""})

const POinfo = (PO) =>{
    setAddedPOs({id:PO.id, title:PO.title, date:PO.date, status:PO.status, errorDIS:PO.errorDIS, errorID: PO.errorID});
}

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
    if(filter.sort==="title"){
        return [...posts].sort((a,b) => a[filter.sort].localeCompare(b[filter.sort]));
    }
    else if(filter.sort==="date"){
        return [...posts].sort((a,b) => {
            if (a[filter.sort]>b[filter.sort]) return -1
            else if(a[filter.sort]===b[filter.sort]) return 0
            else return 1
        });
    }
    else return posts;
},[filter.sort, posts]) /*sortedPOs - переменная с отсортированным списком, при создании переменной будет с значениями из posts без сортировки*/
/*useMemo, чтобы  navigationform обновлялась только при изменении выбранной сортировки и добавлении значений в список*/

const sortedAndSearchedPOs = useMemo(() => {
    return sortedPOs.filter(PO => PO.title.toLowerCase().includes(filter.query.toLowerCase()))
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