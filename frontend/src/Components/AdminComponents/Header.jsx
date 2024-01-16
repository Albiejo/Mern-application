import React from 'react'
import { Navbar, Nav, Container, NavDropdown , Badge} from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useSelector , useDispatch} from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import {useLogoutMutation} from '../../slices/AdminApiSlice.js'
import {logout} from '../../slices/AdminAuthSlice.js';






const Header = () => {
    const adminInfo = useSelector(state => state.adminauth.adminInfo);

    console.log("admininfo" , adminInfo);

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [logoutApiCall] = useLogoutMutation();
    

    const adminlogoutHandler = async () => {
        try {
          await logoutApiCall().unwrap();
          dispatch(logout());
          navigate('/admin');
        } catch (err) {
          console.error(err);
        }
      }



  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/admin'>
            <Navbar.Brand>ADMIN</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
            {adminInfo ? (
                <>
                  <NavDropdown title="Admin" id='username'>
                   
                    <NavDropdown.Item onClick={adminlogoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header