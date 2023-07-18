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
  userRecipes: Recipe[]
  setUserRecipes: (recipes: Recipe[]) => void
  favoriteRecipes: Recipe[]
  setFavoriteRecipes: (recipes: Recipe[]) => void
  user: User | undefined
  setUser: (user: User) => void
  currentRecipesPage: number
  setCurrentRecipesPage: (page: number) => void
  mediaQueryBreakPoint: number
  setMediaQueriBreakPoint: (page: number) => void
  logginOut: boolean
  setLogginOut: (boolean: boolean) => void
}