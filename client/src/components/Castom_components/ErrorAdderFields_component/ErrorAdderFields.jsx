import React, {useState, useEffect} from 'react';
import Select from '../../UI/select/Select';
import classes from './ErrorAdderFields.module.css'
import useSoft from '../../hook/useSoft'
import Input from '../../UI/input/Input';
import Button from '../../UI/button/Button';

const ErrorAdderFields = (props) => {
    const [errorData, setErrorData] = useState({ 
                                            err_code:"", err_descr:"", 
                                            err_status:"", coef_status:"", 
                                            sf_code:""});
    
    
    const {soft} = useSoft();
    const {setSoftList} = useSoft();
    useEffect(() => {
        setSoftList();  
        console.log('сработал useEffect')
    },[])
   
    const [message, setMessage] = useState("Введите данные");
    const [check, setCheck] = useState(true);

    const hendlerSubmit = (event) =>{
        event.preventDefault();
        /*addNewSoft(softData, checkAdd)*/
        setErrorData({err_code:"", err_descr:"", 
                    err_status:"", coef_status:"", 
                    sf_code:""})
    }

    if(check){
        if(errorData.sf_code===""){
            return (
                <div className={classes.ErrorAdderFields}>
                    <p style={{textAlign:'center'}}>{message}</p>
                    <div className={classes.field}>
                        <strong className={classes.fieldTitle}>Выберете ПО: </strong>
                        <Select 
                        /*При изменении значения select'a, это значение записывается в переменную filter.sort из workspase'a с помощью обработчика событий */
                            onChange={selectedType => setErrorData({...errorData, sf_code:selectedType})} 
                            value={errorData.sf_code} /*При первой отрисовке равно пустой строке, позже заполняется в зависимости от выбора*/
                            defaultValue="Код ПО"
                            options={ soft.map((softIter, index) => {
                                return {value: softIter.soft_code, name:softIter.soft_code}
                            }
                            )}
                        />
                    </div>
                </div>
            );
        }
        else {
            return (
                <form className={classes.ErrorAdderFields} onSubmit={hendlerSubmit}>
                    <p style={{textAlign:'center'}}>{message}</p>
                    <div className={classes.field}>
                        <strong className={classes.fieldTitle}>Выберете ПО: </strong>
                        <Select 
                        /*При изменении значения select'a, это значение записывается в переменную filter.sort из workspase'a с помощью обработчика событий */
                            onChange={selectedType => setErrorData({...errorData, sf_code:selectedType})} 
                            value={errorData.sf_code} /*При первой отрисовке равно пустой строке, позже заполняется в зависимости от выбора*/
                            defaultValue="Код ПО"
                            options={ soft.map((softIter, index) => {
                                return {value: softIter.soft_code, name:softIter.soft_code};
                            }
                            )}
                        />
                    </div>
                    <div className={classes.field}>
                        <strong className={classes.fieldTitle}>Введите код ПО: </strong>
                        <Input type="number" min="0" disabled={false} required={true} placeholder="Введите код ПО (число)" value={errorData.err_code} onChange={e => setErrorData({...errorData, err_code: e.target.value})}/>
                    </div>
                    <div className={classes.field}>
                        <strong className={classes.fieldTitle}>Введите описание ошибки(для регулярного выражения): </strong>
                        <Input type="text" disabled={false} required={true} placeholder="Введите описание" value={errorData.err_descr} onChange={e => setErrorData({...errorData, err_descr: e.target.value})}/>
                    </div>
                    <div className={classes.field}>
                        <strong className={classes.fieldTitle}>Введите статус ошибки: </strong>
                        <Input type="text" disabled={false} required={true} placeholder="Введите статус ПО" value={errorData.err_status} onChange={e => setErrorData({...errorData, err_status: e.target.value})}/>
                    </div>
                    <div className={classes.field}>
                        <strong className={classes.fieldTitle}>Введите коэффициент ошибки: </strong>
                        <Input type="number" step="0.1" min="0" max="1" disabled={false} required={true} placeholder="Введите коэффициент ошибки (число)" value={errorData.coef_status} onChange={e => setErrorData({...errorData, coef_status: e.target.value})}/>
                    </div>
                    <div className={classes.field} style={{display:"flex", justifyContent:"center"}}>
                        <hr style={{margin:'15px 0'}}/>
                        <Button type="submit" className={classes.send}>Добавить ошибку</Button>
                    </div>
                </form>
            );
        }
    }
};

export default ErrorAdderFields;