import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import { Button } from 'react-bootstrap';
import ROUTES from '../constants/routes';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
    userAvatarURL,
    isAuthed as isAuthedSelector,
    userName as authedUserName,
} from "../features/authedUser/authedUserSlice";
import { logOut } from '../features/authedUser/authedUserSlice';
import getAvatarImage from '../utils/avatar';

function LoginLogoutButton({
    isAuthed,
    logOutHandler,
    logInHandler,
}: {
    isAuthed: () => boolean,
    logOutHandler: () => void,
    logInHandler: () => void,
}) {
    return (
        isAuthed() ? <Button variant="outline-success" onClick={logOutHandler}>Logout</Button>
            : <Button variant="success" onClick={logInHandler}>Login</Button>
    )
}

function AppNavBar() {

    const avatarURL = useAppSelector(userAvatarURL);
    const userName = useAppSelector(authedUserName);
    const isAuthed = useAppSelector(isAuthedSelector);
    const dispatch = useAppDispatch();
    const handleLogOut = () => dispatch(logOut());
    const handleLogIn = () => { console.log('Login button clicked') };

    return (
        <Navbar expand="lg" className="bg-body-tertiary" style={{ marginBottom: "48px" }}>
            <Container>
                <Navbar.Brand as={Link} to={ROUTES.HOME}>Employee Polls</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to={ROUTES.HOME}>Home</Nav.Link>
                        <Nav.Link as={Link} to={ROUTES.LEADERBOARD}>Leaderboard</Nav.Link>
                        <Nav.Link as={Link} to={ROUTES.NEW_QUESTION}>New</Nav.Link>
                    </Nav>
                    <div className="d-flex" style={{ marginRight: '24px' }}>
                        <Image style={{ width: '50px', height: '50px', marginRight: '10px' }}
                            src={getAvatarImage(avatarURL)}
                            alt={`Profile Picture ${userName}`}
                            roundedCircle />
                        {isAuthed && <span className='d-flex align-items-center'>{userName}</span>}
                    </div>
                    <LoginLogoutButton isAuthed={() => isAuthed} logOutHandler={handleLogOut} logInHandler={handleLogIn} />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AppNavBar;