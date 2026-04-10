export const ENDPOINTS = {
  LOGIN: "/auth/login",
  GET_PATIENTS: "/patients",
  GET_PATIENT_DETAILS: (id) => `/patients/${id}`,
  GET_PATIENT_MEDICATION: (id) => `/patients/${id}`,
  GET_PATIENT_HEALTH_TRACK: (id) => `/patients/${id}`,
  GET_PATIENT_BLOOD_SUGAR: (id) => `/patients/${id}`,
};
