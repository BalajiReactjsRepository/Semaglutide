import React from "react";
import { useOutletContext } from "react-router-dom";
import styles from "./PatientDetails.module.css";
import Card from "react-bootstrap/Card";
import weight from "../../Assets/weight.png";
import height from "../../Assets/height.png";
import bmi from "../../Assets/bmi.png";
import waist from "../../Assets/waist.png";

const HealthTrack = () => {
  const { id } = useOutletContext();
  console.log(id, "health");
  return (
    <div>
      <div className='row mt-5'>
        <div className='col-md-3'>
          <Card body className={styles.metricCard}>
            <h6 className='label'>
              <img
                src={height}
                className={styles.metricIcon}
                alt='metricIcon'
              />
              Height
            </h6>
            <h5>170 cm</h5>
          </Card>
        </div>

        <div className='col-md-3'>
          <Card body className={styles.metricCard}>
            <h6 className='label'>
              <img
                src={weight}
                className={styles.metricIcon}
                alt='metricIcon'
              />
              Weight
            </h6>
            <h5>65 kg</h5>
          </Card>
        </div>

        <div className='col-md-3'>
          <Card body className={styles.metricCard}>
            <h6 className='label'>
              <img src={bmi} className={styles.metricIcon} alt='metricIcon' />
              BMI
            </h6>
            <h5>22.5</h5>
          </Card>
        </div>
        <div className='col-md-3'>
          <Card body className={styles.metricCard}>
            <h6 className='label'>
              <img src={waist} className={styles.metricIcon} alt='metricIcon' />
              Waist-Hip Ratio
            </h6>
            <h5>22.5</h5>
          </Card>
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col-md-4'>
          <Card body className={styles.metricCard}>
            <h6 className='mb-3'>📏 Body Composition</h6>
            <div className='d-flex justify-content-between mb-2'>
              <span>Waist</span>
              <strong>32 in</strong>
            </div>
            <div className='d-flex justify-content-between mb-2'>
              <span>Hip</span>
              <strong>36 in</strong>
            </div>
            <div className='d-flex justify-content-between mb-3'>
              <span>Waist–Hip Ratio</span>
              <strong className='text-success'>0.89</strong>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HealthTrack;
