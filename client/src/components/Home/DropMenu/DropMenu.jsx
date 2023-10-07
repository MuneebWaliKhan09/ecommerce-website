import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Loader from "../../CustomLoader/Loader"
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css"
import "../../../../node_modules/bootstrap-icons/font/bootstrap-icons.css"
import { useDispatch, useSelector } from 'react-redux';
import { clearError, loginUserDetails, logoutUser, clearErrorUser } from '../../../Store/features/productSlice';

const DropMenu = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();

    const { user, errorUser } = useSelector((state) => state.app.userData)
    const { msg2, error, loading } = useSelector((state) => state.app.userAuth)

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOout = async () => {
        dispatch(logoutUser())
    }


    useEffect(() => {
        if (msg2) {
            enqueueSnackbar(msg2, { variant: "success" })
            navigate('/login')
            dispatch(clearError())
            dispatch(clearErrorUser())
        }
        if (error) {
            enqueueSnackbar(error, { variant: "error" })
            dispatch(clearError())
        }
    }, [msg2, error, enqueueSnackbar, navigate])


    useEffect(() => {
        dispatch(loginUserDetails())
    }, [dispatch])



    return (

        <>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 40, height: 40 }} src={user && user.avatar && user.avatar[0].url} />
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>
                    <Avatar sx={{ width: 32, height: 32, background: "grey" }}>{user && user.username && user.username.slice(0, 1).toUpperCase()}</Avatar>{user && user.username}
                </MenuItem>
                <Link to='/account' className="text-decoration-none text-inherit">
                    <MenuItem onClick={handleClose}>
                        <Avatar /> My account
                    </MenuItem>
                </Link>

                <Divider />
                {
                    user && user.role === "admin" ? (
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <LockOpenIcon fontSize="small" />
                            </ListItemIcon>
                            Admin-panel
                        </MenuItem>
                    ) : (
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <PersonAdd fontSize="small" />
                            </ListItemIcon>
                            Register User
                        </MenuItem>
                    )
                }
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <div style={{ textDecoration: "none", color: "inherit" }} onClick={handleLogOout}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </div>
                </MenuItem>
            </Menu>
        </>
    );
}

export default DropMenu;

