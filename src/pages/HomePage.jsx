import React, {useState, useEffect} from 'react';
import axios from 'axios';
import classes from './HomePage.module.css'
const HomePage = (props) => {

    const [testUsers, setTestUsers] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        axios.get("/users")
        .then(
            (result) => {
                setIsLoaded(true);
                setTestUsers(result.data)
                console.log(result.data)
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
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
                <ul>
                    {testUsers.map((item) => (
                        <li key={item.id}>
                            {item.username} {item.password}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
   

};
export default HomePage;