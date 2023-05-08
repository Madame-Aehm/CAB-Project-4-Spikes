import React, { ChangeEvent, FormEvent, useState } from 'react'

type Props = {}

type Avatar = File | string

function Register({}: Props) {
  const [loading, setLoading] = useState(false);
  const [formInputs, setFormInputs] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [fileInput, setFileInput] = useState<Avatar>("")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // console.log(formInputs);
    const myHeaders = new Headers();
    const formdata = new FormData();
    formdata.append("email", formInputs.email);
    formdata.append("password", formInputs.password);
    formdata.append("username", formInputs.username);
    formdata.append("avatar", fileInput);
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}users/register`, requestOptions);
      // console.log("response", response);
      const result = await response.json();
      console.log("result", result);
      response.ok ? alert("successfully registered!") : alert(result.error)
      setLoading(false);
    } catch (e) {
      alert("Catch error - check console.")
      console.log(e)
      setLoading(false);
    }
  }

  const formStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: "0.5em", alignItems: "flex-start" };

  return (
    <div>
      { loading && <p>Loading...</p> }
      <h1>Register</h1>
      <form style={formStyle} onSubmit={handleSubmit}>
        <input name='email' type='email' placeholder='Enter your email address' onChange={handleChange} />
        <input name='password' type='password' placeholder='Enter a password' onChange={handleChange} />
        <input name='username' placeholder='Enter your username' onChange={handleChange} />
        <input name='avatar' type='file' onChange={(e) => {
          e.target.files ? setFileInput(e.target.files[0]) : setFileInput("");
        }} />
        <button>Register me!</button>
      </form>
    </div>
  )
}

export default Register