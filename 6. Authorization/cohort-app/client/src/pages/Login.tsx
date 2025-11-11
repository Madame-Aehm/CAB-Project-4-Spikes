import React, { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext';

type Props = {}

function Login({}: Props) {
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const [formInputs, setFormInputs] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    login(formInputs.email, formInputs.password);
    setLoading(false);
  }

  const formStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: "0.5em", alignItems: "flex-start" };

  return (
    <div>
      { loading && <p>Loading...</p> }
      <h1>Log in</h1>
      <form style={formStyle} onSubmit={handleSubmit}>
        <input name='email' type='email' placeholder='Enter your email address' onChange={handleChange} />
        <input name='password' type='password' placeholder='Enter a password' onChange={handleChange} />
        <button>Login</button>
      </form>
    </div>
  )
}

export default Login