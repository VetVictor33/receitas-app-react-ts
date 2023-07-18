import MoreVertIcon from '@mui/icons-material/MoreVert';
import Fade from '@mui/material/Fade';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import useUser from '../../../hook/useUser';
import AdonisjsApi from '../../../services/adonisjs/adonisjs';
import { Recipe } from '../../../@types/Recipes';
import { Comment } from '../../../@types/Comments';
import ConfirmationDialog from '../../ConfirmationDialog';
import { IconButton } from '@mui/material';


export default function DeleteCommentMenu({ recipeId, commentId }: { recipeId: Recipe['id'], commentId: Comment['id'] }) {
  const { recipes, setRecipes } = useUser()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

  const handleClickOpenConfirmationDialog = () => {
    setOpenConfirmationDialog(true);
    handleMenuClose()
  };

  const handleCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
  };

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    try {
      await AdonisjsApi.removeComment(recipeId, commentId)
      const localRecipes: Recipe[] = [...recipes]
      recipes.forEach((recipe, recipeIndex) => {
        if (recipe.id === recipeId) {
          recipe.metrics.comments.forEach((comment, commentIndex) => {
            if (comment.id === commentId) {
              const thisRecipe: Recipe = localRecipes[recipeIndex]
              thisRecipe.metrics.comments.splice(commentIndex, 1)
            }
          })
        }
      })
      setRecipes(localRecipes)
    } catch (error) {
    } finally {
      handleMenuClose()
    }
  }

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClickOpenConfirmationDialog}>Apagar comentário</MenuItem>
      </Menu>
      <ConfirmationDialog
        openConfirmationDialog={openConfirmationDialog}
        handleCloseConfirmationDialog={handleCloseConfirmationDialog}
        confirm={handleDelete}
      />
    </div>
  );
}
