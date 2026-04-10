import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import styles from "./PatientDetails.module.css";
import Card from "react-bootstrap/Card";
import weight from "../../Assets/weight.png";
import height from "../../Assets/height.png";
import bmi from "../../Assets/bmi.png";
import waist from "../../Assets/waist.png";
import { apiCaller } from "../../api/apiCaller";
import api from "../../api/axiosConfig";
import Loader from "../../utils/Loader";
import { onErrorHandler } from "../../utils/ErrorHandler";
import { ENDPOINTS } from "../../api/endpoints";

const HealthTrack = () => {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(false);

  const { id } = useOutletContext();

  useEffect(() => {
    if (!id) return;

    apiCaller({
      apiCall: () => api.get(ENDPOINTS.GET_PATIENT_HEALTH_TRACK(id)),

      onSuccess: (data) => {
        setHealthData(data);
      },

      onError: (err) => {
        onErrorHandler(err);
      },

      setLoading,
    });
  }, [id]);

  if (loading && !healthData) {
    return (
      <div className='vh-100 d-flex align-items-center justify-content-center'>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <div className='row mt-5'>
        <div className='col-md-3'>
          <Card body className={styles.metricCard}>
            <h6 className='label'>
              <img src={height} className={styles.metricIcon} alt='' />
              Height
            </h6>
            <h5>{healthData?.height || "-"} cm</h5>
          </Card>
        </div>

        <div className='col-md-3'>
          <Card body className={styles.metricCard}>
            <h6 className='label'>
              <img src={weight} className={styles.metricIcon} alt='' />
              Weight
            </h6>
            <h5>{healthData?.weight || "-"} kg</h5>
          </Card>
        </div>

        <div className='col-md-3'>
          <Card body className={styles.metricCard}>
            <h6 className='label'>
              <img src={bmi} className={styles.metricIcon} alt='' />
              BMI
            </h6>
            <h5>{healthData?.bmi || "-"}</h5>
          </Card>
        </div>

        <div className='col-md-3'>
          <Card body className={styles.metricCard}>
            <h6 className='label'>
              <img src={waist} className={styles.metricIcon} alt='' />
              Waist-Hip Ratio
            </h6>
            <h5>{healthData?.waistHipRatio || "-"}</h5>
          </Card>
        </div>
      </div>

      <div className='row mt-3'>
        <div className='col-md-4'>
          <Card body className={styles.metricCard}>
            <h6 className='mb-3'>📏 Body Composition</h6>

            <div className='d-flex justify-content-between mb-2'>
              <span>Waist</span>
              <strong>{healthData?.waist || "-"} in</strong>
            </div>

            <div className='d-flex justify-content-between mb-2'>
              <span>Hip</span>
              <strong>{healthData?.hip || "-"} in</strong>
            </div>

            <div className='d-flex justify-content-between mb-3'>
              <span>Waist–Hip Ratio</span>
              <strong className='text-success'>
                {healthData?.waistHipRatio || "-"}
              </strong>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HealthTrack;
