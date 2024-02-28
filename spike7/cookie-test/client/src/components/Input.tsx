import React from 'react'

type Props = {
  title: string,
  type: string,
  state: string,
  setState: React.Dispatch<React.SetStateAction<string>>
}

const Input = ({ title, type, state, setState }: Props) => {
  return (
    <div className="inputGrid">
      <label htmlFor={type + title} className="gridItemRight">{type[0].toUpperCase() + type.slice(1)}</label>
      <input id={type + title} type={type} value={state} onChange={(e) => setState(e.target.value)}/>
    </div>
  )
}

export default Input