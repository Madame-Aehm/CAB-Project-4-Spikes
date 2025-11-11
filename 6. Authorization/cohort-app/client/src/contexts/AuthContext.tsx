import { createContext, useState, ReactNode, useEffect } from "react";
import { getToken } from "../utils/getToken";

interface AuthContextValue {
  user: User | null,
  login(email: string, password: string): void,
  logout(): void
}

interface LogInResponse {
  token: string,
  user: User,
  verified: boolean
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
  const [user, setUser] = useState<User | null>(null);

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
        const result: LogInResponse = await response.json();
        console.log(result);
        setUser(result.user);
        localStorage.setItem("token", result.token);
        alert(`${result.user.username} has logged in!`);
      } else {
        const { error } = await response.json() as NotOkResponse;
        console.log(error);
        alert(error);
        setUser(null);
      }
    } catch (e) {
      console.log(e);
      alert("Error caught: check console");
      setUser(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  }

  const checkForActiveUser = () => {
    const token = getToken();
    token && getActiveUser(token);
  }

  const getActiveUser = async(token: string) => {
    try {
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${token}`);
      const opt = {
        method: "GET",
        headers
      }
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}users/me`, opt);
      const result: User = await response.json();
      console.log("active user: ", result)
      setUser(result);
    } catch (error) {
      console.log(error);
      const { message } = error as Error;
      alert(message);
      setUser(null);
    }
  }

  useEffect(() => {
    checkForActiveUser();
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      { children }
    </AuthContext.Provider>
  );
};