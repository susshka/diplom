import React from 'react';
import Button from '../button/Button'
import {NavLink} from 'react-router-dom';
import classes from './LinkButton.module.css'
const LinkButton = ({children, to,  ...props}) => {
    return (
        <Button {...props}>
            <NavLink to={to} className={classes.nl}>
                {children}
            </NavLink>
        </Button>
    );
};

export default LinkButton;