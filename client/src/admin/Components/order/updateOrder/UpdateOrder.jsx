import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { OrderFinalStatus, clearErrorAdminProduct } from '../../../../Store/features/productSlice';
import { Box } from '@mui/material';
import { CircularProgress } from '@mui/material';

const UpdateOrder = () => {
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()
    const params = useParams()
    const [status, setStatus] = useState("")

console.log(status);
    const { loadingAdminProduct, errorAdminProduct, msgAdminProduct } = useSelector(state => state.app.AuthorizedProductFunc)


    const handleStatus = (e) => {
        e.preventDefault()
        dispatch(OrderFinalStatus({ id: params.id, status: status}))
    }




    useEffect(() => {
        if (errorAdminProduct) {
            enqueueSnackbar(errorAdminProduct, { variant: "error" });
        }

        if (msgAdminProduct) {
            enqueueSnackbar(msgAdminProduct, { variant: "success" })
            navigate('/admin/dashboard/orders')
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        }

        return () => {
            dispatch(clearErrorAdminProduct())
        }

    }, [msgAdminProduct, errorAdminProduct, dispatch])


    if (loadingAdminProduct) {
        return <div>
            <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh", width: "100%" }}>
                <CircularProgress sx={{ color: "black" }} size={40} thickness={5} />
            </Box>
        </div>
    }

    return (
        <div className="update-order-container">
            <h2 className="update-order-heading">Mark Order as Delivered</h2>
            <Card className="update-order-card mt-4">
                <Card.Body>
                    <Form onSubmit={handleStatus}>
                        <Form.Group controlId="deliveredMessage">
                            <Form.Label>Delivery Message</Form.Label>
                            <Form.Control autoComplete='on' type="text" name='status' onChange={(e) => setStatus(e.target.value)} placeholder="Enter delivery message" />
                        </Form.Group>

                        <Button variant="success" type="submit" className="update-order-button my-4">
                            <i className="fas fa-check-circle me-2"></i> Mark as Delivered
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default UpdateOrder;
