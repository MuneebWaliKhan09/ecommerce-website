import * as React from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "./left.css";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css"
import "../../../../node_modules/bootstrap-icons/font/bootstrap-icons.css"
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';




export default function SwipeableTemporaryDrawer() {
    const { errorUser2 } = useSelector((state) => state.app.userData)

    const [state, setState] = React.useState({
        left: false,
    });


    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    function getIconForText(text) {
        // Define your logic here to determine which icon to use based on text
        if (text === 'Home') {
            return <HomeIcon />;
        }
        else if (text === 'Products') {
            return <ShoppingCartIcon />;
        }
        else if (text === 'Register') {
            return <PersonAddAltIcon />;
        }
        else if (text === 'Login') {
            return <LoginIcon />;
        }
        else {
            return null; // You can return null for other items or define more conditions
        }
    }


    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {[
                    { text: 'Home', route: '/' },
                    { text: 'Products', route: '/products' },
                    { text: 'Register', route: '/register' },
                ].map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton component={Link} to={item.route}>
                            <ListItemIcon>{getIconForText(item.text)}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
                 {/*  show login when user not loged in errorUser2 is unauthorizes msg */}
                <ListItem disablePadding>
                    {
                        errorUser2 && errorUser2 ? (
                            <ListItemButton component={Link} to='/login'>
                                <ListItemIcon>{getIconForText('Login')}</ListItemIcon>
                                <ListItemText primary='Login' />
                            </ListItemButton>
                        ) : (
                            <span></span>
                        )
                    }
                </ListItem>

            </List>

            <Divider />

            {/* <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List> */}
        </Box>
    );

    return (
        <div className='d-flex flex-col' style={{ width: "40px" }}>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer('left', true)}
            >
                <MenuIcon style={{ fontSize: '36px' }} />
            </IconButton>


            <SwipeableDrawer
                anchor="left"
                open={state['left']}
                onClose={toggleDrawer('left', false)}
                onOpen={toggleDrawer('left', true)}
            >
                {list('left')}
            </SwipeableDrawer>
        </div>
    );
}
