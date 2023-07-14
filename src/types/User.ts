export type User = {
  username: string,
  email: string,
}

export type UserSignup = User & {
  password: string
}

export type UserLogin = {
  email: string,
  password: string
}