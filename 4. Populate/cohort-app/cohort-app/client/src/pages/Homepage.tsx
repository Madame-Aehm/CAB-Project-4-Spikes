import React, { useEffect, useState } from 'react'
import UpdateModel from '../components/UpdateModel';

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
  const [open, setOpen] = useState("");

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

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
 }, [open]);

  const userCardStyle = { border: "solid 1px black", padding: "0.5em", width: "50%", display: "flex", justifyContent: "space-between", marginBottom: "1em" }
  return (
    <div>
      { loading && <p>Loading...</p> }
      <h1>MERN App</h1>
      <h3>These are all the users in my Database:</h3>
      { users.map((user) => {
        return (
          <React.Fragment key={user._id}>
            <div style={userCardStyle} className='pointer' onClick={() => setOpen(user._id)}>
              <div>
                <h3>{user.username}</h3>
                <p>{user.email}</p>
              </div>
              <img src={user.avatar} alt={`${user.username}'s avatar`} style={{ height: "50px", width: "50px", borderRadius: "50%" }}/>
            </div>
            { open === user._id && <UpdateModel setOpen={setOpen} user={user} fetchAllUsers={fetchAllUsers} /> }
            {/* <form style={{ marginBottom: "1em" }} onSubmit={(e) => handleChangeUsername(e, user)}>
              <input placeholder='Enter new username' id='changeUsername'/>
            </form> */}
          </React.Fragment>
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