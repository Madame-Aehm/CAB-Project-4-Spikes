import { useState } from "react";
import Input from "./Input";

type Props = {
  title: string,
  handleSubmit: (email: string, password: string) => void
}

function Form({ title, handleSubmit }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form className="border" onSubmit={(e) => {
      e.preventDefault();
      handleSubmit(email, password);
    }}>
      <h3>{title}</h3>
      <Input title={title} type={"email"} state={email} setState={setEmail} />
      <Input title={title} type={"password"} state={password} setState={setPassword} />
      <button type="submit">{ title }</button>
    </form>
  )
}

export default Form