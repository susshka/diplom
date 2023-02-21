import {createContext, useState} from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({children, users, setUserTitle, setLogging}) => {
    const [user, setUser] = useState(null);

    const signin = (usr, pw, cb) => {
        if (users.find(ud => ud.login===usr && ud.password===pw)){  
            setUser({user:usr, password:pw});
            setLogging("Выйти")
            setUserTitle(usr)
            cb();
        }
        else {
            setUser(null);
            cb();
        }
    }
    const signout = (cb) =>{
        setLogging("Войти")
        setUserTitle("Авторизуйтесь")
        setUser(null);
        cb();
    }

    const value ={user, signin, signout}

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}   