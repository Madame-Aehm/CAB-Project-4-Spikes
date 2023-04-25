import React, { createContext, useState, ReactNode } from "react";

interface User {
  password: string,
  email: string,
  username: string,
}

interface AuthContextValue {
  user: User | null,
  login(email: string, password: string): Promise<void>,
}

// const initialAuth: AuthContextValue = {
//   user: null,
//   login: () => {
//     throw new Error('login not implemented.');
//   }
// };

// export const AuthContext = createContext<AuthContextValue>(initialAuth);
export const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);
// export const AuthContext = createContext<AuthContextValue>(null!);
// https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>({email: "test", password: "test", username: "test"});

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

      const response = await fetch(
        "http://localhost:5000/api/user/login",
        options
      );
      const result = await response.json();
      console.log(result);

      if (result.error) {
        alert(result.error);
        setUser(null);
      } else {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        alert("token saved");
        setUser(result.user);
      }
    } catch (e) {
      console.log(e);
      alert(e);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      { children }
    </AuthContext.Provider>
  );
};