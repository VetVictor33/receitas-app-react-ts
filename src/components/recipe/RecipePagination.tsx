import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { ChangeEvent, useEffect, useState } from 'react'
import useUser from '../../hook/useUser'
import Api from '../../services/API/Api'
import RecipeCard from './recipeCard/RecipeCard'
import { RecipePaginationFetchMethod } from '../../types/SwitchTypes'

export default function RecipePagination({ method }: { method: RecipePaginationFetchMethod }) {
  const { recipes, setRecipes, currentRecipesPage, setCurrentRecipesPage } = useUser()
  const [totalPages, setTotalPages] = useState(0)

  const handlePageChange = (e: ChangeEvent<HTMLInputElement>, value: number) => {
    if (value != currentRecipesPage) {
      setCurrentRecipesPage(value)
    }
  }
  useEffect(() => {
    async function fetchRecipes() {
      try {
        let data;
        switch (method) {
          case 'dashboard':
            data = await Api.paginatedRecipes(currentRecipesPage, 5)
            break
          case 'users':
            data = await Api.getUserRecipes(currentRecipesPage, 5)
            break
          case 'favorites':
            data = await Api.getUserFavoriteRecipes(currentRecipesPage, 5)
            break
        }
        const { allRecipes, totalPages } = data
        setRecipes(allRecipes)
        setTotalPages(totalPages)
      } catch (error) {
        console.log(error)
        // destroyStorage()
      }
    }
    fetchRecipes()
  }, [currentRecipesPage])

  return (
    <div>
      {recipes?.length ?
        recipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))
        :
        ''
      }
      {totalPages > 1 &&
        <Stack spacing={2}>
          <Pagination count={totalPages} page={currentRecipesPage}
            color="secondary" onChange={handlePageChange} />
        </Stack>}
    </div>
  )
}
