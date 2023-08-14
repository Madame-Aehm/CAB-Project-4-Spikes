import React, { ChangeEvent, FormEvent, useState } from 'react'

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<string>>,
  user: User,
  fetchAllUsers: () => Promise<void>
}

interface Form {
  email: string,
  username: string,
  avatar: undefined | File
}

function UpdateModel({ setOpen, user, fetchAllUsers }: Props) {
  const [form, setForm] = useState<Form>({
    email: "",
    username: "",
    avatar: undefined
  });
  const [validation, setValidation] = useState("");

  const handleUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    setValidation("");
    if (e.target.files) {
      setForm({ ...form, [e.target.id]: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.id]: e.target.value })
    }
  }

  const handleUpdateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.email.trim() && !form.username.trim() && !form.avatar) {
      setValidation("Please input data to update");
      return
    }
    const body = new FormData();
    for (const [key, value] of Object.entries(form)) {
      value && body.append(key, value);
      console.log(key, value);
    }
    const options = {
      method: "POST",
      body
    }
    try {
      const response = await fetch(`http://localhost:5000/api/users/update-both/${user._id}`, options);
      const result = await response.json();
      setForm({
        email: "",
        username: "",
        avatar: undefined
      })
      alert(result);
      fetchAllUsers();
      setOpen("");
    } catch (e) {
      console.log(e);
    }
  }

  const containerStyle: React.CSSProperties = { position: "fixed", top: "0px", left: "0px", height: "100vh", width: "100vw", backgroundColor: "rgba(0, 0, 0, 0.2", display: "flex", alignItems: "center", justifyContent: "center" };
  const modalBodyStyle: React.CSSProperties = { height: "50vh", width: "50vw", backgroundColor: "white", border: "solid 2px black", display: "flex", flexDirection: "column", alignItems: "center" };
  const xStyle: React.CSSProperties = { alignSelf: "flex-end", margin: "1em", padding: "0.2em 0.5em", border: "solid black 1px" };
  const formStyle: React.CSSProperties = { width: "90%", display: "flex", flexDirection: "column" , gap: "1em", alignItems: "center" };
  const inputStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr", width: "100%" };

  return (
    <div style={containerStyle}
      onClick={() => setOpen("")}>
      <div style={modalBodyStyle}
        onClick={(e) => e.stopPropagation()}>
          <span style={xStyle} className='pointer'
            onClick={() => setOpen("")}>X</span>
          <h2 style={{ marginTop: "0px" }}>Update User:</h2>
          <form style={formStyle} onSubmit={handleUpdateUser}>
            <div style={inputStyle}>
               <label htmlFor='username'>Username: </label>
               <input id='username' value={form.username} onChange={handleUpdate} />
            </div>
            <div style={inputStyle}>
               <label htmlFor='email'>Email: </label>
               <input id='email' value={form.email} onChange={handleUpdate} />
            </div>
            <div style={inputStyle}>
               <label htmlFor='avatar' >Avatar: </label>
               <input id='avatar' type='file' onChange={handleUpdate} />
            </div>
            { form.avatar && <img src={ URL.createObjectURL(form.avatar) } alt='Sample of new avatar to be uploaded.' style={{ width: "50px", height: "50px" }} />}
            <button type='submit'>Update!</button>
            { validation && 
              <div style={{ width: "60%", border: "solid 2px red", padding: "1em", color: "red", margin: "1em", textAlign: "center" }}>
                { validation }
              </div> 
            }
          </form>
      </div>
    </div>
  )
}

export default UpdateModel