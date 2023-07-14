import { Recipe } from "./Recipes"

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

export type UserContextType = {
  recipes: Recipe[]
  setRecipes: (recipes: Recipe[]) => void
  user: User | undefined
  setUser: (user: User) => void;
};