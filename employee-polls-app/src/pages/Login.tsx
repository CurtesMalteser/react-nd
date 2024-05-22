import { useAppSelector, useAppDispatch } from '../app/hooks';
import { allUsers, fetchUsers } from '../features/users/usersSlice';
import { logIn } from '../features/authedUser/authedUserSlice';
import React, { useState, useEffect, ChangeEvent } from 'react';
import User from '../utils/user';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const userOptions = (users: { [key: string]: User }) => Object.values(users)
    .map(user => { return <option key={user.id} value={user.id}>{user.name}</option> });

function Login() {

    const users = useAppSelector(allUsers);
    const dispatch = useAppDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        dispatch(fetchUsers())
    }, []);

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

    return (
        <>
            <h2>Login</h2>
            <Container className="md-8">
                <Row>
                    <Col>
                        <Form onSubmit={handleSubmit}>
                            <Form.Label>Username:</Form.Label>
                            <Form.Select onChange={handleUsernameChange} >
                                <option value="">Select a user...</option>
                                {userOptions(users)}
                            </Form.Select>
                            <br />
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password"
                                placeholder="Random password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <br />
                            <button type="submit">Login</button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Login;