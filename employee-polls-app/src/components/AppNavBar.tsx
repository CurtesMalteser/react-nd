import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import ROUTES from '../constants/routes';
import { Button } from 'react-bootstrap';
import { useAppDispatch } from '../app/hooks';
import { logOut } from '../features/authedUser/authedUserSlice';

function AppNavBar() {

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
                        <Button variant="outline-success" onClick={ handleLogOut }>Logout</Button>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AppNavBar;