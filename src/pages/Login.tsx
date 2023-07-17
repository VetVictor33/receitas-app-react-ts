import { useNavigate } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";
import { getItem } from "../storage";
import { useEffect } from "react";

export default function Login() {
  const token = getItem('token')
  const navigateTo = useNavigate()

  useEffect(() => {
    if (token) navigateTo('/dashboard/home')
  })
  return (
    <div>
      <LoginForm />
    </div>
  )
}