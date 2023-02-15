import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Modal from '../../UI/modal/Modal';
import AuthorizForm from '../AuthorizForm_component/AuthorizForm';

const ModalAuth = ({modal,setModal,saveUserData, setLogging,setUserTitle}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const fromPage = location.state?.from?.pathname || '/';
    
    return (
        <Modal visible={modal} setVisible={setModal}>
                {/*<POAdderForm create={createPOs}/>*/ }
                <AuthorizForm saveUD={saveUserData}  setVizible={setModal} visible={modal} setLogging={setLogging} setUserTitle={setUserTitle}/>
        </Modal>
    );
};

export default ModalAuth;