import React, {useState, useEffect} from 'react';
import axios from 'axios';
import classes from './HomePage.module.css'
import {useAuth} from '../components/hook/useAuth'
import {useSoft} from '../components/hook/useSoft'

const HomePage = (props) => {

    const [testUsers, setTestUsers] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const {user} = useAuth();
    const {setSoftList} = useSoft();

    var header ={}

    if(user){
        header = {"Authorization" :"Bearer "+user.access_token}     
    }
    else{
        header ={}
        
    }

    useEffect(() => {
        axios({url:"/users", method: 'get', headers:header})
        .then(
            (result) => {
                setIsLoaded(true);
                setTestUsers(result.data)
                setError(null);
            },
            (error) => {
                console.log(error)
                setIsLoaded(false);
                setError(error);
            }
        )
           setSoftList();
     },[])
    

    if(error){
        return (<div className={classes.HomePage}>Ошибка: {error.message}</div>);
    } 
    else if(!isLoaded) {
        return (<div className={classes.HomePage}>Загрузка...</div>);
    } 
    else{
        return(
            <div className={classes.HomePage}>
                <div className={classes.list}>
                    <strong style={{display:"block", justifyContent:"center"}}>Список зарегестрированных пользователей</strong>
                    <ul style={{listStylePosition:"inside"}}>
                        {testUsers.map((item) => (
                            <li key={item.id}>
                                {item.login} 
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
   

};
export default HomePage;