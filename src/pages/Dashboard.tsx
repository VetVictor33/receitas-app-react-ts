import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import RecipeFromList from '../components/recipeCard/RecipeCard'
import useUser from '../hook/useUser'
import Api from '../services/API/api'
import RecipeForm from '../components/forms/recipeForm/UseFormControl'
import { destroyStorage } from '../storage'

export default function Dashboard() {
  const {recipes, setRecipes} = useUser()!
  const navigateTo = useNavigate()

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const data = await Api.getAllRecipes()
        setRecipes(data)
      } catch (error) {
        console.log(error)
        // destroyStorage()
      }
    }
    fetchRecipes()
  }, [])
  

  return (
    <main>
      <div>
          <RecipeForm/>
      </div>
      <div>
          {recipes.length?
            recipes.map(recipe => (
              <RecipeFromList key={recipe.id} recipe={recipe}/>
              ))
              :
              <p>Que pena! A comunidade ainda não compartilhou suas receitas. Que tal ser e primeire?</p> 
            }
      </div>
    </main>
  )
}
