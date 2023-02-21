import React from 'react';
import {useLocation, Navigate} from 'react-router-dom'
import {useAuth} from '../hook/useAuth'

/*Этот объект нужен для переадресации в случае, если аунтификация не успешна и для предоставления доступа если успешна */

const RequireAuth = ({children}) => {
    const location = useLocation();
    const {user} =useAuth();
    //console.log(user);
    if(!user){
        return <Navigate to='/auth' state={{from: location}}/>
    }
    return children;
};

export default RequireAuth;