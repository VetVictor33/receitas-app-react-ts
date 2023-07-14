import axios from "../axios/axios";
import { UserLogin, UserSignup } from "../../types/User";
import { getItem } from "../../storage";
import { Recipe } from "../../types/Recipes";
import { IloginAttempt } from "../../types/ApiReturn";

export default abstract class Api{
    private static token = getItem('token')!
    private static headers = {'Authorization': `Bearer ${this.token}`}
    private static formdataHeaders = {'Content-Type': 'multipart/form-data', ...this.headers}

    public static async signupAttempt (data: UserSignup) {
        await axios.post('/users/sign-up', {...data})
    }

    public static async loginAttempt (dataInput: UserLogin) {
        const {data}:{data: IloginAttempt} = await axios.post('/users/login', {...dataInput})
        return data
    }

    public static async logOut() {
        const response = await axios.post('/users/logout', undefined, {headers: this.headers})
        console.log(response)
    }

    public static async getAllRecipes() {
        const {data} : {data : Recipe[]} = await axios.get('/recipes', { headers: this.headers})
        return data
    }

    public static async createRecipe(formData: FormData) {
        const {data} : {data: Recipe[]} = await axios.post('/recipes', formData, { headers: this.formdataHeaders})
        return data
    }

    public static async likeRecipe(id: number) {
        await axios.post(`/recipes/like/${id}`, undefined, { headers:this.headers })
    }

    public static async favoriteRecipe(id: number) {
        await axios.post(`/recipes/favorite/${id}`, undefined, { headers:this.headers })
    }

}