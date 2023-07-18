import { getItem } from "../../storage";
import { IloginAttempt, IpaginatedResonse } from "../../@types/ApiReturn";
import { Comment } from "../../@types/Comments";
import { Recipe } from "../../@types/Recipes";
import { UserLogin, UserSignup } from "../../@types/User";
import axios from "../axios/axios";


export default abstract class AdonisjsApi {
    public static async signupAttempt(data: UserSignup): Promise<void> {
        await axios.post('/users/sign-up', { ...data })
    }

    public static async loginAttempt(dataInput: UserLogin) {
        const { data }: { data: IloginAttempt } = await axios.post('/users/login', { ...dataInput })
        return data
    }

    public static async logOut() {
        const headers = this.getHeaders(getItem('token')!)
        const response = await axios.post('/users/logout', undefined, { headers })
        console.log(response)
    }

    public static async getAllRecipes() {
        const headers = this.getHeaders(getItem('token')!)
        const { data }: { data: IpaginatedResonse } = await axios.get('/recipes', { headers })
        return data
    }

    public static async paginatedRecipes(pageNumber: number, recipePerPage: number) {
        const headers = this.getHeaders(getItem('token')!)
        const { data }: { data: IpaginatedResonse } = await axios.post('/paginate', { pageNumber, recipePerPage }, { headers })
        return data
    }

    public static async getUserRecipes(pageNumber: number, recipePerPage: number) {
        const headers = this.getHeaders(
            getItem('token')!)
        const { data }: { data: IpaginatedResonse } = await axios.post('/user-recipes', { pageNumber, recipePerPage }, { headers })
        return data
    }

    public static async getUserFavoriteRecipes(pageNumber: number, recipePerPage: number) {
        const headers = this.getHeaders(getItem('token')!)
        const { data }: { data: IpaginatedResonse } = await axios.post('/user-favorite-recipes', { pageNumber, recipePerPage }, { headers })
        return data
    }

    public static async createRecipe(formData: FormData) {
        const headers = this.getMultipartFormHeaders(getItem('token')!)
        const { data }: { data: Recipe } = await axios.post('/recipes', formData, { headers })
        return data
    }

    public static async updateRecipe(formData: FormData, recipeId: number) {
        const headers = this.getMultipartFormHeaders(getItem('token')!)
        const { data }: { data: Recipe } = await axios.put(`/recipes/${recipeId}`, formData, { headers })
        return data
    }

    public static async likeRecipe(id: number) {
        const headers = this.getHeaders(getItem('token')!)
        await axios.post(`/like/${id}`, undefined, { headers: headers })
    }

    public static async favoriteRecipe(id: number) {
        const headers = this.getHeaders(getItem('token')!)
        await axios.post(`/favorite/${id}`, undefined, { headers: headers })
    }

    public static async deleteRecipe(id: number) {
        const headers = this.getHeaders(getItem('token')!)
        await axios.delete(`/recipes/${id}`, { headers: headers })
    }

    public static async addComment(recipeId: Recipe['id'], content: string) {
        const headers = this.getHeaders(getItem('token')!)
        const { data }: { data: Comment } = await axios.post(`/comment/${recipeId}`, { content }, { headers })
        return data
    }

    public static async removeComment(recipeId: Recipe['id'],
        commentId: Recipe['metrics']['comments'][number]['id']) {
        const headers = this.getHeaders(getItem('token')!)
        await axios.delete(`/comment/${recipeId}/${commentId}`, { headers: headers })
    }

    private static getHeaders(token: string) {
        return { 'Authorization': `Bearer ${token}` }
    }

    private static getMultipartFormHeaders(token: string) {
        return { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }
    }

}