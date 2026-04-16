import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { apiCaller } from "../../api/apiCaller";
import api from "../../api/axiosConfig";
import { onErrorHandler } from "../../utils/ErrorHandler";
import { ENDPOINTS } from "../../api/endpoints";
import { useStore } from "../../store/Context";
import AccordionComponent from "../Components/AccordionComponent";
import Loader from "../../utils/Loader";

const HealthTrack = () => {
  const [healthData, setHealthData] = useState([]);

  const [loading, setLoading] = useState(false);

  const { id } = useOutletContext();
  const { period } = useStore();
  const navigate = useNavigate();
  const fetchData = useCallback(() => {
    apiCaller({
      apiCall: () =>
        api.post(ENDPOINTS.GET_PATIENT_HEALTH_TRACK, {
          patientId: id,
          timePeriod: period,
        }),

      onSuccess: (data) => {
        const details = data?.result || {};
        setHealthData(details);
      },

      onError: (err) => {
        onErrorHandler(err, navigate);
      },

      setLoading,
    });
  }, [id, period, navigate]);

  useEffect(() => {
    if (id) fetchData();
  }, [fetchData, id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='container'>
          {healthData?.length > 0 ? (
            <AccordionComponent data={healthData} />
          ) : (
            "No data found"
          )}
        </div>
      )}
    </>
  );
};

export default HealthTrack;
