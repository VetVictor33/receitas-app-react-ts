import AddCommentIcon from '@mui/icons-material/AddComment';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import { Card, CardActions, CardContent, CardMedia, Grid } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, useState } from 'react';
import { Recipe } from '../../@types/Recipes';
import Comment from './comment/Comment';

import NewCommentDialog from './comment/NewCommentDialog';
import useUser from '../../hook/useUser';

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
  const { isLogged } = useUser()
  const [openNewCommentDialog, setOpenNewCommentDialog] = useState(false);

  const handleClickOpenNewCommentDialog = () => {
    if (!isLogged()) return
    setOpenNewCommentDialog(true);
  };

  const handleCloseNewCommentDialog = () => {
    setOpenNewCommentDialog(false);
  };
  const imageUrl = recipe.imageUrl

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
      <Grid container spacing={0} justifyContent={'center'}>
        <Card sx={{ width: '100%' }}>
          <CardMedia
            sx={{ height: 330, maxWidth: '450px', margin: 'auto' }}
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
                <StarIcon sx={recipe.metrics.favorited ? { color: "#ffbe26", fontSize: '2.5rem' } : { color: "#000", fontSize: '2rem' }} />
                <Typography position={'absolute'} color={'white'} fontSize={'1rem'}>
                  {recipe.metrics.favorites.totalFavorites}
                </Typography>
              </IconButton>
              <IconButton aria-label="like"
                onClick={handleLike}
              >
                <FavoriteIcon sx={recipe.metrics.liked ? { color: "#ff0505", fontSize: '2.5rem' } : { color: "#000", fontSize: '1.6rem' }} />
                <Typography position={'absolute'} color={'white'} fontSize={'1rem'}>
                  {recipe.metrics.likes.totalLikes}
                </Typography>
              </IconButton>
              <IconButton>
                <AddCommentIcon style={{ fontSize: '2rem' }}
                  onClick={handleClickOpenNewCommentDialog}
                />
              </IconButton>
            </CardActions>
          </CardContent>
        </Card>
        <Grid container spacing={0} justifyContent={'center'}>
          {recipe.metrics.comments.length > 0 &&
            recipe.metrics.comments.map(comment => (
              <Comment key={comment.id}
                recipeId={recipe.id} comment={comment} />
            ))
          }
        </Grid>
      </Grid>
      <NewCommentDialog
        handleCloseNewCommentDialog={handleCloseNewCommentDialog}
        openNewCommentDialog={openNewCommentDialog}
        recipeId={recipe.id}
      />
    </Dialog>
  );
}
