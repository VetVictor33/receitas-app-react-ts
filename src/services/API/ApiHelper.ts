import { RecipePaginationFetchMethod } from "../../types/SwitchTypes";
import AdonisjsApi from "./AdonisjsApi";

export default abstract class ApiHelper {
  public static async fetchPaginatedRecipes(method: RecipePaginationFetchMethod, currentPage: number) {
    let data;
    switch (method) {
      case 'dashboard':
        data = await AdonisjsApi.paginatedRecipes(currentPage, 6)
        break
      case 'users':
        data = await AdonisjsApi.getUserRecipes(currentPage, 6)
        break
      case 'favorites':
        data = await AdonisjsApi.getUserFavoriteRecipes(currentPage, 6)
        break
    }
    const { allRecipes, totalPages } = data
    return { allRecipes, totalPages }
  }
  public static async fetchAllRecipes() {
    const { allRecipes, totalPages } = await AdonisjsApi.getAllRecipes()
    return { allRecipes, totalPages }
  }
}