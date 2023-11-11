import React, { useEffect } from 'react';
import { UserDetails } from '../../../../Store/features/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import './user.css';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

const User = () => {
    const dispatch = useDispatch();
    const params = useParams();

    const { loadingAdminUser, user } = useSelector(state => state.app.AuthorizedUserFunc);

    useEffect(() => {
        dispatch(UserDetails(params.id));
    }, [dispatch]);

    if (loadingAdminUser) {
        return (
            <div>
            <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh", width: "100%" }}>
              <CircularProgress sx={{ color: "black" }} size={40} thickness={5} />
            </Box>
          </div>
        );
    }

    return (
        <Container className="mt-4 border p-4 rounded shadow">
            <h2 className="mb-5 text-center">User Details</h2>
            {user && (
                <Row className="mb-3">
                    <Col xs={12} sm={4} className="text-center">
                        <Image src={user.avatar && user.avatar[0].url} roundedCircle width="150" height="150" alt={user.username} />
                    </Col>
                    <Col xs={12} sm={8}>
                        <Row className="mb-3">
                            <Col xs={4} sm={4}>
                                <strong>Name:</strong>
                            </Col>
                            <Col xs={8} sm={8}>
                                {user.username}
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs={4} sm={4}>
                                <strong>Email:</strong>
                            </Col>
                            <Col xs={8} sm={8}>
                                {user.email}
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs={4} sm={4}>
                                <strong>Role:</strong>
                            </Col>
                            <Col xs={8} sm={8}>
                                {user?.role}
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs={4} sm={4}>
                                <strong>CreatedAt:</strong>
                            </Col>
                            <Col xs={8} sm={8}>
                                {new Date(user.CreatedAt).toDateString()}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default User;
