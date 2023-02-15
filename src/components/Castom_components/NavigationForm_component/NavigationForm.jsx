import React from 'react';
import FilterPOs from '../FilterPOs_component/FilterPOs';
import POList from '../POList_component/POList';
import classes from './NavigationForm.module.css'

const NavigationForm = ({posts, title, filter, setFilter, setAddedPO}) => {

   
    return (
        <div className={classes.NavigationForm}>
            <h1 style={{textAlign:'left', fontSize:30}}>{title}</h1>
            <hr style={{margin:'15px 0'}}/>
            <FilterPOs filter={filter} setFilter={setFilter}/>
            <hr style={{margin:'15px 0'}}/>
            <POList posts={posts} setAddedPO={setAddedPO}/>
                
        </div>
    );
};

export default NavigationForm;