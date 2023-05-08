import React, { useEffect, useState } from 'react'

type Props = {}

interface FoundUser {
  error?: string,
  user?: User
}

const Homepage = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<Users>([]);
  const [inputValue, setInputValue] = useState("");
  const [foundUser, setFoundUser] = useState<FoundUser | null>(null);

  const fetchAllUsers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}users/all`);
      const result = await response.json();
      console.log(result);
      setUsers(result);
    } catch (error) {
      console.log("error", error);
    }
  }

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(e.target.value);
  // }

  const handleSubmit = async() => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}users/email/${inputValue}`);
      const result = await response.json();
      console.log(result);
      setFoundUser(result);
      setLoading(false);
    } catch (error) {
      console.log(error)
      setFoundUser(null);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAllUsers();
    setLoading(false);
  }, [])

  const userCardStyle = { border: "solid 1px black", padding: "0.5em", marginBottom: "1em", width: "50%" }
  return (
    <div>
      { loading && <p>Loading...</p> }
      <h1>MERN App</h1>
      <h3>These are all the users in my Database:</h3>
      { users.map((user) => {
        return (
          <div key={user._id} style={userCardStyle}>
            <h3>{user.username}</h3>
            <p>{user.email}</p>
          </div>
        )
      }) }

      <h1>Find user by email:</h1>
      <input type='email' placeholder='Type email of a user to find' onChange={(e) => setInputValue(e.target.value)} />
      <button onClick={handleSubmit}>Find User</button>
      <h3>Result:</h3>
      { foundUser?.user &&
        <div style={userCardStyle}>
          <h3>{foundUser.user.username}</h3>
          <p>{foundUser.user.email}</p>
        </div>
      }
      { foundUser?.error &&
        <div style={userCardStyle}>
          <h3>{foundUser.error}</h3>
        </div>
      }
    </div>
  )
}

export default Homepage