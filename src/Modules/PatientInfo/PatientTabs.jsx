import React from "react";
import { Container, Nav } from "react-bootstrap";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import styles from "./PatientDetails.module.css";
import { FaUser } from "react-icons/fa";
import blood from "../../Assets/blood.png";
import pill from "../../Assets/pill.png";
import track from "../../Assets/track.png";
import { RiArrowLeftLongLine } from "react-icons/ri";
import DropdownComponent from "../Components/DropdownComponent";
import { useStore } from "../../store/Context";
import { useLocation } from "react-router-dom";

const PatientTabs = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { period, setPeriod } = useStore();

  const path = useLocation();
  const location = path.pathname;
  const lastPart = location.split("/").filter(Boolean).pop();

  return (
    <Container>
      <h5 className='d-flex align-items-center mt-4'>
        <RiArrowLeftLongLine
          onClick={() => navigate("/doctor-dashboard")}
          className={`me-1 ${styles.cursor}`}
        />
        Patient Record
      </h5>
      <div className='d-flex flex-column flex-md-row justify-content-between align-items-end align-items-md-center'>
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
              <img src={track} alt='icon' className={styles.icon} /> Health
              track
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
        {lastPart !== "medication" && lastPart !== "personal-details" && (
          <DropdownComponent setPeriod={setPeriod} period={period} />
        )}
      </div>
      <div className='mb-4'>
        <Outlet context={{ id }} />
      </div>
    </Container>
  );
};

export default PatientTabs;
