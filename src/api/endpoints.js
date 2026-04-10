export const ENDPOINTS = {
  LOGIN: "/auth/login",
  GET_PATIENTS: "/patients",
  GET_PATIENT_DETAILS: (id) => `/patients/${id}`,
  REPORT_DATA: "/report/data",
};
