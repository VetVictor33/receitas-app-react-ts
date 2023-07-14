import { useEffect, useRef, useState } from 'react'
import { Recipe } from '../types/Recipes'
import { User } from '../types/User'

export default function UserState() {
  const [recipe, setRecipe] = useState<Recipe[]>([])
  const [user, setUser] = useState<User | undefined>()

  return {
    recipe,
    setRecipe,
    user,
    setUser
  }
}
