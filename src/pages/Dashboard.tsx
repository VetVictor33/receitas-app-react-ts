import {useState, useEffect} from 'react'
import { Recipe } from '../types/Recipes'
import Api from '../services/API/api'
import { destroyItem } from '../storage'
import RecipeFromList from '../components/RecipeFromList'

export default function Dashboard() {
  const [recipes, setRecipes] = useState<Recipe[] | undefined>(undefined)

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const data = await Api.getAllRecipes()
        setRecipes(data)
        console.log(data)
      } catch (error) {
        destroyItem('token')
      }
    }
    fetchRecipes()
  }, [])
  

  return (
    <main>
          {recipes?
            recipes.map(recipe => (
              <RecipeFromList key={recipe.id} recipe={recipe}/>
            ))
            :
            <p>Que pena! A comunidade ainda não compartilhou suas receitas. Que tal ser e primeire?</p> 
        }
    </main>
  )
}
