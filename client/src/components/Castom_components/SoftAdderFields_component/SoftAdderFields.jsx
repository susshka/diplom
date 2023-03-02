import React, {useState} from 'react';
import Button from '../../UI/button/Button';
import Input from '../../UI/input/Input';
import Select from '../../UI/select/Select';
import classes from './SoftAdderFields.module.css'

const SoftAdderFields = () => {
    const [softData, setSoftData] = useState({soft_name:"", soft_code:"", typeLog:"", path_dir:"", server_name:"", dtbs_name:"", tbl_name:"", usr_name:"", pwd:"", watching:"", def_time:"", act_time:""});

    const hendlerSubmit = (event) =>{
        event.preventDefault();
        
    }

    if(softData.typeLog===""){
        return (
            <div className={classes.SoftAdderFields}>
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
                        onChange={selectedType => setSoftData({...softData, typeLog:selectedType})} 
                        value={softData.typeLog} /*При первой отрисовке равно пустой строке, позже заполняется в зависимости от выбора*/
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
    else if(softData.typeLog==="database") {
        
        return (
            <form className={classes.SoftAdderFields} onSubmit={hendlerSubmit}>
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
                        onChange={selectedType => setSoftData({...softData, typeLog:selectedType})} 
                        value={softData.typeLog} /*При первой отрисовке равно пустой строке, позже заполняется в зависимости от выбора*/
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
                    <Input  type="text" disabled={false} required={true} placeholder="Введите имя базы данных" value={softData.dtbs_name} onChange={e =>  setSoftData({...softData, dtbs_name: e.target.value})}/>
                </div>
                <div className={classes.field}>
                    <strong className={classes.fieldTitle}>Введите имя таблицы: </strong>
                    <Input  type="text" disabled={false} required={true} placeholder="Введите имя таблицы" value={softData.tbl_name} onChange={e =>  setSoftData({...softData, tbl_name: e.target.value})}/>
                </div>
                <div className={classes.field}>
                    <strong className={classes.fieldTitle}>Введите имя пользователя: </strong>
                    <Input  type="text" disabled={false} required={true} placeholder="Введите имя пользователя" value={softData.usr_name} onChange={e =>  setSoftData({...softData, usr_name: e.target.value})}/>
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
                    <Input  type="number" disabled={false} required={true} placeholder="Введите дефолтное время (мин.)" value={softData.def_time} onChange={e =>  setSoftData({...softData, def_time: e.target.value})}/>
                </div>
                <div className={classes.field}>
                    <strong className={classes.fieldTitle}>Введите активное время отслеживание: </strong>
                    <Input  type="number" disabled={false} required={true} placeholder="Введите активное время (мин.)" value={softData.act_time} onChange={e =>  setSoftData({...softData, act_time: e.target.value})}/>
                </div>
                <div className={classes.field} style={{display:"flex", justifyContent:"center"}}>
                    <hr style={{margin:'15px 0'}}/>
                    <Button type="submit" className={classes.send} >Создать ПО</Button>
                </div>
            </form>
        );
    }
    else {
        return (
            <form className={classes.SoftAdderFields} onSubmit={hendlerSubmit}>
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
                        onChange={selectedType => setSoftData({...softData, typeLog:selectedType})} 
                        value={softData.typeLog} /*При первой отрисовке равно пустой строке, позже заполняется в зависимости от выбора*/
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
                <div className={classes.field} style={{display:"flex", justifyContent:"center"}}>
                    <hr style={{margin:'15px 0'}}/>
                    <Button type="submit" className={classes.send} >Создать ПО</Button>
                </div>
            </form>
        );
    }
};

export default SoftAdderFields;