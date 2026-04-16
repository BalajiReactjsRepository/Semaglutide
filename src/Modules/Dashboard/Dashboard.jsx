import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import styles from "./Dashboard.module.css";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";
import { apiCaller } from "../../api/apiCaller";
import api from "../../api/axiosConfig";
import { ENDPOINTS } from "../../api/endpoints";
import moment from "moment";
import DatatableComponent from "../Components/DatatableComponent";
import { useStore } from "../../store/Context";
import { onErrorHandler } from "../../utils/ErrorHandler";
import { HiUserGroup } from "react-icons/hi2";

const Dashboard = () => {
  const [patientsData, setPatientsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [totalRecords, setTotalRecords] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();
  const { doctorDetails } = useStore();

  const fetchPatients = () => {
    apiCaller({
      apiCall: () =>
        api.get(ENDPOINTS.GET_PATIENTS, {
          params: { page, limit: perPage },
        }),
      onSuccess: (data) => {
        const { patients, meta } = data?.result;
        setPatientsData(patients ?? []);
        setTotalRecords(meta?.totalRecords ?? 0);
      },
      onError: (err) => onErrorHandler(err, navigate),
      setLoading,
    });
  };

  useEffect(() => {
    fetchPatients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, perPage]);

  const handleView = (id) => {
    navigate(`/patient-info/${id}`);
  };

  const columns = [
    {
      name: "S.No",
      selector: (row) => row.id,
      cell: (row, index) => (page - 1) * perPage + index + 1,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Age",

      selector: (row) => {
        if (!row.dob) return "-";

        const dob = moment(row.dob, "DD-MM-YYYY");

        if (!dob.isValid() || dob.isAfter(moment())) return "-";

        const now = moment();

        const years = now.diff(dob, "years");

        return years === 0
          ? `${now.diff(dob, "months")} months`
          : `${years} yrs`;
      },
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
    },
    {
      name: "Disease",
      selector: (row) => {
        if (!row.health_concern) return "-";
        return row.health_concern;
      },
    },
    {
      name: "Status",
      selector: (row) => {
        if (row.is_premium_member === 0) {
          return "Free Plan";
        } else {
          return "Premium";
        }
      },
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          onClick={() => row?.patient_id && handleView(row.patient_id)}
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

  const { doctor_name, category, mobile_number } = doctorDetails || {};

  return (
    <Container>
      <div className='mt-5'>
        <div className='d-flex gap-4'>
          <Card className='mb-4' style={{ width: "18rem" }}>
            <Card.Body className={styles.cardBody}>
              <Card.Title className='text-muted mb-3'>
                Patients Records
              </Card.Title>
              <Card.Subtitle className='mb-2 text-muted fs-4'>
                {totalRecords}
              </Card.Subtitle>
              <div className={styles.floatIcon}>
                <HiUserGroup size={20} style={{ color: "#1d4ed8" }} />
              </div>
            </Card.Body>
          </Card>

          <Card className='mb-4' style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title className='text-muted mb-3'>
                Dr. {doctor_name}
              </Card.Title>
              <Card.Text className='mb-0 text-muted'>
                {category || "NA"}
              </Card.Text>
              <Card.Text className='mb-2 text-muted'>
                {mobile_number || "NA"}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className={styles.tablemodule}>
          <DatatableComponent
            keyField='patient_id'
            columns={columns}
            data={patientsData}
            loading={loading}
            totalRows={totalRecords}
            perPage={perPage}
            onChangePage={(page) => setPage(page)}
            onChangeRowsPerPage={(newPerPage) => {
              setPerPage(newPerPage);
              setPage(1);
            }}
          />
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
