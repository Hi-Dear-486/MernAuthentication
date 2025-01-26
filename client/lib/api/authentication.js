import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const registraionAuth = async (
  data,
  setUserDetails,
  navigateTo,
  reset
) => {
  try {
    const formattedData = {
      ...data,
      phone: `+92${data.phone}`,
    };

    const response = await axios.post(
      "http://localhost:4000/api/user/register",
      formattedData,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );

    toast.success(response?.data?.message);
    setUserDetails(formattedData);
    navigateTo.push(`/otpverification`);
  } catch (error) {
    console.log("Error details:", error.toJSON());

    const errorMessage =
      error.response?.data?.message || "An error occurred. Please try again.";
    toast.error(errorMessage);
  } finally {
    reset();
  }
};

export const loginAuth = async (data, navigateTo, reset) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/user/login",
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    toast.success(response?.data?.message);
    navigateTo.push("/");
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "An error occurred. Please try again.";
    toast.error(errorMessage);
  } finally {
    reset();
  }
};

export const otpAuth = async (payload, setIsAuthenticated, setUser) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/user/otpverification",
      payload,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );

    toast.success(response.data.message);
    setIsAuthenticated(true);
    setUser(response.data.user);
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "Something went wrong. Please try again.";
    toast.error(errorMessage);
    setIsAuthenticated(false);
    setUser(null);
  }
};
