import { useEffect, useRef, useState } from 'react'
import { Recipe } from '../types/Recipes'
import { User } from '../types/User'
import { useNavigate } from 'react-router-dom'

export default function UserState() {
  const navigateTo = useNavigate()

  const [recipe, setRecipe] = useState<Recipe[]>([])
  const [user, setUser] = useState<User | undefined>()

  return {
    navigateTo,
    recipe,
    setRecipe,
    user,
    setUser
  }
}
