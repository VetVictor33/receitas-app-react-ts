import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import RecipeFromList from '../components/RecipeFromList'
import useUser from '../hook/useUser'
import Api from '../services/API/api'
import { destroyItem } from '../storage'
import RecipeForm from '../components/forms/reficeForms/UseFormControl'

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
        // destroyItem('token')
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
