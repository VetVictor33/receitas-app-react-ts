import { Recipe } from "./Recipes"
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

export interface IpaginatedResponse {
  allRecipes: Recipe[]
  totalPages: number
}
export interface IErrors {
  response: {
    data: {
      errors: IErrorsMessage[],
      message: string
    }
  }
}

export interface IErrorsMessage {
  message: string
}