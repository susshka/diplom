import React from 'react';
import classes from './Header.module.css';

const Header = ({children, ...props}) => {

    return (
    <header {...props} className={classes.Head}>
        {children}
    </header>
    );
}

export default Header