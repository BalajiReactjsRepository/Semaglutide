import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import styles from "./PatientDetails.module.css";
import Card from "react-bootstrap/Card";
import { FaUser } from "react-icons/fa";
import { FaMobileScreen } from "react-icons/fa6";
import { FaStethoscope } from "react-icons/fa6";
import { FaBowlFood } from "react-icons/fa6";
import { IoIosWarning } from "react-icons/io";
import { CgPill } from "react-icons/cg";
import PrescriptionModal from "./PrescriptionModal";
import { apiCaller } from "../../api/apiCaller";
import api from "../../api/axiosConfig";
import Loader from "../../utils/Loader";
import { onErrorHandler } from "../../utils/ErrorHandler";
import { ENDPOINTS } from "../../api/endpoints";

const PersonalDetails = () => {
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useOutletContext();

  useEffect(() => {
    if (!id) return;

    apiCaller({
      apiCall: () => api.get(ENDPOINTS.GET_PATIENT_DETAILS(id)),

      onSuccess: (data) => {
        setPatientData(data);
      },

      onError: (err) => {
        onErrorHandler(err);
      },

      setLoading,
    });
  }, [id]);

  if (loading && !patientData) {
    return (
      <div className='vh-100 d-flex align-items-center justify-content-center'>
        <Loader />
      </div>
    );
  }

  return (
    <div className='row '>
      <div className='col-sm-12'>
        <Card body className={`mt-5 ${styles.customCard}`}>
          <h5 className='fw-bold d-flex align-items-baseline'>
            <FaUser className='me-1' /> John Doe
          </h5>
          <p className='mb-1 text-muted'>
            <FaMobileScreen style={{ color: "#0c64c9" }} /> +91 9876543210
          </p>
          <small className='text-secondary'>Male • 30 yrs</small>
        </Card>
      </div>
      <div className='col-sm-6'>
        <Card body className={`mt-4 ${styles.customCard}`}>
          <h6 className='fw-bold d-flex align-items-baseline'>
            <FaStethoscope className='me-1' /> Health Concern
          </h6>
          <p className='mb-1 text-muted'>PCOS, Hypertension</p>
          <h6 className='fw-bold d-flex align-items-baseline'>
            <FaBowlFood className='me-1' /> Food Preferences
          </h6>
          <p className='mb-1 text-muted'>Vegetarian, Low Carb</p>
        </Card>
      </div>
      <div className='col-sm-6'>
        <Card body className={`mt-4 ${styles.customCard}`}>
          <h6 className='fw-bold d-flex align-items-baseline'>
            <IoIosWarning className='me-1' /> Diet Allergies
          </h6>
          <p className='mb-1 text-muted'>Peanuts, Dairy</p>
          <h6 className='fw-bold d-flex align-items-baseline'>
            <CgPill className='me-1' /> Prescription
          </h6>
          <p className='mb-0 text-muted'>
            <PrescriptionModal />
          </p>
        </Card>
      </div>
    </div>
  );
};

export default PersonalDetails;
