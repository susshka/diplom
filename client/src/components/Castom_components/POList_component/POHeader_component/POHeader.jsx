import React from 'react';
import Button from '../../../UI/button/Button';
import classes from './POHeader.module.css'
import {useSoft} from '../../../hook/useSoft';
const POHeader = ({titles, ...props}) => {

    const {setSoftList} = useSoft();
    return (
        <div className={classes.POHeader} {...props}>
            {titles.map((titlesIter) =>
                <strong className={classes.title} key={titlesIter.title}>{titlesIter.title}</strong>
            )}
            <div className={classes.title}>
                <Button onClick={() => {
                  setSoftList()
                }
                }>Refrash</Button>
          </div>
        </div>
    );
};

export default POHeader;