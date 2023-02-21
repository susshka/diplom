import React from 'react';
import classes from "./Select.module.css"
const Select = ({options, defaultValue, value, onChange}) => {
    /*Вытаскиваем в value переменную selectedSort из workspase'a*/
    /*Вытаскиваем в onChange функцию выбора сортировки из workspase'a */
    return (
        <select className={classes.Select}
            value={value}
            onChange={event => onChange(event.target.value)} 
        >
                <option disabled value=""> {/*Добавляем дефолтное значение, переданное из navigationform */}
                    {defaultValue}
                </option>
                {options.map(option =>
                    <option key={option.value} value={option.value}> {/*С помощью map вытаскиваем из options другие значения для выбора, ключ обязателен(не повторяющееся значение) */}
                        {option.name}
                    </option>
                    )}
        </select>
    );
};

export default Select;