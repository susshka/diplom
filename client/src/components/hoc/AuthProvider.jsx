import {createContext, useState, useEffect} from 'react';
import axios from 'axios';

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
    const register = (log, pwd, checkpwd, cb) => {
        if(pwd === checkpwd){
            //тут get-запрос к users на проверку наличия такого юзера в базе, если нет такого, продолжить регистрацию
                var msg =''
                axios.get("/users/"+log)
                .then(
                    (result) => {
                       msg = result.data.message
                       console.log(msg)
                       /*cb("Такой пользователь существует", false)*/
                        if(msg==="No users with this login"){
                            axios.post("/register", {'login':log, 'password':pwd})
                            .then(
                                (result) => {
                                    console.log(result.data)
                                    cb("Регистрация прошла успешно", true)
                                },
                                (error) => {
                                    msg=error.response.data.message
                                    console.log(msg)
                                    cb(msg, false)
                                }
                            ) 
                        }
                        else if(msg === "This user find on base"){
                            cb("Такой пользователь существует", false)
                        }
                    },
                    (error) => {
                        msg=error.response.data.message
                        console.log(msg)
                        cb(msg, false)
                    }
                )

            //иначе - вывод колбека с собщением, что такой юзер есть
        }
        else{
            cb("Пароли не совпадают", false);
        }
    }

    const value ={user, signin, signout, register}

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}   