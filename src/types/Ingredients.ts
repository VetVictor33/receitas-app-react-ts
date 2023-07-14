import { Recipe } from "./Recipes"

export type Ingredient = {
  id: number,
  name: string,
  recipeName: Recipe['title']
}
