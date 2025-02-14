import axios from "axios";
import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    localStorage.removeItem("name");
  };

  // const forgetPassword (email) => {
  //   axios
  //     .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", { email })
  //     .then((res) => {
  //       console.log(res);
  //       toast.success("Password reset email sent");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       toast.error(error.response.data.message);
  //     });
  // };


  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
