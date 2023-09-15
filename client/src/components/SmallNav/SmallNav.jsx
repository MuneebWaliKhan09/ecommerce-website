import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Typography from '@mui/material/Typography';
import "./left.css";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "../../../node_modules/bootstrap/dist/css/bootstrap.css"
import "../../../node_modules/bootstrap-icons/font/bootstrap-icons.css"



export default function SwipeableTemporaryDrawer() {
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

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
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
            </List>
        </Box>
    );

    const images = [
        'https://source.unsplash.com/1600x600/?shoes,shoes',
        'https://source.unsplash.com/1600x600/?women,fashion',
        'https://source.unsplash.com/1600x600/?mens,fashion',
    ];
    return (
        <div>
            <div className='d-flex p-3 gap-2 align-items-center justify-space-between navbar-light bg-light navhome2 shadow  w-100'>
                <div>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer('left', true)}
                    >
                        <MenuIcon style={{ fontSize: '36px' }} />
                    </IconButton>
                </div>

                <div className="navbar-brand logo d-flex align-items-center gap-3" style={{ fontWeight: "900", fontSize: "20px", color: "orangered" }}>
                    <img src="/logo.png" width="40" height="40" className="d-inline-block align-top" alt="eS-Shop Logo" />
                    eS-Shop
                </div>
                <br />
                <div className=''>
                    <button className='btn btn-danger d-flex' style={{ fontSize: "13px" }}>
                        register
                        <i className="bi bi-person-fill"> </i>
                    </button>
                </div>

                <div className='me-3'>
                    <button type="button" class="btn btn-danger position-relative" style={{ fontSize: "13px" }}>
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
                            99+
                        </span>
                        <span className='bi bi-cart'></span>

                    </button>
                </div>


            </div>
            <div className='d-flex input-group mb-2 p-3' style={{ maxWidth: "100%" }}>
                <input onKeyUp={''} type="text" className='form-control' placeholder='Search Products Here...' />
                <span className='bi bi-search'></span>
            </div>

            <SwipeableDrawer
                anchor="left"
                open={state['left']}
                onClose={toggleDrawer('left', false)}
                onOpen={toggleDrawer('left', true)}
            >
                {list('left')}
            </SwipeableDrawer>
            <Box sx={{ ml: 2 }}>
                <Typography paragraph>

                    <Carousel
                        infiniteLoop
                        autoPlay
                        showThumbs={false}
                        showStatus={false}
                        showIndicators={false}
                    >
                        {images.map((image, index) => (
                            <div key={index} className='caroules'>
                                <img src={image} height='200rem' alt={`Slide ${index + 1}`} />
                                <div className="carousel-caption pt-4">
                                    <h5>Discover the Perfect Gift for Every Occasion</h5>
                                    <p> From birthdays to anniversaries, our wide range of products ensures you'll find the perfect present that will bring joy and smiles.</p>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </Typography>
                <Typography paragraph>
                    Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
                    eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
                    neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
                    tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
                    sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
                    tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
                    gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
                    et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
                    tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
                    eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
                    posuere sollicitudin aliquam ultrices sagittis orci a.
                </Typography>
            </Box>
        </div>
    );
}
