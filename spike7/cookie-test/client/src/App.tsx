import { useEffect, useState } from "react";
import ErrorModal from "./components/ErrorModal";
import Form from "./components/Form";
import axiosInstance from "./utils/axios";



interface User {
  email: string,
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const getActiveUser = async() => {
      try {
        const result = await axiosInstance.get("/active");
        const loggedIn = result.data as User;
        setUser(loggedIn);
        console.log("ACTIVE USER FOUND", loggedIn)
      } catch (e) {
        console.log("NO ACTIVE USER FOUND", e);
      }
      // try {
      //   const headers = new Headers();
      //   headers.append("Content-Type", "application/x-www-form-urlencoded");
      //   const options = {
      //     credentials: "include" as RequestCredentials,
      //     method: "GET"
      //   }
      //   const response = await fetch("http://localhost:5000/active", options);
      //   if (response.ok) {
      //     const result = await response.json() as User;
      //     setUser(result);
      //   }
      // } catch (e) {
      //   console.log(e)
      // }
    }
    getActiveUser().catch((e) => console.log(e));
  }, []);

  const login = async(email: string, password: string) => {
    console.log(email, password)
    try {
      const result = await axiosInstance.post("/login", { email, password });
      const loggedIn = result.data as User;
      setUser(loggedIn);
      console.log("USER LOGGED IN", loggedIn);
    } catch (e) {
      console.log("LOGIN ATTEMPT FAILED", e);
      setError("Login failed -  try again.");
    }
    // try {
    //   const headers = new Headers();
    //   headers.append("Content-Type", "application/x-www-form-urlencoded");
    //   headers.append("withCredentials", "true");
    //   const body = new URLSearchParams();
    //   body.append("email", email);
    //   body.append("password", password);
    //   const options = { method: "POST", headers, body };
    //   const response = await fetch("http://localhost:5000/login", options);
    //   if (response.ok) {
    //     const result = await response.json() as User;
    //     setUser(result);
    //   } else {
    //     const result = await response.json() as NotOk;
    //     setError(result.error);
    //   }
    // } catch (e) {
    //   console.log(e)
    // }
  }
  return (
    <>
      <h1>Cookie Parser Demo</h1>
      { error && <ErrorModal error={error} setError={setError} /> }
      <div className="container border">
        <div className="grid">
          <div className="line">
            <Form title="login" handleSubmit={login}/>
            <Form title="register" handleSubmit={login}/>
          </div>
          <div>
            { !user && <p>If you were logged in, you would see something here..</p> }
            { user && <div>
              <h3>Hi {user.email.split("@")[0]}!</h3>
              
            </div> }
          </div>
        </div>
      </div>
    </>
  )
}

export default App
