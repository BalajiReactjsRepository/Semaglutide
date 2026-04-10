import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import DataTable from "react-data-table-component";
import { apiCaller } from "../../api/apiCaller";
import api from "../../api/axiosConfig";
import Loader from "../../utils/Loader";
import { onErrorHandler } from "../../utils/ErrorHandler";
import { ENDPOINTS } from "../../api/endpoints";

const Medication = () => {
  const [medicationData, setMedicationData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows] = useState(2);
  const [perPage, setPerPage] = useState(8);

  const { id } = useOutletContext();

  useEffect(() => {
    if (!id) return;

    apiCaller({
      apiCall: () => api.get(ENDPOINTS.GET_PATIENT_MEDICATION(id)),

      onSuccess: (data) => {
        setMedicationData(data);
      },

      onError: (err) => {
        onErrorHandler(err);
      },

      setLoading,
    });
  }, [id]);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Dosage",
      selector: (row) => row.dosage,
    },
    {
      name: "Type",
      selector: (row) => row.type,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
  ];

  const customStyles = {
    table: {
      style: {
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        overflow: "hidden",
      },
    },
    headRow: {
      style: {
        backgroundColor: "#b7e0f7",
        fontWeight: "600",
        fontSize: "14px",
        minHeight: "40px",
      },
    },
    rows: {
      style: {
        minHeight: "36px",
        "&:hover": {
          backgroundColor: "#f9fafb",
          cursor: "pointer",
        },
      },
    },
    cells: {
      style: {
        fontSize: "14px",
      },
    },
  };

  return (
    <div className='mt-5'>
      <DataTable
        columns={columns}
        data={medicationData}
        progressPending={loading}
        progressComponent={<Loader />}
        pagination
        paginationServer={false}
        paginationTotalRows={totalRows}
        paginationPerPage={perPage}
        onChangePage={(page) => console.log("Page:", page)}
        onChangeRowsPerPage={(newPerPage) => setPerPage(newPerPage)}
        noDataComponent={<div>No Data Available</div>}
        fixedHeader
        customStyles={customStyles}
      />
    </div>
  );
};

export default Medication;
