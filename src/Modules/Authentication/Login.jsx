import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import * as Yup from "yup";
import logo from "../../Assets/Logo.png";
import { apiCaller } from "../../api/apiCaller";
import api from "../../api/axiosConfig";
import { ENDPOINTS } from "../../api/endpoints";
import { onErrorHandler } from "../../utils/ErrorHandler";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useStore } from "../../store/Context";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setDoctorDetails } = useStore();

  const validationSchema = Yup.object({
    userId: Yup.string()
      .matches(/^\S*$/, "Spaces are not allowed")
      .required("User ID is required"),

    password: Yup.string()
      .matches(/^\S*$/, "Spaces are not allowed")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      userId: "",
      password: "",
    },
    validationSchema,

    onSubmit: (initialValues) => {
      apiCaller({
        apiCall: () => api.post(ENDPOINTS.LOGIN, initialValues),
        setLoading,
        onSuccess: (data) => {
          const token = data?.result?.accessToken;
          const { doctorDetails } = data?.result;
          if (token) {
            Cookies.set(process.env.REACT_APP_SECRET_TOKEN, token, {
              expires: 1,
            });
            localStorage.setItem(
              "doctorDetails",
              JSON.stringify(doctorDetails),
            );
            setDoctorDetails(doctorDetails);
          }
          if (data?.statusCode === 200) navigate("/doctor-dashboard");
        },
        onError: (err) => {
          console.log(err);
          onErrorHandler(err, navigate);
        },
      });
    },
  });

  return (
    <section className='d-flex justify-content-center align-items-center vh-100'>
      <div className='p-4 shadow rounded bg-white' style={{ width: "350px" }}>
        <h4 className='mb-3 text-center'>
          <img src={logo} alt='logo' />
        </h4>

        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className='mb-3'>
            <Form.Label>User Id</Form.Label>
            <Form.Control
              type='text'
              name='userId'
              placeholder='Enter User Id'
              value={formik.values.userId}
              onChange={(e) =>
                formik.setFieldValue(
                  "userId",
                  e.target.value.replace(/\s/g, ""),
                )
              }
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.userId && !!formik.errors.userId}
              maxLength={20}
            />
            <Form.Control.Feedback type='invalid'>
              {formik.errors.userId}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Password</Form.Label>

            <div className='position-relative'>
              <Form.Control
                type={showPassword ? "text" : "password"}
                name='password'
                placeholder='Enter Password'
                value={formik.values.password}
                onChange={(e) =>
                  formik.setFieldValue("password", e.target.value)
                }
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.password && !!formik.errors.password}
                maxLength={20}
              />

              <Button
                type='button'
                className='border-0 text-secondary fw-normal'
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  background: "transparent",
                  position: "absolute",
                  right: 0,
                  top: "3px",
                  fontSize: "12px",
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </Button>

              <Form.Control.Feedback type='invalid'>
                {formik.errors.password}
              </Form.Control.Feedback>
            </div>
          </Form.Group>

          <Button
            variant='primary'
            type='submit'
            className='w-100'
            disabled={!formik.isValid || !formik.dirty || loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Form>
      </div>
    </section>
  );
};

export default Login;
