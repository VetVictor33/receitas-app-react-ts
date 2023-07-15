import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { ChangeEvent, useEffect, useState } from 'react'
import useUser from '../../hook/useUser'
import Api from '../../services/API/api'
import RecipeCard from './recipeCard/RecipeCard'

type fetchMethod = 
  'dashboard' |
  'users' |
  'favorites'

export default function RecipePagination({method}:{method: fetchMethod}) {
  const {recipes, setRecipes} = useUser()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const handlePageChange = (e: ChangeEvent<HTMLInputElement>, value: number) => {
    if(value != currentPage) {
      setCurrentPage(value)
    }
  }
  useEffect(() => {
    async function fetchRecipes() {
      try {
        let data;
        switch (method) {
          case 'dashboard':
            data = await Api.paginatedRecipes(currentPage, 5)
            break
          case 'users':
            data = await Api.getUserRecipes(currentPage, 5) 
            break
          case 'favorites':
            data = await Api.getUserFavoriteRecipes(currentPage, 5)
            break
        }
        const {allRecipes, totalPages} = data
        setRecipes(allRecipes)
        setTotalPages(totalPages)
      } catch (error) {
        console.log(error)
        // destroyStorage()
      }
    }
    fetchRecipes()
  }, [currentPage])

  return (
    <div>
          {recipes?.length?
            recipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe}/>
              ))
              :
              ''
            }
          {totalPages > 1 && 
            <Stack spacing={2}>
              <Pagination count={totalPages} page={currentPage}
                color="secondary" onChange={handlePageChange}/>
            </Stack>}
      </div>
  )
}
