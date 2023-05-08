import { useState } from 'react'
import { useGet } from '../hooks/useGet';

type Props = {}

interface FoundUser {
  user?: User
}

interface CatFactsArray {
  data: CatFactType[];
}

interface CatFactType {
  fact: string;
  length?: number;
}

const Homepage = (props: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [submitValue, setSubmitValue] = useState("");
  // const [loading, setLoading] = useState(true);
  // const [users, setUsers] = useState<Users>([]);
  // const [foundUser, setFoundUser] = useState<FoundUser | null>(null);

  // const fetchAllUsers = async () => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_BASE_URL}users/all`);
  //     const result = await response.json();
  //     console.log(result);
  //     setUsers(result);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // }
  
  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(e.target.value);
  // }

  // const handleSubmit = async() => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_BASE_URL}users/email/${inputValue}`);
  //     const result = await response.json();
  //     console.log(result);
  //     setFoundUser(result);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error)
  //     setFoundUser(null);
  //     setLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   fetchAllUsers();
  //   setLoading(false);
  // }, [])

  const { data: catFacts, isLoading: catFactsIsLoading, error: catFactsError } = useGet<CatFactsArray>("https://catfact.ninja/facts");
  const { data: catFact, isLoading: catFactLoading, error: catFactError } = useGet<CatFactType>("https://catfact.ninja/fact");
  const { data: users, isLoading: usersIsloading, error: usersError } = useGet<Users>(`${process.env.REACT_APP_BASE_URL}users/all`);
  const { data: foundUser, isLoading: foundIsLoading, error: foundError } = useGet<FoundUser>(`${process.env.REACT_APP_BASE_URL}users/email/${submitValue}`)

  const handleSubmit = () => {
    setSubmitValue(inputValue);
  }

  const userCardStyle = { border: "solid 1px black", padding: "0.5em", marginBottom: "1em", width: "50%" }
  return (
    <div>
      <h1>MERN App</h1>
      <h3>These are all the users in my Database:</h3>
      { usersIsloading && <p>Loading...</p> }
      { usersError && <p>{usersError}</p> }
      { users && users.map((user) => {
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
      <div style={userCardStyle}>
        { foundUser && 
          <>
            <p>{foundUser.user?.email}</p>
            <h3>{foundUser.user?.username}</h3> 
          </>
        }
        { foundError && <p>{foundError}</p> }
        { foundIsLoading && <p>Loading...</p> }
      </div>
      <h1>Cat Facts Fetch Hook Test</h1>
      { (catFactsIsLoading || catFactLoading) && <p>Loading...</p> }
      { (catFactsError || catFactError) && <p>{catFactsError || catFactError}</p> }
      <h2>Cat Fact Singular:</h2>
      { catFact && <p>{catFact.fact}</p> }
      <h2>Cat Facts Array:</h2>
      { catFacts && catFacts.data.map((c, i) => <p key={i}>{c.fact}</p>) }
    </div>
  )
}

export default Homepage