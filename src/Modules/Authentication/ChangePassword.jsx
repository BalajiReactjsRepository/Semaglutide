import React, { useState } from "react";
import styles from "./Login.module.css";
import lock from "../../Assets/lock.png";
import { onErrorHandler, onSuccess } from "../../utils/ErrorHandler";
import { ENDPOINTS } from "../../api/endpoints";
import { apiCaller } from "../../api/apiCaller";
import api from "../../api/axiosConfig";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const cancelChange = () => {
    setForm({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    navigate("/doctor-dashboard");
  };

  const handleSubmit = () => {
    const { oldPassword, newPassword, confirmPassword } = form;

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (oldPassword === newPassword) {
      setError("New password must be different from old password");
      return;
    }

    apiCaller({
      apiCall: () =>
        api.post(ENDPOINTS.GET_RESET_PASSWORD, {
          password: oldPassword,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        }),

      onSuccess: () => {
        setForm({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        onSuccess("Password changed successfully");
        navigate("/doctor-dashboard");
      },

      onError: (err) => {
        onErrorHandler(err, navigate);
      },
    });
  };

  return (
    <div className={styles.changePasswordCont}>
      <div className={styles.card}>
        <h2 className={styles.title}>
          <img src={lock} alt='lock' className={styles.lockImg} /> Change
          Password
        </h2>

        <div className={styles.inputGroup}>
          <label>Old Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name='oldPassword'
            value={form.oldPassword}
            onChange={handleChange}
            placeholder='Enter old password'
            maxLength={20}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>New Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name='newPassword'
            value={form.newPassword}
            onChange={handleChange}
            placeholder='Enter new password'
            maxLength={20}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Confirm Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name='confirmPassword'
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder='Confirm password'
            maxLength={20}
          />
          {error && <small className='text-danger'>{error}</small>}
        </div>

        <div className={styles.showPassword}>
          <input
            type='checkbox'
            onChange={() => setShowPassword(!showPassword)}
          />
          <span>Show Password</span>
        </div>

        <div className={styles.actions}>
          <button onClick={cancelChange} className={styles.cancel}>
            Cancel
          </button>
          <button className={styles.submit} onClick={handleSubmit}>
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
