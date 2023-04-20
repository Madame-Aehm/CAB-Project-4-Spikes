import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  console.log("active user:", user);

  const checkForUser = () => {
    const token = localStorage.getItem("token");
    const tempUserData = localStorage.getItem("user");
    if (tempUserData && token) {
      const parsedUser = JSON.parse(tempUserData);
      setUser(parsedUser);
    }
  }

  const login = async(email, password) => {
    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/x-www-form-urlencoded");
      const urlencoded = new URLSearchParams();
      urlencoded.append("email", email);
      urlencoded.append("password", password);
      const options = {
        method: 'POST',
        headers: headers,
        body: urlencoded
      };
      const response = await fetch("http://localhost:5000/api/user/login", options);
      const result = await response.json();
      console.log(result);
      if (result.error) {
        alert(result.error)
        setUser(null);
      } else {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        alert("token saved");
        setUser(result.user);
      }
    } catch(e) {
      console.log(e)
      alert(e)
      setUser(false);
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  }

  useEffect(() => {
    checkForUser();
  }, [])

  return (
    <AuthContext.Provider value= {{ login, logout, user }}>
      { props.children }
    </AuthContext.Provider>
  )
}