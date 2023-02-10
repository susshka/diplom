import React, {useState, useMemo } from 'react';
import Button from '../../UI/button/Button';
import Modal from '../../UI/modal/Modal';
import NavigationForm from '../NavigationForm_component/NavigationForm';
import POAdderForm from '../POAdderForm_component/POAdderForm';

import classes from './Workspase.module.css';

const Workspace = (props) => {
    var Dates = new Array(4);
    var date = new Date(2018, 1, 15, 11, 33, 30, 0);
    for(var p = 0; p < 4; p++) {
        date.setDate(date.getDate() + 1);
        Dates[p] = new Date(date);   
        //document.write("<br>"+d);// тут работает
    }

    /*здесь в posts по-сути должны лежать значения из запроса к базе, который происходит перед созданием самого массива posts и отображает всё ПО*/
  const [posts, setPosts]=useState([{id: Date.now()+1, title:'ARM NSI', body: Dates[0].toLocaleString(), status:"Ok"},
                                    {id: Date.now()+2, title:'SiteLine', body: Dates[1].toLocaleString(), status:"Ok"},
                                    {id: Date.now()+3, title:'Kontur', body: Dates[2].toLocaleString(), status:"Ok"},
                                    {id: Date.now()+4, title:'Polearm', body: Dates[3].toLocaleString(), status:"Ok"},
                                    ]); 

/*const [POName, setPOName]=useState(); //для управляемого компонента
const [PODiscr, setPODiscr]=useState(); //можно создавать состояния для каждой переменной*/
/*const inpRef = useRef(); //для не управляемого компонента*/


const createPOs = (newPO) => {
setPosts([...posts, newPO])
}

//из дочернего компонента POItem вытаскиваем нужный элемент массива и удаляем, меняя состояние массива
const delitePOs = (POs) => {
setPosts(posts.filter(p=>p.id!==POs.id))
}

const [modal, setModal] = useState(false);
/*переменная modal для отслеживания, включено модальное окно или нет, по умолчанию - нет */

/*Функция выбора сортировки, берет значение value из Select'a и используя обработчик состояния переменной selectedSort из Workspase'a, меняет его*/

const [filter, setFilter] = useState({sort:"", query:""})
/*В value Select'a передается переменная filter из Workspase'a, у которой есть обработчик событий */
 /*filter.sort - выбранный вид сортировки, по какому из полей массива posts, выбирается в navigationform в select'e*/

const sortedPOs = useMemo(() => {
    console.log("отработал хук useMemo")
    if(filter.sort){
        return [...posts].sort((a,b) => a[filter.sort].localeCompare(b[filter.sort]));
    }
    else return posts;
},[filter.sort, posts]) /*sortedPOs - переменная с отсортированным списком, при создании переменной будет с значениями из posts без сортировки*/
/*useMemo, чтобы  navigationform обновлялась только при изменении выбранной сортировки и добавлении значений в список*/

const sortedAndSearchedPOs = useMemo(() => {
    return sortedPOs.filter(PO => PO.title.toLowerCase().includes(filter.query.toLowerCase()))
},[filter.query, sortedPOs]) /*sortedAndSearchedPOs - переменная составляется и кешируется из отсортированного списка с фильтром, чтобы элементы этого списка содержали в названии то, */
/* что содерждит строка поиска из navigationform */

    return (
        <div className={classes.Workspace}>
            
            <Modal visible={modal} setVisible={setModal}>
                <POAdderForm create={createPOs}/> 
            </Modal>
            <NavigationForm filter={filter} setFilter={setFilter} delite={delitePOs} setModal={setModal}posts={sortedAndSearchedPOs} title="Cписок программного обеспечения"/>
        </div>
    );
};

export default Workspace;