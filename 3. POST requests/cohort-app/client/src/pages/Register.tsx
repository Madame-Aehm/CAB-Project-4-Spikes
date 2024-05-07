import React, { ChangeEvent, FormEvent, useState } from 'react'

type Props = {}

function Register({}: Props) {
  const [formInputs, setFormInputs] = useState({
    email: "",
    password: "",
    username: ""
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(formInputs);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const data = JSON.stringify(formInputs);
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: data
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}users/register`, requestOptions);
      // console.log("response", response);
      const result = await response.json();
      console.log("result", result);
      response.ok ? alert("successfully registered!") : alert(result.error)
    } catch (e) {
      alert("Catch error - check console.")
      console.log(e)
    }
  }

  const formStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: "0.5em", alignItems: "flex-start" };

  return (
    <div>
      <h1>Register</h1>
      <form style={formStyle} onSubmit={handleSubmit}>
        <input name='email' type='email' placeholder='Enter your email address' onChange={handleChange} />
        <input name='password' type='password' placeholder='Enter a password' onChange={handleChange} />
        <input name='username' placeholder='Enter your username' onChange={handleChange} />
        <button>Register me!</button>
      </form>
    </div>
  )
}

export default Register