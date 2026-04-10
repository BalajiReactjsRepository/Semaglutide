import React from "react";
import { Card } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import blood from "../../Assets/blood.png";
import styles from "./PatientDetails.module.css";

const BloodSugar = () => {
  const { id } = useOutletContext();
  console.log(id, "blood");
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
