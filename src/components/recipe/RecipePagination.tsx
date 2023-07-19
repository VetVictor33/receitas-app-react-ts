import { Grid } from '@mui/material'
import Alert from '@mui/material/Alert'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RecipePaginationFetchMethod } from '../../@types/SwitchTypes'
import useUser from '../../hook/useUser'
import ApiHelper from '../../services/adonisjs/adonisjsHelper'
import { destroyStorage } from '../../storage'
import { notLoggedDashboardPath } from '../../utils/pathnameUtils'
import EmptyContentPage from '../EmptyContentPage'
import Loading from '../Loading'
import RecipeCard from './recipeCard/RecipeCard'
import Typography from '@mui/material/Typography';



export default function RecipePagination({ method }: { method: RecipePaginationFetchMethod }) {
  const { recipes, setRecipes, currentRecipesPage, setCurrentRecipesPage } = useUser()
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [hibernating, setHibernating] = useState(false)
  const navigateTo = useNavigate()

  function serverHibernatingTimeoutCallback() {
    setHibernating(true)
  }

  //@ts-ignore
  const handlePageChange = (e: ChangeEvent<HTMLInputElement>, value: number) => {
    if (value != currentRecipesPage) {
      setCurrentRecipesPage(value)
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
  }
  useEffect(() => {
    async function fetchRecipes() {
      try {
        const hibernatingTimeout = setTimeout(serverHibernatingTimeoutCallback, 10000)
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
          case 'notLogged':
            data = await ApiHelper.fetchPaginatedRecipes('notLogged', currentRecipesPage)
            break
        }
        if (data) clearTimeout(hibernatingTimeout)
        const { allRecipes, totalPages } = data
        setRecipes(allRecipes)
        setTotalPages(totalPages)
        setLoading(false)
      } catch (error) {
        destroyStorage()
        navigateTo(notLoggedDashboardPath)
      }
    }
    void fetchRecipes()
  }, [currentRecipesPage, method])

  return (
    <div>
      <Grid container spacing={0} justifyContent={'center'} gap={1} minHeight={'80vh'} margin={'auto'} style={{ width: '100%' }} >
        {recipes?.length ?
          recipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
          :
          loading ? <>
            {hibernating && <Alert severity={'warning'} sx={{ position: 'absolute' }}>
              <Typography variant='h5'>
                Servidor hibernando, por favor recarregue a página em alguns minutos
              </Typography>
            </Alert>}
            <Loading />
            <Loading />
            <Loading />
            <Loading />
            <Loading />
            <Loading />
          </> : <EmptyContentPage />
        }
      </Grid >
      {totalPages > 1 &&
        <Stack spacing={2} sx={{ margin: '20px 0' }}>
          <Pagination count={totalPages} page={currentRecipesPage} sx={{ margin: 'auto' }}
            //@ts-ignore
            color="secondary" onChange={handlePageChange} />
        </Stack>
      }
    </div>

  );
}
