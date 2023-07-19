import { useNavigate } from "react-router-dom"
import useUser from "../hook/useUser"
import { useEffect } from 'react'
import { generalDashboardPath } from "../utils/pathnameUtils"
import LoginForm from "../components/forms/LoginForm"
//@ts-ignore
import SignupForm from "../components/forms/SignupForm"

type formsType = 'login' | 'signUp'

export default function LoginSignUpPage({ form }: { form: formsType }) {
  const { isLogged } = useUser()

  const navigateTo = useNavigate()

  useEffect(() => {
    if (isLogged()) navigateTo(generalDashboardPath)
  })
  return form === 'login' ? <LoginForm /> : <SignupForm />
}
