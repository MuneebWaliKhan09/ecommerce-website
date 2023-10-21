import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Grid, Modal, Button } from 'react-bootstrap';
import { DeleteOutline, Edit, Password } from '@mui/icons-material';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import "./Users.css";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"
import { useCookies } from 'react-cookie';

const Users = () => {
    const [cookie, setCookie, deleteCookie] = useCookies(['admin']);
    const [users, setUsers] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editedUser, setEditedUser] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState('');
    const [adminName, setAdminName] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem("admin");
            const config = {
                headers: {
                    "Authorization": token,
                }
            };

            try {
                const response = await axios.get('/adminFindAll', config);
                const data = response.data;
                setUsers(data.admins);
            } catch (error) {
                console.log('Error:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleEdit = (id) => {
        // Enable edit mode and set the edited user data
        const userToEdit = users.find((user) => user._id === id);
        setEditedUser(userToEdit);
        setEditMode(true);
    };

    const handleInputChange = (e) => {
        // Update the edited user data
        const { name, value } = e.target;
        setEditedUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleUpdate = async () => {
        // Hash the updated password
        const hashedPassword = await bcrypt.hash(editedUser.Password, 10);

        // Create a new user object with the hashed password
        const updatedUser = {
            ...editedUser,
            Password: hashedPassword,
        };

        // Perform update operation using API
        const response = await axios.put(
            `/adminUpdate/${editedUser._id}`,
            updatedUser
        ).then((res) => {
            if (res.status === 201) {
                toast.success(res.data.message);
                navigate('/admin-panel');
            }
        }).catch((error) => {
            toast.error(error.response.data.message);
        });
    };


    const handleDelete = async (id, UserName) => {
        // Perform delete operation using API
        try {
            const response = await axios.delete(`/adminDelete/${id}`);
            if (response.status === 201) {
                setShowDeleteModal(false);
                navigate("/admin-panel");
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error(error.response.message);
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'UserName', headerName: 'UserName', width: 130 },
        { field: 'Email', headerName: 'Email', width: 130 },
        { field: 'Password', headerName: 'Password', width: 130 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 130,
            renderCell: (params) => (
                <>
                    <Edit
                        style={{ color: 'blue', cursor: 'pointer', marginRight: 50 }}
                        onClick={() => handleEdit(params.row.id)}
                    />
                    <DeleteOutline
                        style={{ color: 'red', cursor: 'pointer' }}
                        onClick={() => {
                            setShowDeleteModal(true);
                            setDeleteUserId(params.row.id);
                            setAdminName( params.row.UserName)
                        }}
                    />
                </>
            ),
        },
    ];

    const rows = users.map((user) => ({
        id: user._id,
        UserName: user.UserName,
        Email: user.Email,
        Password: user.Password,
    }));

    return (
        <div style={{ height: '100vh', maxWidth: "100%" }}>
            {editMode ? (
                <div className="container border border-3 border-info  rounded-3" style={{ maxWidth: "400px" }}>
                    <h2 className='text-info text-center pt-3 pb-4' style={{ fontSize: "29px", fontWeight: "600" }}>Update Admin</h2>
                    <form className="container">
                        <div className="mb-3 ">
                            <label htmlFor="editUserName" className="form-label">Username:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="editUserName"
                                name="UserName"
                                value={editedUser.UserName || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="editEmail" className="form-label">Email:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="editEmail"
                                name="Email"
                                value={editedUser.Email || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="editPassword" className="form-label">Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                id="editPassword"
                                name="Password"
                                value={editedUser.Password || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button type="button" className="btn btn-primary w-100" onClick={handleUpdate}>
                            Update
                        </button>
                    </form>
                    <div className='text-center w-100 mt-3 mb-3'>
                        <a href="#" onClick={() => setEditMode(false)}>Back to Admins</a>
                    </div>
                </div>
            ) : (
                <div className="" style={{ height: "50vh", maxWidth: "100%" }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        checkboxSelection
                        className="table"
                    />
                </div>
            )}

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Admin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete the Admin <span className='text-danger'>{adminName}</span> ?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                    <Button variant="danger" onClick={() => handleDelete(deleteUserId)}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Users;
