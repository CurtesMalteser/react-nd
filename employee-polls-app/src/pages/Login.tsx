import React, { useState, useEffect, ChangeEvent, useMemo } from 'react';
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { allUsers, fetchUsers } from '../features/users/usersSlice';
import {
    isAuthed,
    logIn,
    status as loginStatus,
    clearLoginError,
} from '../features/authedUser/authedUserSlice';
import User from '../utils/user';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ROUTES from '../constants/routes';
import Image from 'react-bootstrap/Image';
import Logo from '../assets/img/employees_pool_logo.jpg';
import { Alert, Button, Navbar } from 'react-bootstrap';

function AlertLoginError({onDismiss}: {onDismiss: () => void}){

    return (
        <Alert variant="danger" onClose={onDismiss} dismissible>
            <Alert.Heading>Oops! Something went wrong.</Alert.Heading>
            <p>
                We couldn't log you in with the provided credentials. Please check your username and password and try again.
            </p>
        </Alert>
    );
};

const mapUserOptions = (users: { [key: string]: User }) => Object.values(users)
    .map(user => { return <option key={user.id} value={user.id}>{user.name}</option> });

function LoginPage() {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const users = useAppSelector(allUsers);
    const isLoggedIn = useAppSelector(isAuthed);
    const status = useAppSelector(loginStatus);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { state } = useLocation()

    const userOptions = useMemo(() => mapUserOptions(users), [users]);

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

    if (isLoggedIn) {
        const from = state ? state.from : ROUTES.HOME
        return <Navigate to={from} />
    }

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary" style={{ marginBottom: "48px" }}>
                <Container>
                    <Navbar.Brand as={Link} to={ROUTES.HOME}>Employee Polls</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                </Container>
            </Navbar>
            {status === 'failed' && <AlertLoginError onDismiss={() => dispatch(clearLoginError())}/>}
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
                                {userOptions}
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
                            <>
                                <Button as="input" type="submit" variant="success" value="Login" />{' '}
                                <Button as="input" type="button" variant='outline-success' value="Cancel" onClick={() => navigate(ROUTES.HOME)} />
                            </>
                        </Form>
                    </Row>
                </Col>
            </Container>
        </>
    );
}

export default LoginPage;