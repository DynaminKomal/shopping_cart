import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../Actions/userAction'

function Header() {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
    }

    return (
        <Navbar bg="dark" expand="lg" variant='dark'>
            <Container>
                <LinkContainer to='/home'><Navbar.Brand>Online Shopping</Navbar.Brand></LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <LinkContainer to='/home'><Nav.Link>Home</Nav.Link></LinkContainer>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav className="ml-auto">
                            <LinkContainer to='/cart'>
                                <Nav.Link>
                                    <i className="fa-solid fa-cart-shopping"></i> &nbsp; Cart
                                </Nav.Link></LinkContainer>
                            {userInfo ? (
                                <NavDropdown title={`Hello, ${userInfo.user.name}`} id="username">
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (<LinkContainer to='/login'>
                                <Nav.Link>
                                    <i className="fa-solid fa-user"></i> &nbsp; Hello, Sign In
                                </Nav.Link>
                            </LinkContainer>)}

                        </Nav>
                    </Navbar.Collapse>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header