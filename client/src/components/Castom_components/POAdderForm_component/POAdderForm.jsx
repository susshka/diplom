import React, {useState } from 'react';
import Button from '../../UI/button/Button';
import Input from '../../UI/input/Input';
import classes from './POAdderForm.module.css';

const POAdderForm = ({create}) => {
    const [addedPO, setAddedPO] = useState({title:"", body:""});

    const addNewPO = (e) => {
        e.preventDefault() /*//отмена обновления страницы*/
        const newPO = { //если нужно добавить отдельное значение, можно создать новую переменную и присвоить ее
          ...addedPO, id:Date.now()
        }
        create(newPO)
        setAddedPO({title:"", body:""})
        /*setPOName("") //если по-отдельности
        //setPODiscr("")*/
        /*console.log(PODiscr) //для управляемого компонента*/
        /*console.log(inpRef.current.value) //для не управляемого компонента*/
    }
    return (
    <form className={classes.POAdderForm}>
        <Input type="text" placeholder="Название PO" value={addedPO.title} onChange={e => setAddedPO({...addedPO, title: e.target.value})}/> {/*Управляемый компонент onChange={e => setAddedPO(e.target.value)}*/}
        <Input type="text" placeholder="Описание PO" value={addedPO.body} onChange={e => setAddedPO({...addedPO, body: e.target.value})}/> {/*Не управляемый компонент, добавляется props ref={inpRef} и не пишется value и onChange*/}
        <Button onClick={addNewPO}>Add</Button>
    </form>
    );
};

export default POAdderForm;