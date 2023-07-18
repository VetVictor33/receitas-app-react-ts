import { RecipePaginationFetchMethod } from "../../@types/SwitchTypes"
import { getAllRecipes, getUserFavoriteRecipes, getUserRecipes, paginatedRecipes } from "./requests";


export async function fetchPaginatedRecipes(method: RecipePaginationFetchMethod, currentPage: number) {
  let data;
  switch (method) {
    case 'dashboard':
      data = await paginatedRecipes(currentPage, 6)
      break
    case 'users':
      data = await getUserRecipes(currentPage, 6)
      break
    case 'favorites':
      data = await getUserFavoriteRecipes(currentPage, 6)
      break
  }
  const { allRecipes, totalPages } = data
  return { allRecipes, totalPages }
}
export async function fetchAllRecipes() {
  const { allRecipes, totalPages } = await getAllRecipes()
  return { allRecipes, totalPages }
}