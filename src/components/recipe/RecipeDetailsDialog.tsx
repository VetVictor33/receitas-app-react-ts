import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import { Card, CardActions, CardContent, CardMedia } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { TransitionProps } from '@mui/material/transitions';
import { useState, forwardRef } from 'react';
import { Recipe } from '../../types/Recipes';
import { getUrl } from '../../utils/formatUtils';
import Comment from './comment/Comment';
import AddCommentIcon from '@mui/icons-material/AddComment';
import NewCommentDialog from './comment/NewCommentDialog';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function RecipeDetailsDialog({ recipe, handleCloseRecipeDetailsDialog, openRecipeDetailsDialog,
  handleFavorite, handleLike }: {
    recipe: Recipe, handleCloseRecipeDetailsDialog: () => void, openRecipeDetailsDialog: boolean
    handleFavorite: () => Promise<void>, handleLike: () => Promise<void>
  }) {
  const [openNewCommentDialog, setOpenNewCommentDialog] = useState(false);

  const handleClickOpenNewCommentDialog = () => {
    setOpenNewCommentDialog(true);
  };

  const handleCloseNewCommentDialog = () => {
    setOpenNewCommentDialog(false);
  };
  const imageUrl = getUrl(recipe.imageUrl)

  return (
    <Dialog
      fullScreen
      open={openRecipeDetailsDialog}
      onClose={handleCloseRecipeDetailsDialog}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {recipe.title}
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseRecipeDetailsDialog}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={imageUrl}
          title={recipe.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {recipe.userName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {recipe.ingredients.map(i => `${i.name} `)}
          </Typography>
          <Typography variant='body1' sx={{ mt: 2 }}>
            {recipe.description}
          </Typography>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites"
              onClick={handleFavorite}
            >
              <StarIcon /> {recipe.metrics.favorites.totalFavorites}
            </IconButton>
            <IconButton aria-label="like"
              onClick={handleLike}
            >
              <FavoriteIcon /> {recipe.metrics.likes.totalLikes}
            </IconButton>
            <IconButton>
              <AddCommentIcon
                onClick={handleClickOpenNewCommentDialog}
              />
            </IconButton>
          </CardActions>
          {recipe.metrics.comments.length > 0 &&
            recipe.metrics.comments.map(comment => (
              <Comment key={comment.id}
                recipeId={recipe.id} comment={comment} />
            ))
          }
        </CardContent>
      </Card>
      <NewCommentDialog
        handleCloseNewCommentDialog={handleCloseNewCommentDialog}
        openNewCommentDialog={openNewCommentDialog}
        recipeId={recipe.id}
      />
    </Dialog>
  );
}
