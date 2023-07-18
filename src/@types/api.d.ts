import { IloginAttempt, IpaginatedResonse } from "./ApiReturn";
import { Comment } from "./Comments";
import { Recipe } from "./Recipes";
import { UserLogin, UserSignup } from "./User";

declare module "api" {
  export default abstract class AdonisjsApi {
    public static signupAttempt(data: UserSignup): Promise<void>
    public static loginAttempt(dataInput: UserLogin): Promise<IloginAttempt>
    public static logOut(): Promise<void>
    public static getAllRecipes(): Promise<IpaginatedResonse>
    public static paginatedRecipes(pageNumber: number, recipePerPage: number): Promise<IpaginatedResonse>
    public static getUserRecipes(pageNumber: number, recipePerPage: number): Promise<IpaginatedResonse>
    public static getUserFavoriteRecipes(pageNumber: number, recipePerPage: number): Promise<IpaginatedResonse>
    public static createRecipe(fromData: FormData): Promise<Recipe>
    public static updateRecipe(formData: FormData, recipeId: number): Promise<Recipe>
    public static likeRecipe(id: number): Promise<void>
    public static favoriteRecipe(id: number): Promise<void>
    public static deleteRecipe(id: number): Promise<void>
    public static addComment(recipeId: Recipe['id'], content: string): Promise<Comment>
    public static removeComment(recipeId: Recipe['id'],
      commentId: Recipe['metrics']['comments'][number]['id']): Promise<void>
  }
}
