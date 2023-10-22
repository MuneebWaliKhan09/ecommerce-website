import React from 'react';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';


const DrawersCustom = () => {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 ,minHeight:"100vh" }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List style={{paddingTop: "0px", backgroundColor: "rgb(60 67 73)", color: "white", height:"100vh"}}>
        <ListItem disablePadding style={{ backgroundColor: 'rgb(60 67 73)', padding: "20px", margin: 0 }}>
          <ListItemButton sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '31px' }}>
            <ListItemIcon sx={{ justifyContent: 'center' }}>
              <span className="bi bi-person-fill-lock text-light" style={{fontSize: "40px"}}></span>
            </ListItemIcon>
            <ListItemText primary={localStorage.getItem("adminName")} style={{color: "white", fontSize: "4px"}} />
          </ListItemButton>
        </ListItem>
        <hr style={{margin: 0, marginBottom: "27px", color: "white"}} />
        <ListItem disablePadding>
          <ListItemButton component={Link} to='/admin/dashboard'>
            <ListItemIcon>
              <span className='bi bi-house' style={{color:"white"}}></span>
            </ListItemIcon>
            <ListItemText primary='Home' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to='products'>
            <ListItemIcon>
              <span className='bi bi-cart' style={{color:"white"}}></span>
            </ListItemIcon>
            <ListItemText primary='Products' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to='categories'>
            <ListItemIcon>
              <span className='bi bi-list' style={{color:"white"}}></span>
            </ListItemIcon>
            <ListItemText primary='Category' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to='orders'>
            <ListItemIcon>
              <span className='bi bi-file-earmark' style={{color:"white"}}></span>
            </ListItemIcon>
            <ListItemText primary='Orders' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to='payments'>
            <ListItemIcon>
              <span className='bi bi-credit-card' style={{color:"white"}}></span>
            </ListItemIcon>
            <ListItemText primary='Payments' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to='messages'>
            <ListItemIcon>
              <span className='bi bi-chat' style={{color:"white"}}></span>
            </ListItemIcon>
            <ListItemText primary='Messages' />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer('left', true)}> <span className='bi bi-list text-light' style={{ fontSize: '27px' }}></span> </Button>
      <MuiDrawer
        anchor="left"
        open={state.left}
        onClose={toggleDrawer('left', false)}
      >
        {list('left')}
      </MuiDrawer>
    </div>
  );
};

export default DrawersCustom;
