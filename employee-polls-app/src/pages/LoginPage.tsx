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
import Form from 'react-bootstrap/esm/Form';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Alert from 'react-bootstrap/esm/Alert';
import Navbar from 'react-bootstrap/esm/Navbar';
import Button from 'react-bootstrap/esm/Button';
import ROUTES from '../constants/routes';
import Image from 'react-bootstrap/Image';
import Logo from '../assets/img/employees_pool_logo.jpg';


function AlertLoginError({ onDismiss }: { onDismiss: () => void }) {

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

const validatePassword = (value: string): boolean => value.length >= 6 && !value.includes(' ');

function LoginPage() {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const users = useAppSelector(allUsers);
    const isLoggedIn = useAppSelector(isAuthed);
    const status = useAppSelector(loginStatus);

    const [username, setUsername] = useState('');
    const [isValidUsername, setIsValidUsername] = useState<boolean | null>(null);
    const [password, setPassword] = useState('');
    const [isValidPassword, setIsValidPassword] = useState<boolean | null>(null);

    const { state } = useLocation()

    const userOptions = useMemo(() => mapUserOptions(users), [users]);

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch]);

    const handleUsernameChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setUsername((prevUsername) => {
            if (prevUsername !== '' && event.target.value === '') {
                setIsValidUsername(false);
            } else {
                setIsValidUsername(true);
            }
            return event.target.value;
        });
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const value = event.target.value;

        setPassword(() => {
            if (validatePassword(value) === false) {
                setIsValidPassword(false);
            } else {
                setIsValidPassword(true);
            }
            return value;
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        if (!validatePassword(password)) {
            setIsValidPassword(false);
        }

        if (username === '') {
            setIsValidUsername(false);
        }

        if (!isValidPassword || !isValidUsername) {
            return;
        }

        dispatch(logIn({ username, password }));
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
            <Container className="md-8">
                {status === 'failed' && <AlertLoginError onDismiss={() => dispatch(clearLoginError())} />}
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

                            <Form.Group className="mb-3">
                                <Form.Label>Username:</Form.Label>
                                <Form.Select
                                    onChange={handleUsernameChange}
                                    isInvalid={isValidUsername === false}
                                    isValid={isValidUsername === true}
                                >
                                    <option value="">Select a user...</option>
                                    {userOptions}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">Please select an user.</Form.Control.Feedback>
                                <Form.Control.Feedback type="valid">Great! you selected {username} id.</Form.Control.Feedback>
                            </Form.Group>


                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control type="password"
                                    placeholder="You can find your password in the README file."
                                    value={password}
                                    onChange={handlePasswordChange}
                                    autoComplete='off'
                                    required
                                    isInvalid={isValidPassword === false}
                                    isValid={isValidPassword === true}
                                    onInvalid={(e) => { e.currentTarget.setCustomValidity('Please insert your password.') }}
                                    onInput={(e) => { e.currentTarget.setCustomValidity('') }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please insert a valid password.<br />
                                    Password must be at least 6 characters long and it cannot contain blank spaces.<br />
                                    You can find your password in the README file.
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="valid">Great! Your password looks valid.</Form.Control.Feedback>
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