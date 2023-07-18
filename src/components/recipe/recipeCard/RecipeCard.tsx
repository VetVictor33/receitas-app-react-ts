import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { useState } from 'react';
import useUser from '../../../hook/useUser';
import Api from '../../../services/api/AdonisjsApi';
import { getItem } from '../../../storage';
import { Recipe } from '../../../types/Recipes';
import EditeDeleteRecipeMenu from './EditeDeleteRecipeMenu';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import RecipeDetailsDialog from '../RecipeDetailsDialog';
import { formatDate, getFirstLetter } from '../../../utils/formatUtils';

type metric = 'like' | 'favorite'

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const { recipes, setRecipes } = useUser()
  const [lockInteractions, setLockInteractions] = useState(false)
  const [openRecipeDetailsDialog, setOpenRecipeDetailsDialog] = useState(false);

  const handleClickOpenRecipeDetailsDialog = () => {
    setOpenRecipeDetailsDialog(true);
  };

  const handleCloseRecipeDetailsDialog = () => {
    setOpenRecipeDetailsDialog(false);
  };

  const usernameFirstLetter = getFirstLetter(recipe.userName)
  const date = formatDate(recipe.createdAt)


  const handleFavorite = async () => {
    if (lockInteractions) return
    setLockInteractions(true)
    try {
      await Api.favoriteRecipe(recipe.id)
      handleMetricChange('favorite')
    } catch (error) {
      console.log(error)
    } finally {
      setLockInteractions(false)
    }
  }

  const handleLike = async () => {
    if (lockInteractions) return
    setLockInteractions(true)
    try {
      await Api.likeRecipe(recipe.id)
      handleMetricChange('like')
    } catch (error) {
      console.log(error)
    } finally {
      setLockInteractions(false)
    }
  }

  const handleMetricChange = (metric: metric) => {
    const localRecipes: Recipe[] = [...recipes]
    localRecipes.forEach(item => {
      if (item.id === recipe.id) {
        if (metric === 'like') {
          if (recipe.metrics.liked) {
            recipe.metrics.liked = false
            recipe.metrics.likes.totalLikes--
          } else {
            recipe.metrics.liked = true
            recipe.metrics.likes.totalLikes++
          }
        } else if (metric === 'favorite') {
          if (recipe.metrics.favorited) {
            recipe.metrics.favorited = false
            recipe.metrics.favorites.totalFavorites--
          } else {
            recipe.metrics.favorited = true
            recipe.metrics.favorites.totalFavorites++
          }
        }
      }
    })

    setRecipes(localRecipes)
  }

  return (
    <Card sx={{ width: 345, height: 'fit-content' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label={recipe.category}>
            {usernameFirstLetter}
          </Avatar>
        }
        action={recipe.userName === getItem('username') ?
          <IconButton aria-label="settings">
            <EditeDeleteRecipeMenu recipe={recipe} />
          </IconButton>
          : ''
        }
        title={recipe.title}
        subheader={date}
      />
      <CardMedia
        component="img"
        height="194"
        width="354"
        src={`${import.meta.env.VITE_BASE_URL}${recipe.imageUrl}`}
        alt={recipe.title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          por: {recipe.userName}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites"
            onClick={handleFavorite}
          >
            <StarIcon sx={recipe.metrics.favorited ? { color: "#ffbe26", fontSize: '1.9rem' } : { color: '#000' }} />
            <Typography position={'absolute'} color={'white'} fontSize={'12px'}>
              {recipe.metrics.favorites.totalFavorites}
            </Typography>
          </IconButton>
          <IconButton aria-label="like"
            onClick={handleLike}
          >
            <FavoriteIcon sx={recipe.metrics.liked ? { color: "#ff0505", fontSize: '1.9rem' } : { color: '#000' }} />
            <Typography position={'absolute'} color={'white'} fontSize={'12px'}>
              {recipe.metrics.likes.totalLikes}
            </Typography>
          </IconButton>
        </CardActions>
        <IconButton
          onClick={handleClickOpenRecipeDetailsDialog}
        >
          <OpenInFullIcon />
        </IconButton>
      </CardActions>
      <RecipeDetailsDialog
        recipe={recipe}
        handleCloseRecipeDetailsDialog={handleCloseRecipeDetailsDialog}
        openRecipeDetailsDialog={openRecipeDetailsDialog}
        handleFavorite={handleFavorite}
        handleLike={handleLike} />
    </Card>
  );
}
