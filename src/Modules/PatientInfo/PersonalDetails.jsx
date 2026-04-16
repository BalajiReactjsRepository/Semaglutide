import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import styles from "./PatientDetails.module.css";
import Card from "react-bootstrap/Card";
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
import { IoPersonSharp } from "react-icons/io5";
import { MdHistory } from "react-icons/md";
import moment from "moment";

const PersonalDetails = () => {
  const [patientData, setPatientData] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    apiCaller({
      apiCall: () =>
        api.post(ENDPOINTS.GET_PATIENT_DETAILS, {
          patientId: id,
        }),

      onSuccess: (data) => {
        const details = data?.result || {};
        setPatientData(details);
      },

      onError: (err) => {
        onErrorHandler(err, navigate);
      },

      setLoading,
    });
  }, [id, navigate]);

  if (loading && !patientData) {
    return (
      <div className='vh-100 d-flex align-items-center justify-content-center'>
        <Loader />
      </div>
    );
  }

  const ageCalculator = (dateOfBirth) => {
    if (!dateOfBirth) return "-";

    const dob = moment(dateOfBirth, "DD-MM-YYYY");

    if (!dob.isValid() || dob.isAfter(moment())) return "-";

    const years = moment().diff(dob, "years");

    return years === 0
      ? `${moment().diff(dob, "months")} months`
      : `${years} yrs`;
  };

  console.log(patientData);

  return (
    <div className='row'>
      <div className='col-sm-12'>
        <Card body className={`mt-4 ${styles.customCard}`}>
          <div className='d-flex'>
            <div
              className={`${styles.profileIconCont} d-flex justify-content-center align-items-center me-3`}
            >
              {patientData?.profileUrl ? (
                <img
                  src={patientData?.profileUrl}
                  className={styles.profileImg}
                  alt='profile-img'
                />
              ) : (
                <IoPersonSharp className={styles.profileIcon} />
              )}
            </div>
            <div>
              <h5 className='fw-bold d-flex align-items-baseline'>
                {patientData?.name}
              </h5>
              <p className='mb-1 text-muted'>
                <FaMobileScreen style={{ color: "#0c64c9" }} />{" "}
                {patientData?.phoneNumber}
              </p>
              <small className='text-secondary'>
                {patientData?.gender || "NA"} •{" "}
                {patientData?.dateOfBirth
                  ? ageCalculator(patientData?.dateOfBirth)
                  : "NA"}
              </small>
            </div>
          </div>
        </Card>
      </div>
      <div className='col-sm-7'>
        <Card body className={`mt-4 ${styles.customCard}`}>
          <div className='d-flex align-items-start me-2'>
            <div
              className={`${styles.IconCont} d-flex justify-content-center align-items-center me-3`}
            >
              <FaStethoscope />
            </div>
            <div>
              <h6 className='fw-bold d-flex align-items-baseline'>
                Health Concern
              </h6>
              <p className='mb-1 text-muted'>
                {patientData.healthConcern || "NA"}
              </p>
            </div>
          </div>
          <hr />
          <div className='d-flex align-items-start me-2'>
            <div
              className={`${styles.IconCont} d-flex justify-content-center align-items-center me-3`}
            >
              <MdHistory />
            </div>
            <div>
              <h6 className='fw-bold d-flex align-items-baseline'>
                Medical History
              </h6>
              <p className='mb-1 text-muted'>
                {patientData?.medicalHistory?.length
                  ? patientData.medicalHistory
                      .map((item) => `${item.name} (${item.year})`)
                      .join(", ")
                  : "-"}
              </p>
            </div>
          </div>
          <hr />
          <div className='d-flex align-items-start me-2'>
            <div
              className={`${styles.IconCont} d-flex justify-content-center align-items-center me-3`}
            >
              <FaBowlFood />
            </div>
            <div>
              <h6 className='fw-bold d-flex align-items-baseline'>
                Food Preferences
              </h6>
              <p className='mb-1 text-muted'>
                {patientData?.foodPreference || "NA"}
              </p>
            </div>
          </div>
        </Card>
      </div>
      <div className='col-sm-5'>
        <Card body className={`mt-4 ${styles.customCard}`}>
          <div className='d-flex align-items-start me-2'>
            <div
              className={`${styles.IconCont} d-flex justify-content-center align-items-center me-3`}
              style={{ backgroundColor: "#faefa0" }}
            >
              <IoIosWarning style={{ color: "#ff5200c7" }} />
            </div>
            <div>
              <h6 className='fw-bold d-flex align-items-baseline'>Allergies</h6>
              <p className='mb-1 text-muted'>
                {patientData?.allergies?.length
                  ? patientData.allergies.join(", ")
                  : "-"}
              </p>
            </div>
          </div>
          <hr />
          <div className='d-flex align-items-start me-2'>
            <div
              className={`${styles.IconCont} d-flex justify-content-center align-items-center me-3`}
            >
              <CgPill />
            </div>
            <div>
              <h6 className='fw-bold d-flex align-items-baseline'>
                Prescription
              </h6>
              <p className='mb-0 text-muted'>
                <PrescriptionModal patientId={patientData.patientId} />
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PersonalDetails;
