import { User } from "./User"

export interface IloginAttempt {
  token: {
    type: string,
    token: string,
    expires_at: Date
  },
  user: {
    username: User['username'],
    email: User['email']
  }
}