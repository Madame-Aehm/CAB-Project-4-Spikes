import React from 'react'

type Props = {
  error: string,
  setError: React.Dispatch<React.SetStateAction<string>>
}

const ErrorModal = ({ error, setError }: Props) => {
  return (
    <div style={{ position: "absolute", top: "0", left: "0", zIndex: "3", width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.3)" }}>
      <div style={{ position: "absolute", left: "50%", top: "30%", transform: "translateY(-50%) translateX(-50%)", backgroundColor: "white", width: "300px", minHeight: "100px", borderRadius: "8px", border: "solid black 1px", display: "flex", flexDirection: "column" }}>
        <span className="pointer" style={{ marginLeft: "auto", padding: "0 0.5em" }} onClick={() => setError("")}>x</span>
        <h3>{ error }</h3>
      </div>
    </div>
  )
}

export default ErrorModal