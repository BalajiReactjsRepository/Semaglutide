import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import styles from "./PatientDetails.module.css";

const PrescriptionModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className={styles.customBtn} size='sm' onClick={handleShow}>
        View Prescription
      </Button>

      <Modal show={show} onHide={handleClose} centered size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Prescription Files</Modal.Title>
        </Modal.Header>

        <Modal.Body></Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PrescriptionModal;
