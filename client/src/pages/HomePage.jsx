import React, {useState, useEffect} from 'react';
import axios from 'axios';
import classes from './HomePage.module.css'
import {useAuth} from '../components/hook/useAuth'
import {useSoft} from '../components/hook/useSoft'
import Button from '../components/UI/button/Button';
import Input from '../components/UI/input/Input';

const HomePage = (props) => {

    const [testUsers, setTestUsers] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [message, setMessage] = useState('Введите данные')
    const [table, setTable] = useState({tbl: ''})

    const {user} = useAuth();
    const {setSoftList} = useSoft();
    const {getTable} = useSoft();

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
     },[])
    
    const hendlerSubmit = (event) =>{
        event.preventDefault();
        getTable(table.tbl)
        setTable({tbl: ''})
    }

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
                    <hr style={{margin:'15px 0'}}/>
                    <form onSubmit={hendlerSubmit}>
                        <p>{message}</p>
                        <Input type="text" disabled={false} required={true} placeholder="Введите название таблицы" value={table.tbl} onChange={e => setTable({...table, tbl:e.target.value})}/>
                        <Button type="submit" className={classes.send}>Проверить таблицу</Button>
                    </form>
                </div>
            </div>
        );
    }
   

};
export default HomePage;