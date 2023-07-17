import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { ChangeEvent, useEffect, useState } from 'react'
import useUser from '../../hook/useUser'
import Api from '../../services/API/Api'
import RecipeCard from './recipeCard/RecipeCard'
import { RecipePaginationFetchMethod } from '../../types/SwitchTypes'
import { Grid } from '@mui/material'
import Loadagin from '../Loading'
import { destroyStorage } from '../../storage'
import { useNavigate } from 'react-router-dom'
import EmptyContentPage from '../EmptyContentPage'

export default function RecipePagination({ method }: { method: RecipePaginationFetchMethod }) {
  const { recipes, setRecipes, currentRecipesPage, setCurrentRecipesPage } = useUser()
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)

  const navigateTo = useNavigate()

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
        setLoading(false)
      } catch (error) {
        destroyStorage()
        navigateTo('/')
      }
    }
    fetchRecipes()
  }, [currentRecipesPage])

  return (
    <div>
      <Grid container spacing={0} justifyContent={'center'} gap={1} minHeight={'80vh'} margin={'auto'} style={{ width: '100%' }} >
        {recipes?.length ?
          recipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
          :
          loading ? <>
            < Loadagin />
            <Loadagin />
            <Loadagin />
            <Loadagin />
            <Loadagin />
            <Loadagin />
          </> : <EmptyContentPage />
        }
      </Grid >
      {totalPages > 1 &&
        <Stack spacing={2}>
          <Pagination count={totalPages} page={currentRecipesPage} sx={{ margin: 'auto' }}
            color="secondary" onChange={handlePageChange} />
        </Stack>
      }
    </div>

  );
}
