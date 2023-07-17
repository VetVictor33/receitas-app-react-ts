import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { ChangeEvent, useEffect, useState } from 'react'
import useUser from '../../hook/useUser'
import RecipeCard from './recipeCard/RecipeCard'
import { RecipePaginationFetchMethod } from '../../types/SwitchTypes'
import { Grid } from '@mui/material'
import Loadagin from '../Loading'
import { destroyStorage } from '../../storage'
import { useNavigate } from 'react-router-dom'
import EmptyContentPage from '../EmptyContentPage'
import ApiHelper from '../../services/API/ApiHelper'

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
            data = await ApiHelper.fetchPaginatedRecipes('dashboard', currentRecipesPage)
            break
          case 'users':
            data = await ApiHelper.fetchPaginatedRecipes('users', currentRecipesPage)
            break
          case 'favorites':
            data = await ApiHelper.fetchPaginatedRecipes('favorites', currentRecipesPage)
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
