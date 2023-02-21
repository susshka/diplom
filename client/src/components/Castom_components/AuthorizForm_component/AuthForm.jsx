import React, {useState} from 'react';
import classes from './AuthorizForm.module.css'
import {NavLink, useLocation, useNavigate} from 'react-router-dom'
import {useAuth} from '../../hook/useAuth'
import Input from '../../UI/input/Input';
import Button from '../../UI/button/Button';
const AuthForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {signin} = useAuth();
    const [authorizData, setAuthorizData] = useState({login:"", password:""});

    const fromPage = location.state?.from?.pathname || '/auth';

    const hendlerSubmit = (event) =>{
        event.preventDefault();
        const form = event.target;
        console.log(authorizData.login)
        signin(authorizData.login, authorizData.password, () => navigate(fromPage, {replace:true}));
    }
    return (
        <form className={classes.AuthorizForm} onSubmit={hendlerSubmit}>
            <strong style={{display:"flex", justifyContent:"center"}}>Вход</strong>
            <Input type="text" required={true} placeholder="Логин" value={authorizData.login} onChange={e =>  setAuthorizData({...authorizData, login: e.target.value})}/>
            <Input type="password" required={true} placeholder="Пароль" value={authorizData.password} onChange={e =>  setAuthorizData({...authorizData, password: e.target.value})}/>
            <div style={{display:"flex", justifyContent:"center"}}>
                <Button type="submit">Войти</Button>
            </div>
            <NavLink to="/register"className={classes.link}>Зарегестрироваться</NavLink>
        </form>
    );
};

export default AuthForm;