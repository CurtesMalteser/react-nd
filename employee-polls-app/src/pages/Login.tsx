import React, { useState, useEffect, ChangeEvent } from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { allUsers, fetchUsers } from '../features/users/usersSlice';
import { isAuthed, logIn } from '../features/authedUser/authedUserSlice';
import User from '../utils/user';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ROUTES from '../constants/routes';
import Image from 'react-bootstrap/Image';
import Logo from '../assets/img/employees_pool_logo.jpg';
import { Button } from 'react-bootstrap';

const userOptions = (users: { [key: string]: User }) => Object.values(users)
    .map(user => { return <option key={user.id} value={user.id}>{user.name}</option> });

function LoginPage() {

    const dispatch = useAppDispatch();

    const users = useAppSelector(allUsers);
    const isLoggedIn = useAppSelector(isAuthed);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { state } = useLocation()

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch]);

    const handleUsernameChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setPassword(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(logIn(username));
    };

    // todo: add a loader here
    // todo: handle error if user is not found
    // todo: add home button to cancel login

    if (isLoggedIn) {
        const from = state ? state.from : ROUTES.HOME
        return <Navigate to={from} />
    }

    return (
        <>
            <h2>Login</h2>
            <Container className="md-8">
                <Col>
                    <Row className='d-flex justify-content-center'>
                        <Image
                            src={Logo}
                            style={{
                                width: '400px',
                                height: '400px',
                                marginBottom: '48px',
                            }}
                            roundedCircle
                            alt="logo"
                        />
                    </Row>
                    <Row>
                        <Form onSubmit={handleSubmit}>
                            <Form.Label>Username:</Form.Label>
                            <Form.Select onChange={handleUsernameChange} >
                                <option value="">Select a user...</option>
                                {userOptions(users)}
                            </Form.Select>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control type="password"
                                    placeholder="Random password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    autoComplete='off'
                                    required
                                />
                            </Form.Group>
                            <Button type="submit" variant='success'>Login</Button>
                        </Form>
                    </Row>
                </Col>
            </Container>
        </>
    );
}

export default LoginPage;