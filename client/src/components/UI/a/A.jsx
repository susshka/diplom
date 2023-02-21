import React from 'react';
import classes from './A.module.css'

const A = ({href,children, ...props}) => {
    return (
        <a href={href} className={classes.A}>
           {children}
        </a>
    );
};

export default A;