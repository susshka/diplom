import React, {useState} from 'react';
import Button from '../../UI/button/Button';
import Input from '../../UI/input/Input';
import Select from '../../UI/select/Select';
import classes from './SoftAdderFields.module.css'
import {useSoft} from '../../hook/useSoft'

const SoftAdderFields = () => {
    const [softData, setSoftData] = useState({soft_name:"", soft_code:"", 
                                            save_type_logs:"", path_dir:"", 
                                            server_name:"", databs_name:"", 
                                            table_name:"", user_name:"", 
                                            pwd:"", watching:"", 
                                            default_time_watching:"", 
                                            active_time_watching:""});
    const {addNewSoft} = useSoft();
    const [message, setMessage] = useState("Введите данные");
    const [check, setCheck] = useState(true);

    const checkAdd = (msg, ch) => {
        //проверка, какой коллбек дало добавление 
        if(msg ==="Программное обеспечение с таким кодом уже существует" && ch===false){
            setMessage(msg)
            setCheck(ch)
        }
        else if(msg ==="Программное обеспечение добавлено в базу" && ch===false){
            setMessage(msg)
            setCheck(ch)
        }
        else{
            setMessage(msg)
            setCheck(ch)
        }
    }

    const hendlerSubmit = (event) =>{
        event.preventDefault();
        addNewSoft(softData, checkAdd)
        setSoftData({soft_name:"", soft_code:"", 
                    save_type_logs:"", path_dir:"", 
                    server_name:"", databs_name:"", 
                    table_name:"", user_name:"", pwd:"", 
                    watching:"", default_time_watching:"", 
                    active_time_watching:""})
    }
    if(check === true){
        if(softData.save_type_logs===""){
            return (
                <div className={classes.SoftAdderFields}>
                    <p style={{textAlign:'center'}}>{message}</p>
                    <div className={classes.field}>
                        <strong className={classes.fieldTitle}>Введите название ПО: </strong>
                        <Input  type="text" disabled={false} required={true} placeholder="Введите название ПО" value={softData.soft_name} onChange={e =>  setSoftData({...softData, soft_name: e.target.value})}/>
                    </div>
                    <div className={classes.field}>
                        <strong className={classes.fieldTitle}>Введите код ПО: </strong>
                        <Input  type="text" disabled={false} required={true} placeholder="Введите код ПО" value={softData.soft_code} onChange={e =>  setSoftData({...softData, soft_code: e.target.value})}/>
                    </div>
                    <div className={classes.field}>
                        <strong className={classes.fieldTitle}>Выберете источник log-ов: </strong>
                        <Select 
                            /*При изменении значения select'a, это значение записывается в переменную filter.sort из workspase'a с помощью обработчика событий */
                            onChange={selectedType => setSoftData({...softData, save_type_logs:selectedType})} 
                            value={softData.save_type_logs} /*При первой отрисовке равно пустой строке, позже заполняется в зависимости от выбора*/
                            defaultValue="Тип логов"
                            options={[
                                {value:'database', name:'База данных'},
                                {value:'network drive', name:'Сетевой диск'}
                            ]}
                        
                        />
                    </div>
                </div>
            );
        }
        else if(softData.save_type_logs==="database") {

            return (
                <form className={classes.SoftAdderFields} onSubmit={hendlerSubmit}>
                    <p style={{textAlign:'center'}}>{message}</p>
                    <div className={classes.field}>
                        <strong className={classes.fieldTitle}>Введите название ПО: </strong>
                        <Input  type="text" disabled={false} required={true} placeholder="Введите название ПО" value={softData.soft_name} onChange={e =>  setSoftData({...softData, soft_name: e.target.value})}/>
                    </div>
                    <div className={classes.field}>
                        <strong className={classes.fieldTitle}>Введите код ПО: </strong>
                        <Input  type="text" disabled={false} required={true} placeholder="Введите код ПО" value={softData.soft_code} onChange={e =>  setSoftData({...softData, soft_code: e.target.value})}/>
                    </div>
                    <div className={classes.field}>
                        <strong className={classes.fieldTitle}>Выберете источник log-ов: </strong>
                        <Select 
                            /*При изменении значения select'a, это значение записывается в переменную filter.sort из workspase'a с помощью обработчика событий */
                            onChange={selectedType => setSoftData({...softData, save_type_logs:selectedType})} 
                            value={softData.save_type_logs} /*При первой отрисовке равно пустой строке, позже заполняется в зависимости от выбора*/
                            defaultValue="Тип логов"
                            options={[
                                {value:'database', name:'База данных'},
                                {value:'network drive', name:'Сетевой диск'}
                            ]}
                        
                        />
                    </div>
                    <div className={classes.field}>
                        <strong className={classes.fieldTitle}>Введите имя сервера: </strong>
                        <Input  type="text" disabled={false} required={true} placeholder="Введите имя сервера" value={softData.server_name} onChange={e =>  setSoftData({...softData, server_name: e.target.value})}/>
                    </div>
                    <div className={classes.field}>
                        <strong className={classes.fieldTitle}>Введите имя базы данных: </strong>
                        <Input  type="text" disabled={false} required={true} placeholder="Введите имя базы данных" value={softData.databs_name} onChange={e =>  setSoftData({...softData, databs_name: e.target.value})}/>
                    </div>
                    <div className={classes.field}>
                        <strong className={classes.fieldTitle}>Введите имя таблицы: </strong>
                        <Input  type="text" disabled={false} required={true} placeholder="Введите имя таблицы" value={softData.table_name} onChange={e =>  setSoftData({...softData, table_name: e.target.value})}/>
                    </div>
                    <div className={classes.field}>
                        <strong className={classes.fieldTitle}>Введите имя пользователя: </strong>
                        <Input  type="text" disabled={false} required={true} placeholder="Введите имя пользователя" value={softData.user_name} onChange={e =>  setSoftData({...softData, user_name: e.target.value})}/>
                    </div>
                    <div className={classes.field}>
                        <strong className={classes.fieldTitle}>Введите пароль: </strong>
                        <Input  type="text" disabled={false} required={true} placeholder="Введите пароль" value={softData.pwd} onChange={e =>  setSoftData({...softData, pwd: e.target.value})}/>
                    </div>
                    <div className={classes.field}>
                        <strong className={classes.fieldTitle}>Отслеживание: </strong>
                        <Select 
                            /*При изменении значения select'a, это значение записывается в переменную filter.sort из workspase'a с помощью обработчика событий */
                            onChange={selectedWatch => setSoftData({...softData, watching:selectedWatch})} 
                            value={softData.watching} /*При первой отрисовке равно true, позже заполняется в зависимости от выбора*/
                            defaultValue="Отслеживание"
                            options={[
                                {value:true, name:'Да'},
                                {value:false, name:'Нет'}
                            ]}
                        />
                    </div>
                    <div className={classes.field}>
                        <strong className={classes.fieldTitle}>Введите дефолтное время отслеживание: </strong>
                        <Input  type="number" disabled={false} required={true} placeholder="Введите дефолтное время (мин.)" value={softData.default_time_watching} onChange={e =>  setSoftData({...softData, default_time_watching: e.target.value})}/>
                    </div>
                    <div className={classes.field}>
                        <strong className={classes.fieldTitle}>Введите активное время отслеживание: </strong>
                        <Input  type="number" disabled={false} required={true} placeholder="Введите активное время (мин.)" value={softData.active_time_watching} onChange={e =>  setSoftData({...softData, active_time_watching: e.target.value})}/>
                    </div>
                    <div className={classes.field} style={{display:"flex", justifyContent:"center"}}>
                        <hr style={{margin:'15px 0'}}/>
                        <Button type="submit" className={classes.send} >Создать ПО</Button>
                    </div>
                </form>
            );
        }
        else /*if(softData.save_type_logs==="network drive")*/{
            return (
                <form className={classes.SoftAdderFields} onSubmit={hendlerSubmit}>
                    <p style={{textAlign:'center'}}>{message}</p>
                    <div className={classes.field}>
                        <strong className={classes.fieldTitle}>Введите название ПО: </strong>
                        <Input  type="text" disabled={false} required={true} placeholder="Введите название ПО" value={softData.soft_name} onChange={e =>  setSoftData({...softData, soft_name: e.target.value})}/>
                    </div>
                    <div className={classes.field}>
                        <strong className={classes.fieldTitle}>Введите код ПО: </strong>
                        <Input  type="text" disabled={false} required={true} placeholder="Введите код ПО" value={softData.soft_code} onChange={e =>  setSoftData({...softData, soft_code: e.target.value})}/>
                    </div>
                    <div className={classes.field}>
                        <strong className={classes.fieldTitle}>Выберете источник log-ов: </strong>
                        <Select 
                            /*При изменении значения select'a, это значение записывается в переменную filter.sort из workspase'a с помощью обработчика событий */
                            onChange={selectedType => setSoftData({...softData, save_type_logs:selectedType}) } 
                            value={softData.save_type_logs} /*При первой отрисовке равно пустой строке, позже заполняется в зависимости от выбора*/
                            defaultValue="Тип логов"
                            options={[
                                {value:'database', name:'База данных'},
                                {value:'network drive', name:'Сетевой диск'}
                            ]}
                        
                        />
                    </div>
                    <div className={classes.field}>
                        <strong className={classes.fieldTitle}>Введите путь к сетевому диску: </strong>
                        <Input  type="text" disabled={false} required={true} placeholder="Введите путь к сетевому диску" value={softData.path_dir} onChange={e =>  setSoftData({...softData, path_dir: e.target.value})}/>
                    </div>
                    <div className={classes.field}>
                        <strong className={classes.fieldTitle}>Отслеживание: </strong>
                        <Select 
                            /*При изменении значения select'a, это значение записывается в переменную filter.sort из workspase'a с помощью обработчика событий */
                            onChange={selectedWatch => setSoftData({...softData, watching:selectedWatch})} 
                            value={softData.watching} /*При первой отрисовке равно true, позже заполняется в зависимости от выбора*/
                            defaultValue="Отслеживание"
                            options={[
                                {value:true, name:'Да'},
                                {value:false, name:'Нет'}
                            ]}
                        />
                    </div>
                    <div className={classes.field}>
                        <strong className={classes.fieldTitle}>Введите дефолтное время отслеживание: </strong>
                        <Input  type="number" disabled={false} required={true} placeholder="Введите дефолтное время (мин.)" value={softData.default_time_watching} onChange={e =>  setSoftData({...softData, default_time_watching: e.target.value})}/>
                    </div>
                    <div className={classes.field}>
                        <strong className={classes.fieldTitle}>Введите активное время отслеживание: </strong>
                        <Input  type="number" disabled={false} required={true} placeholder="Введите активное время (мин.)" value={softData.active_time_watching} onChange={e =>  setSoftData({...softData, active_time_watching: e.target.value})}/>
                    </div>
                    <div className={classes.field} style={{display:"flex", justifyContent:"center"}}>
                        <hr style={{margin:'15px 0'}}/>
                        <Button type="submit" className={classes.send} >Создать ПО</Button>
                    </div>
                </form>
            );
        }
    }
    else{
        return (
            <div>
                <p style={{textAlign:'center'}}>{message}</p>
                <div style={{display:"flex", justifyContent:"center"}}>
                    <Button className={classes.send} onClick={() => {
                            setCheck(true)
                            setMessage("Введите данные")
                            setSoftData({soft_name:"", soft_code:"", 
                                        save_type_logs:"", path_dir:"", 
                                        server_name:"", databs_name:"", 
                                        table_name:"", user_name:"", pwd:"", 
                                        watching:"", default_time_watching:"", 
                                        active_time_watching:""})               
                        }}>Попробовать снова</Button>
                </div>
            </div>
        );
    }
};

export default SoftAdderFields;