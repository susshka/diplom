import React from 'react';
import POHeader from './POHeader_component/POHeader';
import POItem from './POItem_component/POItem';
import classes from './POList.module.css';

const POList = ({posts,setAddedPO, setIndex, location}) => {
    const titlesHeader= [{title:"ID ПО"},
                         {title:"Название ПО"},
                         {title:"Код ПО"},
                         {title:"Последнее обновление"},
                         {title:"Статус"},
                        ];
    if(!posts.length){
        return(
        <h1 style={{textAlign:'center', fontSize:25}}>Программное обеспечение не найдено!</h1>
        )
    }
    return (
        <div className={classes.POList}>
            <POHeader titles={titlesHeader}/>
            {posts.map((postIter, index) =>
                <POItem number={index} post={postIter} key={postIter.id} setAddedPO={setAddedPO} setIndex={setIndex} location={location}/>
            )}   
        </div>
    );
};

export default POList;