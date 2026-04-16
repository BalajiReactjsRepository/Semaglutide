import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { apiCaller } from "../../api/apiCaller";
import api from "../../api/axiosConfig";
import { onErrorHandler } from "../../utils/ErrorHandler";
import { ENDPOINTS } from "../../api/endpoints";
import { useStore } from "../../store/Context";
import AccordionComponentTwo from "../Components/AccordionComponentTwo";
import Loader from "../../utils/Loader";
const BloodSugar = () => {
  const [bloodSugarData, setBloodSugarData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useOutletContext();
  const { period } = useStore();

  const navigate = useNavigate();

  const fetchData = useCallback(() => {
    if (!id) return;
    apiCaller({
      apiCall: () =>
        api.post(ENDPOINTS.GET_PATIENT_BLOOD_SUGAR, {
          patientId: id,
          timePeriod: period,
        }),

      onSuccess: (data) => {
        setBloodSugarData(data?.result || []);
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
        <div className='mt-5 text-center'>
          {bloodSugarData?.length > 0 ? (
            <AccordionComponentTwo data={bloodSugarData} />
          ) : (
            "No data found"
          )}
        </div>
      )}
    </>
  );
};

export default BloodSugar;
