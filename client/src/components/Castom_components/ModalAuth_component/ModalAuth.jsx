import React from 'react';
import {useLocation} from 'react-router-dom';
import Modal from '../../UI/modal/Modal';
import AuthorizForm from '../AuthorizForm_component/AuthorizForm';
import {useAuth} from '../../hook/useAuth'

const ModalAuth = ({modal,setModal,saveUserData, setLogging,setUserTitle}) => {
    const location = useLocation();
    const {signin} = useAuth();
    const fromPage = location.state?.from?.pathname || '/';
   // const mdl = location.state?.modal || false;
    //setModal(mdl);
    return (
        <Modal visible={modal} setVisible={setModal}>
                {/*<POAdderForm create={createPOs}/>*/ }
                {fromPage}
                <AuthorizForm saveUD={saveUserData} signin={signin} frompage={fromPage} setVizible={setModal} visible={modal} setLogging={setLogging} setUserTitle={setUserTitle}/>
        </Modal>
    );
};

export default ModalAuth;