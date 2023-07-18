import { getItem } from "../../storage";
import { IloginAttempt, IpaginatedResonse } from "../../@types/ApiReturn";
import { Comment } from "../../@types/Comments";
import { Recipe } from "../../@types/Recipes";
import { UserLogin, UserSignup } from "../../@types/User";
import axios from "../axios/axios";

export async function signupAttempt(data: UserSignup): Promise<void> {
    await axios.post('/users/sign-up', { ...data })
}

export async function loginAttempt(dataInput: UserLogin) {
    const { data }: { data: IloginAttempt } = await axios.post('/users/login', { ...dataInput })
    return data
}

export async function logOut() {
    const headers = getHeaders(getItem('token')!)
    const response = await axios.post('/users/logout', undefined, { headers })
    console.log(response)
}

export async function getAllRecipes() {
    const headers = getHeaders(getItem('token')!)
    const { data }: { data: IpaginatedResonse } = await axios.get('/recipes', { headers })
    return data
}

export async function paginatedRecipes(pageNumber: number, recipePerPage: number) {
    const headers = getHeaders(getItem('token')!)
    const { data }: { data: IpaginatedResonse } = await axios.post('/paginate', { pageNumber, recipePerPage }, { headers })
    return data
}

export async function getUserRecipes(pageNumber: number, recipePerPage: number) {
    const headers = getHeaders(
        getItem('token')!)
    const { data }: { data: IpaginatedResonse } = await axios.post('/user-recipes', { pageNumber, recipePerPage }, { headers })
    return data
}

export async function getUserFavoriteRecipes(pageNumber: number, recipePerPage: number) {
    const headers = getHeaders(getItem('token')!)
    const { data }: { data: IpaginatedResonse } = await axios.post('/user-favorite-recipes', { pageNumber, recipePerPage }, { headers })
    return data
}

export async function createRecipe(formData: FormData) {
    const headers = getMultipartFormHeaders(getItem('token')!)
    const { data }: { data: Recipe } = await axios.post('/recipes', formData, { headers })
    return data
}

export async function updateRecipe(formData: FormData, recipeId: number) {
    const headers = getMultipartFormHeaders(getItem('token')!)
    const { data }: { data: Recipe } = await axios.put(`/recipes/${recipeId}`, formData, { headers })
    return data
}

export async function likeRecipe(id: number) {
    const headers = getHeaders(getItem('token')!)
    await axios.post(`/like/${id}`, undefined, { headers: headers })
}

export async function favoriteRecipe(id: number) {
    const headers = getHeaders(getItem('token')!)
    await axios.post(`/favorite/${id}`, undefined, { headers: headers })
}

export async function deleteRecipe(id: number) {
    const headers = getHeaders(getItem('token')!)
    await axios.delete(`/recipes/${id}`, { headers: headers })
}

export async function addComment(recipeId: Recipe['id'], content: string) {
    const headers = getHeaders(getItem('token')!)
    const { data }: { data: Comment } = await axios.post(`/comment/${recipeId}`, { content }, { headers })
    return data
}

export async function removeComment(recipeId: Recipe['id'],
    commentId: Recipe['metrics']['comments'][number]['id']) {
    const headers = getHeaders(getItem('token')!)
    await axios.delete(`/comment/${recipeId}/${commentId}`, { headers: headers })
}

function getHeaders(token: string) {
    return { 'Authorization': `Bearer ${token}` }
}

function getMultipartFormHeaders(token: string) {
    return { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }
}