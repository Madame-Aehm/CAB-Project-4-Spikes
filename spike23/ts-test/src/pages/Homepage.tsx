import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'

type Props = {}

function Homepage({}: Props) {
  const { user, login } = useContext(AuthContext);
  console.log(user);
  return (
    <div>Homepage</div>
  )
}

export default Homepage