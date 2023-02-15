import React from 'react';
import {useLocation, Navigate} from 'react-router-dom'

/*Этот объект нужен для переадресации в случае, если аунтификация не успешна и для предоставления доступа если успешна */

const RequireAuth = ({children}) => {
    const location = useLocation();
    const auth = false;
    if(!auth){
        return <Navigate to='/auth' state={{from: location}}/>
    }
    return children;
};

export default RequireAuth;