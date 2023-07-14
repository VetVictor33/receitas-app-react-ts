import { Comment } from "./Comments";
import { Ingredient } from "./Ingredients";
import { User } from "./User";

type likes = {
  totalLikes: number
}

type favorites = {
  totalFavorites: number
}

export type Recipe = {
  id: number,
  title: string,
  description: string,
  category: string,
  imageUrl: string,
  userName: User['username'],
  ingredients: Ingredient[],
  metrics: {
    likes: likes;
    favorites: favorites;
    comments: Comment[]
  }
  createdAt: Date,
  updatedAt: Date
}

export interface newRecipeFromForm {
  categoryName: string,
  title: string,
  description: string,
  ingredients: string,
  image: File
}