import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import styles from "./PatientDetails.module.css";

const PrescriptionModal = ({ files = [] }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDownload = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = ""; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isImage = (file) => {
    return /\.(jpg|jpeg|png|webp)$/i.test(file);
  };

  const isPDF = (file) => {
    return /\.pdf$/i.test(file);
  };

  return (
    <>
      <Button className={styles.customBtn} size='sm' onClick={handleShow}>
        View Prescription
      </Button>

      <Modal show={show} onHide={handleClose} centered size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Prescription Files</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {files.length === 0 ? (
            <p className='text-muted'>No files available</p>
          ) : (
            <div className='d-flex flex-wrap gap-3'>
              {files.map((file, index) => (
                <div
                  key={index}
                  className='border rounded p-2 text-center'
                  style={{ width: "150px" }}
                >
                  {isImage(file) && (
                    <img
                      src={file}
                      alt='prescription'
                      style={{
                        width: "100%",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "6px",
                      }}
                    />
                  )}

                  {isPDF(file) && (
                    <div
                      style={{
                        height: "100px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#f1f1f1",
                        borderRadius: "6px",
                        fontWeight: "bold",
                      }}
                    >
                      PDF
                    </div>
                  )}

                  <div className='mt-2 d-flex flex-column gap-1'>
                    <Button
                      size='sm'
                      variant='outline-primary'
                      onClick={() => window.open(file, "_blank")}
                    >
                      View
                    </Button>

                    <Button
                      size='sm'
                      variant='outline-success'
                      onClick={() => handleDownload(file)}
                    >
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Modal.Body>

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
