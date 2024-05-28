import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import { Button } from 'react-bootstrap';
import ROUTES from '../constants/routes';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { userAvatarURL } from "../features/authedUser/authedUserSlice";
import { logOut } from '../features/authedUser/authedUserSlice';
import getAvatarImage from '../utils/avatar';


function AppNavBar() {

    const avatarURL = useAppSelector(userAvatarURL);
    const dispatch = useAppDispatch();
    const handleLogOut = () => dispatch(logOut());

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to={ROUTES.HOME}>React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to={ROUTES.HOME}>Home</Nav.Link>
                        <Nav.Link as={Link} to={ROUTES.LEADERBOARD}>Leaderboard</Nav.Link>
                        <Nav.Link as={Link} to={ROUTES.NEW_QUESTION}>New</Nav.Link>
                    </Nav>
                    <div className="d-flex">
                        <Image style={{ width: '50px', height: '50px', marginRight: '10px' }}
                            src={getAvatarImage(avatarURL)}
                            alt={'Profile Picture'}
                            roundedCircle />
                        <Button variant="outline-success" onClick={handleLogOut}>Logout</Button>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AppNavBar;