import {NavLink, Outlet} from 'react-router-dom';

import React from 'react';
import Header from '../header/Header';
import Button from '../button/Button';
import Navbar from '../navbar/Navbar';
import Modal from '../modal/Modal';
import AuthorizForm from '../../Castom_components/AuthorizForm_component/AuthorizForm';

const Layout = ({modal, setModal,saveUserData, logging, setLogging, userData, setUserData}) => {
    const EaE = () => {
        if(userData.login==="" && userData.password===""&&logging==="Войти"){
            setModal(true)
        }
        else if (userData.login!=="" && userData.password!==""&&logging==="Выйти"){
            setLogging("Войти")
            setUserData({login:"",password:""});
        }
    }
    return (
        <> 
            <Modal visible={modal} setVisible={setModal}>
                {/*<POAdderForm create={createPOs}/>*/ }
                <AuthorizForm saveUD={saveUserData}  setVizible={setModal} visible={modal} setLogging={setLogging}/>
            </Modal>
            <Header>
                <div className="title" style={{ marginLeft:"15px"}}>
                    Сбор данных из различных сервисов АО "НПП "Звезда"
                </div>
                <Button style={{ marginRight:"15px"}} onClick={EaE}>{logging}</Button>
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