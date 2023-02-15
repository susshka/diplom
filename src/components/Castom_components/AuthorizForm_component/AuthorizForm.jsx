import React, { useState } from 'react';
import Button from '../../UI/button/Button';
import Input from '../../UI/input/Input';
import classes from "./AuthorizForm.module.css"
const AuthorizForm = ({saveUD, setVizible, visible,setLogging, setUserTitle}) => {
    
    const [notice, setNotice] = useState("Введите логин и пароль")
  
    const [authorizData, setAuthorizData] = useState({login:"", password:""});
    
    if(notice==="Ошибка авторизации, попробуйте снова!"&&visible===false){
            setNotice("Введите логин и пароль")
            setUserTitle("Авторизуйтесь")
    }

    const saveUDate = (e) => {
        e.preventDefault() /*//отмена обновления страницы*/
        const enteredData = { //если нужно добавить отдельное значение, можно создать новую переменную и присвоить ее
            ...authorizData
        }
        const check=saveUD(enteredData);
        if(check){
            setVizible(false)
            setLogging("Выйти")
            setUserTitle(enteredData.login)
            setNotice("Введите логин и пароль")
            setAuthorizData({login:"", password:""})
        }
        else{
            setNotice("Ошибка авторизации, попробуйте снова!")
            setAuthorizData({login:"", password:""})
        }

    }


    return (
        <form className={classes.AuthorizForm}>
            <Input type="text" required={true} placeholder="Логин" value={authorizData.login} onChange={e =>  setAuthorizData({...authorizData, login: e.target.value})}/>
            <Input type="text" required={true} placeholder="Пароль" value={authorizData.password} onChange={e =>  setAuthorizData({...authorizData, password: e.target.value})}/>
            <p style={{textAlign:"center"}}>{notice}</p>
            <div style={{display:"flex", justifyContent:"center"}}>
                <Button onClick={saveUDate}>Войти</Button>
            </div>
            
        </form>
    );
};

export default AuthorizForm;