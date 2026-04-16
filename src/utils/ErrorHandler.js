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

export const onErrorHandler = (error, navigate) => {
  const status = error?.response?.status;
  const authErrors = [401, 408, 440];

  if (authErrors.includes(status)) {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: error?.response?.data?.message || "Please login again",
    });

    localStorage.removeItem("doctorDetails");

    if (process.env.REACT_APP_SECRET_TOKEN) {
      Cookies.remove(process.env.REACT_APP_SECRET_TOKEN);
    }

    setTimeout(() => {
      navigate("/login");
    }, 1500);

    return;
  }

  // 🔥 Other errors (400, 404, 500, etc.)
  Swal.fire({
    icon: "error",
    title:
      status === 500
        ? "Server Error"
        : status === 404
          ? "Not Found"
          : status === 400
            ? "Bad Request"
            : "Error",

    text:
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong. Please try again.",
  });
};
