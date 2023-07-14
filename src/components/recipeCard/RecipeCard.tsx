import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { Recipe } from '../../types/Recipes';
import formatDate from '../../utils/formatDate';
import FadeMenu from './FadeMenu';
import Api from '../../services/API/api';
import useUser from '../../hook/useUser';
import { getItem } from '../../storage';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

type metric = 'like' | 'favorite'

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeCard({recipe}:{recipe: Recipe}) {
  const [expandedDescription, setExpandedDescription] = useState(false)
  const {recipes, setRecipes} = useUser()!
  const [lockInteractions, setLockInteractions] = useState(false)
  const categoryFirstLetter = recipe.category.split('')[0]
  const date = formatDate(recipe.createdAt)

  const handleExpandDescriptionClick = () => {
    setExpandedDescription(!expandedDescription);
  };

  const handleFavorite = async () => {
      if(lockInteractions) return
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
    if(lockInteractions) return
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
    const localRecipes : Recipe[] =[...recipes]
    localRecipes.forEach(item => {
      if(item.id === recipe.id){
        if(metric === 'like') {
          if (recipe.metrics.liked) {
          recipe.metrics.liked = false
          recipe.metrics.likes.totalLikes--
      } else {
        recipe.metrics.liked = true
        recipe.metrics.likes.totalLikes++
      }
    } else if (metric === 'favorite'){
        if (recipe.metrics.favorited) {
          recipe.metrics.favorited = false
          recipe.metrics.favorites.totalFavorites--
        } else {
          recipe.metrics.favorited = true
          recipe.metrics.favorites.totalFavorites++
        }
      }
    }})
      
    setRecipes(localRecipes)
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label={recipe.category}>
            {categoryFirstLetter}
          </Avatar>
        }
        action={ recipe.userName === getItem('username') ?
          <IconButton aria-label="settings">
            <FadeMenu recipeId={recipe.id}/>
          </IconButton>
          : ''
        }
        title={recipe.title}
        subheader={date}
      />
      <CardMedia
        component="img"
        height="194"
        src={`${import.meta.env.VITE_BASE_URL}${recipe.imageUrl}`}
        alt={recipe.title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          por: {recipe.userName}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites"
          onClick={handleFavorite}
        >
          <StarIcon/> {recipe.metrics.favorites.totalFavorites}
        </IconButton>
        <IconButton aria-label="like"
          onClick={handleLike}
        >
          <FavoriteIcon/> {recipe.metrics.likes.totalLikes}
        </IconButton>
        <ExpandMore
          expand={expandedDescription}
          onClick={handleExpandDescriptionClick}
          aria-expanded={expandedDescription}
          aria-label="mostrar mais"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expandedDescription} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Descrição:</Typography>
          <Typography paragraph>
            {recipe.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
