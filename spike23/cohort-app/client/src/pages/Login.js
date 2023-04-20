import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    login(form.email, form.password);
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