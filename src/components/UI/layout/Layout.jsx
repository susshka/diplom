import {NavLink, Outlet} from 'react-router-dom';

import React, {useState} from 'react';
import Header from '../header/Header';
import Button from '../button/Button';
import Navbar from '../navbar/Navbar';
import classes from './Layout.module.css'
import LinkButton from '../linkbutton/LinkButton';

const Layout = ({userTitle, EaE, logging}) => {
    
    return (
        <> 
            <Header>
                <div className="title" style={{ marginLeft:"15px"}}>
                    Сбор данных из различных сервисов АО "НПП "Звезда"
                </div>
                <div className={classes.user}>
                    <p style={{margin:"10px"}}>{userTitle}</p>
                    <LinkButton to="/auth" style={{ marginRight:"15px"}} onClick={EaE}>{logging}</LinkButton>
                </div>
            </Header>
            <Navbar style={{display:"block", alignItems:"center", justifyContent:"space-evenly"}}>
                <div className="links">
                    <NavLink to="/soft_info"className="link">Состояние ПО</NavLink>
                    <NavLink to="/logs_list"className="link">Log-файлы</NavLink>
                </div>
            </Navbar>
            
            <Outlet/>
            
        </>
    );
};

export default Layout;