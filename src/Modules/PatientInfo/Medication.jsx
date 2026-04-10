import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import DataTable from "react-data-table-component";

const Medication = () => {
  const { id } = useOutletContext();
  const [data] = useState([
    {
      id: 1,
      name: "Metformin",
      dosage: "500 mg",
      type: "Tablet",
      status: "Active",
    },
    {
      id: 2,
      name: "Amlodipine",
      dosage: "10 mg",
      type: "Tablet",
      status: "Active",
    },
    {
      id: 3,
      name: "Metoprolol",
      dosage: "50 mg",
      type: "Tablet",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Insulin Glargine",
      dosage: "20 units",
      type: "Injection",
      status: "Active",
    },
    {
      id: 5,
      name: "Atorvastatin",
      dosage: "20 mg",
      type: "Tablet",
      status: "Discontinued",
    },
    {
      id: 6,
      name: "Levothyroxine",
      dosage: "75 mcg",
      type: "Tablet",
      status: "Active",
    },
    {
      id: 7,
      name: "Amoxicillin",
      dosage: "500 mg",
      type: "Capsule",
      status: "Completed",
    },
    {
      id: 8,
      name: "Paracetamol",
      dosage: "650 mg",
      type: "Tablet",
      status: "Active",
    },
  ]);

  const [loading] = useState(false);
  const [totalRows] = useState(2);
  const [perPage, setPerPage] = useState(8);

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
  console.log(id, "medication");
  return (
    <div className='mt-5'>
      <DataTable
        columns={columns}
        data={data}
        progressPending={loading}
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
