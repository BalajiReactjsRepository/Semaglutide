import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import blood from "../../Assets/blood.png";
import styles from "./PatientDetails.module.css";
import { apiCaller } from "../../api/apiCaller";
import api from "../../api/axiosConfig";
import Loader from "../../utils/Loader";
import { onErrorHandler } from "../../utils/ErrorHandler";
import { ENDPOINTS } from "../../api/endpoints";

const BloodSugar = () => {
  const [bloodSugarData, setBloodSugarData] = useState(null);
  const [loading, setLoading] = useState(false);

  const { id } = useOutletContext();

  useEffect(() => {
    if (!id) return;

    apiCaller({
      apiCall: () => api.get(ENDPOINTS.GET_PATIENT_BLOOD_SUGAR(id)),

      onSuccess: (data) => {
        setBloodSugarData(data);
      },

      onError: (err) => {
        onErrorHandler(err);
      },

      setLoading,
    });
  }, [id]);

  if (loading && !bloodSugarData) {
    return (
      <div className='vh-100 d-flex align-items-center justify-content-center'>
        <Loader />
      </div>
    );
  }

  return (
    <Card body className='mt-5 w-25'>
      <div className='d-flex justify-content-between align-items-center mb-2'>
        <h6 className='mb-0'>
          {" "}
          <img src={blood} alt='icon' className={styles.icon} /> Blood Sugar
        </h6>
        <span className='badge bg-success'>Normal</span>
      </div>

      <p className='when-text'>Before Meal</p>

      <h1 className='bs-value'>120</h1>
      <p className='unit'>mg/dL</p>

      <small className='text-muted'>Ideal: 70–100 (fasting)</small>
    </Card>
  );
};

export default BloodSugar;
