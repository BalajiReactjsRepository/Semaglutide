import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { BsPersonCircle } from "react-icons/bs";
import logo from "../../Assets/Logo.png";
import styles from "./Components.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const NavbarModule = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove(process.env.REACT_APP_SECRET_TOKEN);
    navigate("/login");
  };

  return (
    <div>
      <Navbar expand='lg' className='shadow-sm bg-white'>
        <Container>
          <Nav.Link as={NavLink} to='/dashboard'>
            <img className={styles.brandLogo} src={logo} alt='logo' />
          </Nav.Link>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {/* <Nav.Link href='#home'>Home</Nav.Link>
              <Nav.Link href='#link'>Link</Nav.Link> */}
              <NavDropdown
                title={
                  <BsPersonCircle size={32} style={{ color: "#1d4ed8" }} />
                }
                id='basic-nav-dropdown'
                align='end'
              >
                <NavDropdown.Item href='#action/3.1'>
                  Change password
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarModule;
