import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import styles from "./PatientDetails.module.css";
import { apiCaller } from "../../api/apiCaller";
import api from "../../api/axiosConfig";
import { ENDPOINTS } from "../../api/endpoints";
import { onErrorHandler } from "../../utils/ErrorHandler";

const PrescriptionModal = ({ patientId }) => {
  const [prescriptionData, setPrescriptionData] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (!patientId) return;

    apiCaller({
      apiCall: () =>
        api.post(ENDPOINTS.GET_PATIENT_PRESCRIPTIONS, {
          patientId: patientId,
        }),

      onSuccess: (data) => {
        const details = data?.result || {};
        setPrescriptionData(details);
      },

      onError: (err) => {
        onErrorHandler(err);
      },
    });
  }, [patientId]);

  // const handleDownload = async (url) => {
  //   const response = await fetch(url);
  //   const blob = await response.blob();

  //   const blobUrl = window.URL.createObjectURL(blob);

  //   const link = document.createElement("a");
  //   link.href = blobUrl;
  //   link.download = url.split("/").pop() || "file";

  //   document.body.appendChild(link);
  //   link.click();

  //   document.body.removeChild(link);
  //   window.URL.revokeObjectURL(blobUrl);
  // };

  const isImage = (file) => {
    const target = file?.prescription_url || file?.original_name || "";
    return /\.(jpg|jpeg|png|webp)$/i.test(target);
  };

  const isPDF = (file) => {
    const target = file?.prescription_url || file?.original_name || "";
    return /\.pdf$/i.test(target);
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
          {prescriptionData.length === 0 ? (
            <p className='text-muted'>No files available</p>
          ) : (
            <div className='d-flex flex-wrap gap-3'>
              {prescriptionData.map((file, index) => (
                <div
                  key={index}
                  className='text-center'
                  style={{ width: "150px" }}
                >
                  {isImage(file) && (
                    <img
                      src={file.prescription_url}
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
                      onClick={() => window.open(file?.prescription_url)}
                    >
                      View
                    </Button>

                    {/* <Button
                      size='sm'
                      variant='outline-success'
                      onClick={() => handleDownload(file?.prescription_url)}
                    >
                      {file?.original_name}
                    </Button> */}
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
