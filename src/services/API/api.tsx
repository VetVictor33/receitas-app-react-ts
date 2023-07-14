import axios from "../axios/axios";
import { UserLogin, UserSignup } from "../../types/User";
import { getItem } from "../../storage";
import { Recipe } from "../../types/Recipes";

type LoginReturn = {
    type: string,
    token: string,
    expires_at: Date
}

export default abstract class Api{
    private static token = getItem('token')!
    private static headers = {'Authorization': `Bearer ${this.token}`}

    public static async signupAttempt (data: UserSignup) {
        await axios.post('/users/sign-up', {...data})
    }

    public static async loginAttempt (data: UserLogin) {
        const {data: userData}:{data: LoginReturn} = await axios.post('/users/login', {...data})
        return userData
    }

    public static async getAllRecipes() {
        const {data} : {data : Recipe[]} = await axios.get('/recipes', { headers: this.headers})
        return data
    }

}