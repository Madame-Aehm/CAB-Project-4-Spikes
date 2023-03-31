import React, { useState } from 'react'

function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    titan: null,
    gender: null
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
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
      const response = await fetch("http://localhost:5000/api/scouts/new", requestOptions);
      const result = await response.json();
      alert("successfully registered!")
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input name='firstName' placeholder='Enter your first name' onChange={handleChange} />
        <input name='lastName' placeholder='Enter your last name' onChange={handleChange} />
        <select name='titan' onChange={handleChange}>
          <option>Shifter:</option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <select name='gender' onChange={handleChange}>
          <option>gender:</option>
          <option>male</option>
          <option>female</option>
          <option>other</option>
        </select>
        <button>Register me!</button>
      </form>
    </div>
  )
}

export default Register