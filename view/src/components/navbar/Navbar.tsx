import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {GlobalState} from '../../GlobalState'
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import './Navbar.css';



// ==========================
import clsx from 'clsx';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: drawerWidth,
    },
    title: {
      flexGrow: 1,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-start',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    },
  }),
);
// ==========================

interface Props {
    
}

export const Navbar: React.FC = ({}: Props) => {
    const value = React.useContext(GlobalState);

// ================================
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
// ================================

    return (

            <>
        <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
          <div className="logo">
                 <Link className="logo" to="/">RiboSport</Link>
             </div>
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>

            <Link className="navLink" to="/">
                <ListItem button key={'Pocetna'}>
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <ListItemText primary={'Pocetna'} />
                </ListItem>
            </Link>

            <Link className="navLink" to="/products">
                <ListItem button key={'Kupovina'}>
                    <ListItemIcon><AddShoppingCartIcon /></ListItemIcon>
                    <ListItemText primary={'Kupovina'} />
                </ListItem>
            </Link>

            <Link className="navLink" to="/login">
                <ListItem button key={'Prijava'}>
                    <ListItemIcon><PersonIcon /></ListItemIcon>
                    <ListItemText primary={'Prijava'} />
                </ListItem>
            </Link>

            <Link className="navLink" to="/register">
                <ListItem button key={'Registracija'}>
                    <ListItemIcon><PersonAddIcon /></ListItemIcon>
                    <ListItemText primary={'Registracija'} />
                </ListItem>
            </Link>

            <Link className="navLink" to="/cart">
                <ListItem button key={'Korpa'} className="cartElem">
                    <ListItemIcon><ShoppingCartIcon className="cartIcon"/></ListItemIcon>
                    <ListItemText primary={'Korpa'} />
                    <span>0</span>
                </ListItem>
            </Link>

        </List>

      </Drawer>
    </div>

 {/* ========================================================== */}

        <nav>
             <div className="menu">
                 <MenuIcon className="menuIcon"/>
             </div>
            

             <div className="logo">
                 <Link className="logo" to="/">RiboSport</Link>
             </div>
             <div className="menuItems">
                 <ul className="navList">
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
                     <li className="cartElem">
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
         </>
    )
}
