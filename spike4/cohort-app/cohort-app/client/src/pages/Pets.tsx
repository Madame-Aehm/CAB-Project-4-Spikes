import React, { useEffect, useState } from 'react'

type Props = {}

const Pets = (props: Props) => {
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    (async() => {
      try {
        const response = await fetch("http://localhost:5000/api/pets/all");
        if (response.ok) {
          const result = await response.json() as Pet[];
          setPets(result);
          console.log(result);
        }
      } catch (e) {
        console.log(e);
      }
    }) ();
  }, [])
  return (
    <div>
      <h1>Pets</h1>
      { pets.map((p) => {
        return (
          <div key={ p._id } style={{ border: "solid 1px black", padding: "0 1em", width: "300px", marginBottom: "1em" }}>
            <h3>{ p.name } the { p.animal }</h3>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p><b>Desexed:</b> { p.desexed ? "yes" : "no" }</p>
              <p><b>Age:</b> { p.age } years</p>
            </div>
            <div>
              <p style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "1em"}}>
                Owned by: 
                <b>{ p.owner_info.username }</b>
                <img src={ p.owner_info.avatar } alt={ `${p.owner_info.username}'s avatar` } style={{ width: "50px", height: "50px", borderRadius: "50%" }}/>
              </p>
            </div>
          </div>
        )
      }) }
    </div>
  )
}

export default Pets