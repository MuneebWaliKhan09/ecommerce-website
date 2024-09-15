import React, { useEffect, useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { clearErrorAdminUser, UpdateUserRole, UserDetails } from '../../../../Store/features/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CircularProgress } from '@mui/material';


const UpdateUser = () => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate()
  const params = useParams();

  const { loadingAdminUser, errorAdminUser, msgAdminUser, user } = useSelector(state => state.app.AuthorizedUserFunc)

  const [selectedRole, setSelectedRole] = useState(""); // Initial role


  useEffect(() => {
    dispatch(UserDetails(params.id));
  }, [dispatch]);


  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
    console.log(selectedRole);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(UpdateUserRole({ id: params.id, role: selectedRole }))
    console.log(selectedRole);

  };


  useEffect(() => {
    if (errorAdminUser) {
      enqueueSnackbar(errorAdminUser, { variant: "error" });
    }

    if (msgAdminUser) {
      enqueueSnackbar(msgAdminUser, { variant: "success" })
      navigate('/admin/dashboard/users')
    }

    return () => {
      dispatch(clearErrorAdminUser())
    }

  }, [msgAdminUser, errorAdminUser, dispatch])



  if (loadingAdminUser) {
    return <div>
      <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh", width: "100%" }}>
        <CircularProgress sx={{ color: "black" }} size={40} thickness={5} />
      </Box>
    </div>
  }


  return (
    <Container className="mt-4 shadow p-3 border">

      <h2 className="mb-4 p-4">Update User Role</h2>
      <Form className='p-4' onSubmit={handleSubmit}>
        <Form.Group controlId="userRole">
          <Form.Label>Role</Form.Label>
          <Form.Control
            as="select"
            name='role'
            value={selectedRole}
            onChange={handleRoleChange}
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </Form.Control>
        </Form.Group>
        <Button
          variant="primary"
          size='small'
          className="mt-4"
          type='submit'
        >
          Update Role
        </Button>
      </Form>

    </Container>
  );
};

export default UpdateUser;
