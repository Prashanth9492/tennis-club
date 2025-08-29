import axios from "axios";
import { useAuth } from "@/components/AuthProvider";

export const useSecureApi = () => {
  const { user } = useAuth();

  // Get token from localStorage
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Secure GET request
  const get = async (url: string, config = {}) => {
    return axios.get(url, {
      ...config,
      headers: {
        ...(config.headers || {}),
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
  };

  // Secure POST request
  const post = async (url: string, data: any, config = {}) => {
    return axios.post(url, data, {
      ...config,
      headers: {
        ...(config.headers || {}),
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
  };

  // Secure PUT request
  const put = async (url: string, data: any, config = {}) => {
    return axios.put(url, data, {
      ...config,
      headers: {
        ...(config.headers || {}),
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
  };

  // Secure DELETE request
  const del = async (url: string, config = {}) => {
    return axios.delete(url, {
      ...config,
      headers: {
        ...(config.headers || {}),
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
  };

  return { get, post, put, del };
};
