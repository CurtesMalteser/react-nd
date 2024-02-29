import './Header.css';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

function NavMenu() {
  return (
    <Nav>
      <Nav.Item>
        <Nav.Link as={Link} to="/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/add-books">Add Books</Nav.Link>
      </Nav.Item>
    </Nav>
  )
}

function Header() {
  return (
    <header className="App-Header">
      <h1>Book Management App</h1>
      <NavMenu />
    </header>
  );
}

export default Header;