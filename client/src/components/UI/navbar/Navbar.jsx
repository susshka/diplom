import React from "react";
import classes from './Navbar.module.css';

const Navbar = ({children, ...props}) => {

    return (

        <nav className={classes.Nav}>
            {children}
        </nav>
    );
}

export default Navbar;