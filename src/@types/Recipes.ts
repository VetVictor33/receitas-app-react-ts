import { Comment } from "./Comments";
import { Ingredient } from "./Ingredients";
import { User } from "./User";

type Likes = {
  totalLikes: number
}

type Favorites = {
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
    likes: Likes,
    favorites: Favorites,
    comments: Comment[],
    liked: boolean,
    favorited: boolean
  }
  createdAt: Date,
  updatedAt: Date
}

export interface newRecipeFromForm {
  categoryName: string,
  title: string,
  description: string,
  ingredients: string | string[],
  image: File
}