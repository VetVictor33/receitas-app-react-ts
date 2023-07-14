import { useNavigate } from "react-router-dom"
import SignupForm from "../components/forms/SignupForm"
import { getItem } from "../storage"
import { useEffect } from "react"

function Signup() {
  const token = getItem('token')
  const navigateTo = useNavigate()

  useEffect(() => {
    if(token) navigateTo('/dashboard')})
    
  return (
    <div>        
      <SignupForm/>
    </div>
  )
}

export default Signup