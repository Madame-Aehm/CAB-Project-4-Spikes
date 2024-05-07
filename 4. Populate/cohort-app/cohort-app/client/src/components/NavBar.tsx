import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

type Props = {}

const NavBar = (props: Props) => {
  const { user, logout } = useContext(AuthContext);
  const spacing = {
    margin: "1em"
  }
  return (
    <nav>
    <Link to='/' style={spacing}>Home</Link>
    <Link to='/pets' style={spacing}>Pets</Link>
    { user ? <button onClick={logout}>Log out</button> : (
      <>
        <Link to='/register' style={spacing}>Register</Link>
        <Link to='/login' style={spacing}>Login</Link>
      </>
    ) }
  </nav>
  )
}

export default NavBar