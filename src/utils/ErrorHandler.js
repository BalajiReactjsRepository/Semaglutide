import Swal from "sweetalert2";
import Cookies from "js-cookie";
export const onLoading = () => Swal.showLoading();

export const onLoadingClose = () => Swal.close();
export const onSuccess = ({ message = "" }) => {
  return Swal.fire({
    icon: "success",
    title: message || "Your work has been saved",
    showConfirmButton: false,
    timer: 1500,
  });
};

export const onErrorHandler = (error) => {
  const status = error?.response?.status;
  const authErrors = [401, 408, 440];

  if (authErrors.includes(status)) {
    localStorage.removeItem("doctor-name");
    localStorage.removeItem("gender-value");
    localStorage.removeItem("submit-status");

    if (process.env.REACT_APP_TOKEN) {
      Cookies.remove(process.env.REACT_APP_TOKEN);
    }

    setTimeout(() => {
      window.location.replace("/login");
    }, 1000);

    return;
  }

  Swal.fire({
    icon: "error",
    title: "Oops...",
    text:
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong. Please try again.",
  });
};
