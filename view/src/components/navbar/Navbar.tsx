import React, {useEffect, useState} from 'react'
import {GlobalState} from '../../GlobalState'
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import './Navbar.css';

interface Props {
    
}

export const Navbar: React.FC = ({}: Props) => {
    const value = React.useContext(GlobalState);

    return (
        <header>
            <MenuIcon />
            <CloseIcon />
            <ShoppingCartIcon />
            {/* {value} */}
        </header>
    )
}
