import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useUser from '../../hook/useUser';
import ApiHelper from '../../services/adonisjs/adonisjsHelper';
import { Recipe } from '../../@types/Recipes';
import { RecipePaginationFetchMethod } from '../../@types/SwitchTypes';
import { normalizeString } from '../../utils/formatUtils';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


export default function HeaderSearch() {
  const { setRecipes, currentRecipesPage, setCurrentRecipesPage } = useUser()
  const [allPagesRecipes, setAllPagesRecipes] = useState<Recipe[]>()
  const [refreshRecipes, setRefreshRecipes] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const navigateTo = useNavigate()
  const location = useLocation()


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    navigateTo('/dashboard/home')
    const searchString = e.target.value
    setInputValue(searchString)
    if (!searchString) {
      setRefreshRecipes(!refreshRecipes)
      return
    }

    const searchedRecipes = allPagesRecipes!.filter(recipe => {
      const normalizedInput = normalizeString(searchString)
      const normalizedTitle = normalizeString(recipe.title)
      if (normalizedTitle.indexOf(normalizedInput) !== -1) {
        return recipe
      }
    })
    setRecipes(searchedRecipes)
  }

  useEffect(() => {
    async function fetchRecipes(method: RecipePaginationFetchMethod, page: number) {
      const { allRecipes: allPaginatedRecipes } = await ApiHelper.fetchPaginatedRecipes(method, page)
      setRecipes(allPaginatedRecipes)
      if (method === 'dashboard') {
        const { allRecipes } = await ApiHelper.fetchAllRecipes()
        setAllPagesRecipes(allRecipes)
      }
    }

    if (location.pathname !== '/dashboard/home') {
      if (currentRecipesPage !== 1) {
        setCurrentRecipesPage(1)
        if (location.pathname === '/dashboard/minhas-receitas') {
          fetchRecipes('users', 1)
        } else {
          fetchRecipes('favorites', 1)
        }
      }
      setInputValue('')
    } else {
      fetchRecipes('dashboard', currentRecipesPage)
    }

  }, [refreshRecipes, location.pathname])
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Buscar…"
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleSearch}
        value={inputValue}
      />
    </Search>
  )
}
