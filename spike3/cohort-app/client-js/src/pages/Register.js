import React, { useState } from 'react'

function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    titan: "",
    gender: ""
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
    console.log(e.target.value)
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
      <form onSubmit={handleSubmit}>
        <input name='firstName' placeholder='Enter your first name' onChange={handleChange} />
        <input name='lastName' placeholder='Enter your last name' onChange={handleChange} />
        <select name='titan' onChange={handleChange}>
          <option hidden>Shifter:</option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <select name='gender' onChange={handleChange}>
          <option hidden>gender:</option>
          <option value={'male'}>male</option>
          <option value={'female'}>female</option>
          <option value={'other'}>other</option>
        </select>
        <button>Register me!</button>
      </form>
    </div>
  )
}

export default Register