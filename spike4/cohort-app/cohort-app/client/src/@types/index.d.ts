interface Pet {
  _id: string,
  name: string,
  animal: string,
  desexed: boolean,
  age: number,
  owner_info: {
    _id: string,
    avatar: string,
    username: string
  }
}

interface User {
  _id: string,
  email: string,
  username: string,
  avatar: string,
  pets: []
}

type Users = User[]