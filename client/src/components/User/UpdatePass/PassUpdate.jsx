import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrorUpdateProfile, updateUserPassword } from '../../../Store/features/productSlice';
import { useSnackbar } from 'notistack';

const PassUpdate = ({ setShowUpdatePass, showUpdatePass }) => {

    const { errorUpdate, msgUpdate, loadingUpdate } = useSelector((state) => state.app.updateUserProf)

    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState("")

    const handleClose = () => {
        setShowUpdatePass(false);

    };

    const handleData = (e) => {
        e.preventDefault();
        dispatch(updateUserPassword({ oldPassword: oldPassword, newPassword: newPassword, confirmPassword: confirmPassword }));
    }


    useEffect(() => {
        if (msgUpdate) {
            enqueueSnackbar(msgUpdate, { variant: "success" })
            setShowUpdatePass(false)
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



    return (
        <>
            <Dialog open={showUpdatePass} onClose={handleClose}>
                <DialogTitle>Update Password</DialogTitle>
                <form onSubmit={handleData}>
                    <DialogContent >
                        <FormControl>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="password"
                                label="Old Password"
                                type="text"
                                onChange={(e) => setOldPassword(e.target.value)}
                                name='oldPassword'
                                fullWidth
                                variant="standard"
                                disabled={loadingUpdate ? true : false}

                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="password"
                                label="New Password"
                                type="text"
                                onChange={(e) => setNewPassword(e.target.value)}
                                name='newPassword'
                                fullWidth
                                variant="standard"
                                disabled={loadingUpdate ? true : false}

                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="password"
                                label="Confirm New Password"
                                type="text"
                                onChange={(e) => setconfirmPassword(e.target.value)}
                                name='confirmPassword'
                                fullWidth
                                variant="standard"
                                disabled={loadingUpdate ? true : false}

                            />

                        </FormControl>
                    </DialogContent>

                    <DialogActions>
                        <Button disabled={loadingUpdate ? true : false} type='submit'>Update Password</Button>
                        <Button disabled={loadingUpdate ? true : false} onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </form>
            </Dialog>

        </>
    )
}

export default PassUpdate