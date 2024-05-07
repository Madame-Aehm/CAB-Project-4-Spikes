interface User {
  _id: string,
  email: string,
  username: string,
  avatar: string,
  pets: []
}

type Users = User[]