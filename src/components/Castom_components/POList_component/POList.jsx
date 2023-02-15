import React, { useState } from 'react';
import POHeader from './POHeader_component/POHeader';
import POItem from './POItem_component/POItem';
import classes from './POList.module.css';

const POList = ({posts,setAddedPO}) => {
    const [titlesHeader, setTitlesHeader] = useState([{title:"ID ПО"},
                                                    {title:"Название ПО"},
                                                    {title:"Последнее обновление"},
                                                    {title:"Статус"}]);
    if(!posts.length){
        return(
        <h1 style={{textAlign:'center', fontSize:25}}>Программное обеспечение не найдено!</h1>
        )
    }
    return (
        <div className={classes.POList}>
            <POHeader titles={titlesHeader}/>
            {posts.map((postIter, index) =>
                <POItem number={index+1} post={postIter} key={postIter.id} setAddedPO={setAddedPO}/>
            )}   
        </div>
    );
};

export default POList;