import { useNavigate } from "react-router-dom"
import Api from "../services/API/api"
import { destroyStorage, getItem } from "../storage"
import { useState } from "react"


export default function Header() {
  const navigateTo = useNavigate()
  const username = getItem('username')
  const [lockButton, setLockButton] = useState<boolean>(false)

  const logout = async () => {
    if(lockButton) return
    setLockButton(true)
    try {
      await Api.logOut()
    } catch (error) {
      destroyStorage()
    } finally {
      navigateTo('/')
    }
  }

  return (
    <header>
      Olá, {username}
      <div>
        <button
          onClick={logout}
        >Sair</button>
      </div>
      </header>
  )
}
