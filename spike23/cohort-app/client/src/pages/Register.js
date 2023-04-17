import React, { useState } from 'react'

function Register() {
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    avatar: undefined
  })

  const handleChange = (e) => {
    e.target.name === "avatar" ? setForm({ ...form, [e.target.name]: e.target.files[0] })
     : setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(form);
    const formdata = new FormData();
    formdata.append("email", form.email);
    formdata.append("password", form.password);
    formdata.append("username", form.username);
    formdata.append("avatar", form.avatar);
    const requestOptions = {
      method: 'POST',
      body: formdata,
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
        <input type='file' name='avatar' accept=".jpg, .jpeg, .png" onChange={handleChange} />

        <button type='submit'>Register me!</button>
      </form>
    </div>
  )
}

export default Register