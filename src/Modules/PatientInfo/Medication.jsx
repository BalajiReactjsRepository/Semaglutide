import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { apiCaller } from "../../api/apiCaller";
import api from "../../api/axiosConfig";
import { onErrorHandler } from "../../utils/ErrorHandler";
import DatatableComponent from "../Components/DatatableComponent";
import { ENDPOINTS } from "../../api/endpoints";
import { customStyles } from "../../utils/CustomStyle";

const Medication = () => {
  const [medicationData, setMedicationData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const { id } = useOutletContext();
  const navigate = useNavigate();

  const fetchData = useCallback(() => {
    if (!id) return;

    apiCaller({
      apiCall: () =>
        api.post(
          ENDPOINTS.GET_PATIENT_MEDICATION,
          { patientId: id },
          {
            params: {
              page,
              limit: perPage,
            },
          },
        ),

      onSuccess: (data) => {
        console.log(data);
        const { medications, meta } = data?.result || {};
        setMedicationData(medications ?? []);
        setTotalRecords(meta?.totalRecords ?? 0);
      },

      onError: (err) => {
        onErrorHandler(err, navigate);
      },

      setLoading,
    });
  }, [id, page, perPage, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const columns = [
    {
      name: "S.No",
      cell: (row, index) => (page - 1) * perPage + index + 1,
      width: "60px",
    },
    {
      name: "Name",
      selector: (row) => row.medication_name || "NA",
      width: "160px",
    },
    {
      name: "Dosage",
      selector: (row) => row.dosage_strength_mg || "NA",
    },
    {
      name: "Medication type",
      selector: (row) => row.medication_type || "NA",
      width: "180px",
    },
    {
      name: "Start date",
      selector: (row) => row.start_date || "NA",
      width: "140px",
    },
    {
      name: "Injection site",
      cell: (row) => (
        <span title={row.injection_site}>
          {row.injection_site
            ? row.injection_site.length > 10
              ? row.injection_site.substring(0, 10) + "..."
              : row.injection_site
            : "NA"}
        </span>
      ),
      width: "160px",
    },
    {
      name: "Frequency",
      selector: (row) => row.frequency_days || "NA",
      width: "160px",
    },
    {
      name: "Note",
      cell: (row) => (
        <span title={row.medication_note}>
          {row.medication_note
            ? row.medication_note.length > 10
              ? row.medication_note.substring(0, 10) + "..."
              : row.medication_note
            : "NA"}
        </span>
      ),
      width: "120px",
    },
    {
      name: "Purpose",
      cell: (row) => (
        <span title={row.purpose}>
          {row.purpose
            ? row.purpose.length > 10
              ? row.purpose.substring(0, 10) + "..."
              : row.purpose
            : "NA"}
        </span>
      ),
      width: "120px",
    },
    {
      name: "Pain level",
      selector: (row) => row.pain_level || "NA",
      width: "160px",
    },
  ];

  return (
    <div className='mt-4'>
      <DatatableComponent
        columns={columns}
        data={medicationData}
        loading={loading}
        customStyles={customStyles}
        innerTable={true}
        totalRows={totalRecords}
        perPage={perPage}
        onChangePage={(page) => setPage(page)}
        onChangeRowsPerPage={(newPerPage, page) => {
          setPerPage(newPerPage);
          setPage(1);
        }}
      />
    </div>
  );
};

export default Medication;
