import React, { useEffect, useState } from 'react';

function App() {
  const [scouts, setScouts] = useState([]);
  useEffect(() => {
    const getScouts = async() => {
      try {
        const response = await fetch("http://localhost:5000/api/scouts/all");
        const result = await response.json();
        console.log(result);
        setScouts(result);
      } catch (e) {
        console.log(e)
      }
    }
    getScouts();
  }, [])
  
  return (
    <div>
      <h1>MERN</h1>
      { scouts.map((scout) => {
        return (
          <p key={scout._id}>{scout.firstName} {scout.lastName}</p>
        )
      }) }
    </div>
  );
}

export default App;
