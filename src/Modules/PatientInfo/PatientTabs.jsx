import React from "react";
import { Container, Nav } from "react-bootstrap";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import styles from "./PatientDetails.module.css";
import { FaUser } from "react-icons/fa";
import blood from "../../Assets/blood.png";
import pill from "../../Assets/pill.png";
import track from "../../Assets/track.png";
import { RiArrowLeftLongLine } from "react-icons/ri";

const PatientTabs = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <Container>
      <h5 className='d-flex align-items-center mt-4'>
        <RiArrowLeftLongLine
          onClick={() => navigate("/dashboard")}
          className={`me-1 ${styles.cursor}`}
        />
        Patient Record
      </h5>
      <Nav variant='pills' className='mt-4 gap-3'>
        <Nav.Item>
          <NavLink
            className={({ isActive }) =>
              `nav-link ${styles.custNavLink} ${isActive ? styles.isActive : ""}`
            }
            as={NavLink}
            to='personal-details'
          >
            <FaUser /> Personal details
          </NavLink>
        </Nav.Item>

        <Nav.Item>
          <NavLink
            to='health-track'
            className={({ isActive }) =>
              `nav-link ${styles.custNavLink} ${isActive ? styles.isActive : ""}`
            }
          >
            <img src={track} alt='icon' className={styles.icon} /> Health track
          </NavLink>
        </Nav.Item>

        <Nav.Item>
          <NavLink
            className={({ isActive }) =>
              `nav-link ${styles.custNavLink} ${isActive ? styles.isActive : ""}`
            }
            as={NavLink}
            to='medication'
          >
            <img src={pill} alt='icon' className={styles.icon} /> Medication
          </NavLink>
        </Nav.Item>

        <Nav.Item>
          <NavLink
            className={({ isActive }) =>
              `nav-link ${styles.custNavLink} ${isActive ? styles.isActive : ""}`
            }
            as={NavLink}
            to='blood-sugar'
          >
            <img src={blood} alt='icon' className={styles.icon} /> Blood sugar
          </NavLink>
        </Nav.Item>
      </Nav>

      <Outlet context={{ id }} />
    </Container>
  );
};

export default PatientTabs;
