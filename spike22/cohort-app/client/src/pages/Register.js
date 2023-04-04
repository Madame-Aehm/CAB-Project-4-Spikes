import React, { useState } from 'react'

function Register() {
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    avatar: undefined
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(form);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const data = JSON.stringify(form);
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: data,
      redirect: 'follow'
    };
    try {
      const response = await fetch("http://localhost:5000/api/user/new", requestOptions);
      const result = await response.json();
      console.log(result);
      response.ok ? alert("successfully registered!") : alert(result.error)
    } catch (e) {
      alert("Catch error - check console.")
      console.log(e)
    }
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "1em", padding: "1em" }}>
        <input type='email' name='email' placeholder='Enter your email' onChange={handleChange} />
        <input type='text' name='username' placeholder='Enter your username' onChange={handleChange} />
        <input type='password' name='password' placeholder='Enter your password' onChange={handleChange} />

        <button>Register me!</button>
      </form>
    </div>
  )
}

export default Register