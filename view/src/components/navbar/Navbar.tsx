import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
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
        <nav>
            <div className="menu">
                <MenuIcon className="menuIcon"/>
            </div>
            

            <div className="logo">
                <Link className="logo" to="/">RiboSport</Link>
            </div>
            <div className="menuItems">
                <ul>
                    <li>
                        <Link className="navLink" to="/">Pocetna</Link>
                    </li>
                    <li>
                        <Link className="navLink" to="/products">Kupovina</Link>
                    </li>
                    <li>
                        <Link className="navLink" to="/login">Prijava</Link>
                    </li>
                    <li>
                        <Link className="navLink" to="/register">Registracija</Link>
                    </li>
                    <li>
                        <span>0</span>
                        <Link className="navLink" to="/cart">
                            <ShoppingCartIcon className="closeIcon"/>
                        </Link>
                    </li>
                </ul>
                <div className="closeBtn">
                    <CloseIcon className="cartIcon"/>
                </div>
            </div>
        </nav>
    )
}
