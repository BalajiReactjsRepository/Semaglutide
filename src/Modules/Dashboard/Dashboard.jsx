import React, { useState } from "react";
import DataTable from "react-data-table-component";
import Card from "react-bootstrap/Card";
import styles from "./Dashboard.module.css";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";
import { BsBagPlusFill } from "react-icons/bs";

const Dashboard = () => {
  const [data] = useState([
    {
      id: 1,
      name: "John Doe",
      age: 30,
      gender: "Male",
      disease: "Hypertension",
      status: "Active",
      last_visit: "2026-03-10",
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 28,
      gender: "Female",
      disease: "PCOS",
      status: "Under Treatment",
      last_visit: "2026-03-08",
    },
    {
      id: 3,
      name: "Rahul Sharma",
      age: 45,
      gender: "Male",
      disease: "Diabetes",
      status: "Critical",
      last_visit: "2026-03-12",
    },
    {
      id: 4,
      name: "Anjali Reddy",
      age: 35,
      gender: "Female",
      disease: "Thyroid Disorder",
      status: "Stable",
      last_visit: "2026-03-05",
    },
    {
      id: 5,
      name: "Vikram Patel",
      age: 50,
      gender: "Male",
      disease: "Cardiac Issues",
      status: "Under Observation",
      last_visit: "2026-03-11",
    },
    {
      id: 6,
      name: "Sneha Gupta",
      age: 26,
      gender: "Female",
      disease: "Anemia",
      status: "Recovered",
      last_visit: "2026-02-28",
    },
    {
      id: 7,
      name: "Arjun Verma",
      age: 40,
      gender: "Male",
      disease: "Asthma",
      status: "Active",
      last_visit: "2026-03-09",
    },
    {
      id: 8,
      name: "Pooja Nair",
      age: 32,
      gender: "Female",
      disease: "Migraine",
      status: "Stable",
      last_visit: "2026-03-07",
    },
    {
      id: 9,
      name: "Pooja Nair",
      age: 32,
      gender: "Female",
      disease: "Migraine",
      status: "Stable",
      last_visit: "2026-03-07",
    },
    {
      id: 10,
      name: "Pooja Nair",
      age: 32,
      gender: "Female",
      disease: "Migraine",
      status: "Stable",
      last_visit: "2026-03-07",
    },
    {
      id: 11,
      name: "Pooja Nair",
      age: 32,
      gender: "Female",
      disease: "Migraine",
      status: "Stable",
      last_visit: "2026-03-07",
    },
    {
      id: 12,
      name: "Pooja Nair",
      age: 32,
      gender: "Female",
      disease: "Migraine",
      status: "Stable",
      last_visit: "2026-03-07",
    },
    {
      id: 13,
      name: "Pooja Nair",
      age: 32,
      gender: "Female",
      disease: "Migraine",
      status: "Stable",
      last_visit: "2026-03-07",
    },
  ]);

  const [loading] = useState(false);
  const [totalRows] = useState(2);
  const [perPage, setPerPage] = useState(8);

  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/patient-info/${id}`);
  };

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
      name: "Age",
      selector: (row) => row.age,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
    },
    {
      name: "Disease",
      selector: (row) => row.disease,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          onClick={() => handleView(row.id)}
          style={{
            padding: "4px 10px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#2563eb",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          View
        </button>
      ),
    },
  ];

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#fff",
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
    <Container>
      <div className='mt-5'>
        <Card className='mb-4' style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title className='text-muted mb-3'>
              Patients Records
            </Card.Title>
            <Card.Subtitle className='mb-2 text-muted'>88</Card.Subtitle>
            <div className={styles.floatIcon}>
              <BsBagPlusFill size={20} style={{ color: "#1d4ed8" }} />
            </div>
          </Card.Body>
        </Card>
        <div className={styles.tablemodule}>
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
      </div>
    </Container>
  );
};

export default Dashboard;
