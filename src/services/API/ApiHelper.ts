import { RecipePaginationFetchMethod } from "../../types/SwitchTypes";
import Api from "./Api";

export default abstract class ApiHelper {
  public static async fetchPaginatedRecipes(method: RecipePaginationFetchMethod, currentPage: number) {
    let data;
    switch (method) {
      case 'dashboard':
        data = await Api.paginatedRecipes(currentPage, 6)
        break
      case 'users':
        data = await Api.getUserRecipes(currentPage, 6)
        break
      case 'favorites':
        data = await Api.getUserFavoriteRecipes(currentPage, 6)
        break
    }
    const { allRecipes, totalPages } = data
    return { allRecipes, totalPages }
  }
  public static async fetchAllRecipes() {
    const { allRecipes, totalPages } = await Api.getAllRecipes()
    return { allRecipes, totalPages }
  }
}