import React from 'react';
import Input from '../../UI/input/Input';
import Select from '../../UI/select/Select';
import classes from "./FilterPOs.module.css"
const FilterPOs = ({filter, setFilter}) => {
    return (
        <div className={classes.FilterPOs}>
                <Select 
                    /*При изменении значения select'a, это значение записывается в переменную filter.sort из workspase'a с помощью обработчика событий */
                    onChange={selectedSort => setFilter({...filter, sort:selectedSort})} 
                    value={filter.sort} /*При первой отрисовке равно пустой строке, позже заполняется в зависимости от выбора*/
                    defaultValue="Сортировка"
                    options={[
                        {value:'soft_name', name:'По названию'},
                        {value:'last_upd', name:'По последнему обновлению'}
                    ]}
                
                />
                <Input style={{margin:"5px"}} placeholder="Поиск..." value={filter.query} onChange={e => setFilter({...filter, query: e.target.value})}/>
                {/*При изменении инпута перезаписывается поле query переменной filter через обработчик событий, значение берется из значения, введенного в инпут */}
                {/*с помощью функции изменения состояния, вызываем по клику модальное окно */}
        </div>
    );
};

export default FilterPOs;