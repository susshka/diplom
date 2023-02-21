import React, {useState} from 'react';
import Button from '../../UI/button/Button';
import Input from '../../UI/input/Input';
import classes from './RegisterForm.module.css'
import {useAuth} from '../../hook/useAuth'

const RegisterForm = (props) => {

    const [registerData, setRegisterData] = useState({login:"", password:"", checkpwd:""});
    const [message, setMessage] = useState("Введите данные");
    const {register} = useAuth();

    const checkRegister = (msg, check) => {
        //проверка, какой коллбек дал register 
        if(msg ==="Пароли не совпадают" && check===false){
            setMessage(msg)
        }
        else if(msg ==="Такой пользователь существует" && check===false){
            setMessage(msg)
        }
        else if(msg ==="Таких пользователей нет" && check===true){
            setMessage(msg)
        }
        else{
            setMessage(msg)
        }
    }


    //Эта вызывается при отправке формы
    const hendlerSubmit = (event) =>{
        event.preventDefault();
        const form = event.target;
        console.log(registerData.login)
        register(registerData.login, registerData.password, registerData.checkpwd, checkRegister);
    }
    return (
        <form className={classes.RegisterForm} onSubmit={hendlerSubmit}>
            <strong style={{display:"flex", justifyContent:"center"}}>Регистрация</strong>
            <Input type="text" required={true} placeholder="Введите логин" value={registerData.login} onChange={e =>  setRegisterData({...registerData, login: e.target.value})}/>
            <Input type="password" required={true} placeholder="Введите пароль" value={registerData.password} onChange={e =>  setRegisterData({...registerData, password: e.target.value})}/>
            <Input type="password" required={true} placeholder="Повторите пароль" value={registerData.checkpwd} onChange={e =>  setRegisterData({...registerData, checkpwd: e.target.value})}/>
            <p style={{display:"flex", justifyContent:"center"}}>{message}</p>
            <div style={{display:"flex", justifyContent:"center"}}>
                <Button type="submit">Зарегестрироваться</Button>
            </div>
        </form>
    );
};

export default RegisterForm;