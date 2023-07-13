import axios from "../axios/axios";
import { UserLogin, UserSignup } from "../../types/User";

type LoginReturn = {
    type: string,
    token: string,
    expires_at: Date
}

export async function signupAttempt (data: UserSignup) {
    await axios.post('/users/sign-up', {...data})
}

export async function loginAttempt (data: UserLogin) {
    const {data: userData}:{data: LoginReturn} = await axios.post('/users/login', {...data})
    return userData
}