import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faDoorClosed } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/features/userSlice';

const Appbar = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Navbar bg="dark" variant="dark"  expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Expense Tracker</Navbar.Brand>
        <Nav className="ml-auto">
          {user && (
            <NavDropdown title={user.displayName}>
              <NavDropdown.Item className="d-flex align-items-center gap-2">
                <FontAwesomeIcon icon={faUser} />
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item className="d-flex align-items-center gap-2" onClick={handleLogout}>
                <FontAwesomeIcon icon={faDoorClosed} />
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Appbar;