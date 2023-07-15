import MoreVertIcon from '@mui/icons-material/MoreVert';
import Fade from '@mui/material/Fade';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import useUser from '../../../hook/useUser';
import Api from '../../../services/API/api';
import { Recipe } from '../../../types/Recipes';
import { Comment } from '../../../types/Comments';
import DeleteConfirmationDialog from '../../DeleteConfirmationDialog';


export default function DeleteCommentMenu({ recipeId, commentId }: { recipeId: Recipe['id'], commentId: Comment['id'] }) {
  const { recipes, setRecipes } = useUser()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] = useState(false);

  const handleClickOpenDeleteConfirmationDialog = () => {
    setOpenDeleteConfirmationDialog(true);
    handleMenuClose()
  };

  const handleCloseDeleteConfirmationDialog = () => {
    setOpenDeleteConfirmationDialog(false);
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
      await Api.removeComment(recipeId, commentId)
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
      console.log(error)
    } finally {
      handleMenuClose()
    }
  }

  return (
    <div>
      <MoreVertIcon onClick={handleClick} />
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
        <MenuItem onClick={handleClickOpenDeleteConfirmationDialog}>Apagar comentário</MenuItem>
      </Menu>
      <DeleteConfirmationDialog
        openDeleteConfirmationDialog={openDeleteConfirmationDialog}
        handleCloseDeleteConfirmationDialog={handleCloseDeleteConfirmationDialog}
        confirmDelete={handleDelete}
      />
    </div>
  );
}
