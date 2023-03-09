import {NavLink, Outlet,useNavigate} from 'react-router-dom';
import {useAuth} from '../../hook/useAuth'
import React from 'react';
import Header from '../header/Header';
import Button from '../button/Button';
import Navbar from '../navbar/Navbar';
import classes from './Layout.module.css'
import { useEffect } from 'react';

const Layout = ({logging, userTitle, setLogging, setUserTitle}) => {
    
    const navigate = useNavigate();
    const {signout, user} = useAuth();
    
    useEffect(() => {
        if(user){
            setLogging('Выйти')
            setUserTitle(user.user)
        }
    },[user]);
    

    const hendlerOnclick = (event) =>{
        event.preventDefault();
        if(user){
            signout(() => navigate('/auth', {replace:true}));
        }
        else{
            navigate('/auth', {replace:true})
        }
    }
    return (
        <> 
            <Header>
                <div className="title" style={{ marginLeft:"15px"}}>
                    Сервис мониторинга состояния компонентов ИС АО "НПП "Звезда"
                </div>
                <div className={classes.user}>
                    <p style={{margin:"10px"}}>{userTitle}</p>
                    <Button style={{ marginRight:"15px"}} onClick={hendlerOnclick}>{logging}</Button>
                </div>
            </Header>
            <Navbar style={{display:"block", alignItems:"center", justifyContent:"space-evenly"}}>
                <div className="links">
                    <NavLink to="/" className="link">HomePage</NavLink>
                    <NavLink to="/soft_info" className="link">Состояние ПО</NavLink>
                    <NavLink to="/errors" className="link">Ошибки ПО</NavLink>
                    <NavLink to="/logs_list" className="link">Log-файлы</NavLink>
                </div>
            </Navbar>
            
            <Outlet/>
            
        </>
    );
};

export default Layout;