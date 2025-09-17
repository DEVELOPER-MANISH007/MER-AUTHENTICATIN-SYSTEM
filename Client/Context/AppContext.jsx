/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  // Force correct URL - ignore any malformed env values
  const backendUrl = "http://localhost:5000";
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(false);
  const getAuthState = async () => {

try {
  const {data} = await axios.get(backendUrl + "/api/auth/is-auth", {
    withCredentials: true
  });
  if(data.success){
    setIsLoggedin(true);
    getUserData();
  }

} catch (error) {
  setIsLoggedin(false);
  setUserData(null);
  // Don't show error toast on page load if user is not authenticated
  if (error.response?.status !== 401) {
    toast.error(error.message);
  }
}

  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/data", {
        withCredentials: true
      });
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => { 
    getAuthState();
  }, []);


  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
