import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/x-www-form-urlencoded");
      const urlencoded = new URLSearchParams();
      urlencoded.append("email", form.email);
      urlencoded.append("password", form.password);
      const options = {
        method: 'POST',
        headers: headers,
        body: urlencoded
      };
      const response = await fetch("http://localhost:5000/api/user/login", options);
      const result = await response.json();
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));
      alert("token saved")
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <div>
    <h1>Log In</h1>
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "1em", padding: "1em" }}>
      <input type='email' name='email' placeholder='Enter your email' onChange={handleChange} />
      <input type='password' name='password' placeholder='Enter your password' onChange={handleChange} />

      <button type='submit'>Log me in!</button>
    </form>
    <p>Not registered? <Link to='/register'>Do it now!</Link></p>
  </div>
  )
}

export default Login