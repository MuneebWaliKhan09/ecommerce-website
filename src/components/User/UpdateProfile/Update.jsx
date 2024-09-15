import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrorUpdateProfile, updateUserProfile } from '../../../Store/features/productSlice';
import { useSnackbar } from 'notistack';

const Update = ({ setShowUpdate, showUpdate }) => {

    const { user, loadingUser } = useSelector((state) => state.app.userData)
    const { errorUpdate, msgUpdate, loadingUpdate } = useSelector((state) => state.app.updateUserProf)

    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();
    const [username, setUsername] = React.useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState("")

    const handleClose = () => {
        setShowUpdate(false);

    };

    const handleData = (e) => {
        e.preventDefault();
        const formData = new FormData()
        
        formData.append("username", username);
        formData.append("email", email);
        formData.append("avatar", avatar);
        dispatch(updateUserProfile(formData));
    }


    useEffect(() => {
        if (msgUpdate) {
            enqueueSnackbar(msgUpdate, { variant: "success" })
            setShowUpdate(false)
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        }

        if (errorUpdate) {
            enqueueSnackbar(errorUpdate, { variant: "error" })
        }

        return () => (
            dispatch(clearErrorUpdateProfile())
        )

    }, [msgUpdate, errorUpdate, enqueueSnackbar])

    useEffect(() => {
        if (user) {
            setUsername(user.username || '');
            setEmail(user.email || '');
        }
    }, [user]);

    return (
        <>
            <Dialog open={showUpdate} onClose={handleClose}>
                <DialogTitle>Update Profile</DialogTitle>
                <form onSubmit={handleData} encType="multipart/form-data">
                    <DialogContent >
                        <FormControl>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="username"
                                label="User Name"
                                type="text"
                                onChange={(e) => setUsername(e.target.value)}
                                name='username'
                                fullWidth
                                variant="standard"
                                value={username}
                                disabled={loadingUpdate ? true : false}

                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="email"
                                label="Email"
                                name='email'
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                fullWidth
                                variant="standard"
                                value={email}
                                disabled={loadingUpdate ? true : false}

                            />
                            <div className='pt-2 d-flex align-items-center'>
                                <input disabled={loadingUpdate ? true : false} type="file" name='avatar' onChange={(e) => setAvatar(e.target.files[0])} />
                                <img width={30} height={30} className='roundes-circle' style={{ objectFit: "cover" }} src={user.avatar && user.avatar[0].url} alt="" />
                            </div>
                        </FormControl>
                    </DialogContent>

                    <DialogActions>
                        <Button disabled={loadingUpdate ? true : false} type='submit'>Update</Button>
                        <Button disabled={loadingUpdate ? true : false} onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </form>
            </Dialog>

        </>
    )
}

export default Update