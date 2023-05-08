import React, { createContext, useState, ReactNode } from "react";

interface AuthContextValue {
  user: boolean,
  login(email: string, password: string): void,
  logout(): void
}

// const initialAuth: AuthContextValue = {
//   user: false,
//   login: () => {
//     throw new Error('login not implemented.');
//   },
//   logout: () => {
//      throw new Error('logout not implemented');
//   }
// };

// export const AuthContext = createContext<AuthContextValue>(initialAuth);
export const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);
// export const AuthContext = createContext<AuthContextValue>(null!);
// https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(false);

  async function login(email: string, password: string) {
    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/x-www-form-urlencoded");
      const urlencoded = new URLSearchParams();
      urlencoded.append("email", email);
      urlencoded.append("password", password);
      const options: RequestInit = {
        method: "POST",
        headers,
        body: urlencoded,
      };
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}users/login`, options);
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        alert("Logged in!")
        setUser(true);
      } else {
        const result = await response.json();
        console.log(result);
        alert(result.error);
        setUser(false);
      }
    } catch (e) {
      console.log(e);
      alert("Error caught: check console");
      setUser(false);
    }
  };

  const logout = () => {
    setUser(false);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      { children }
    </AuthContext.Provider>
  );
};