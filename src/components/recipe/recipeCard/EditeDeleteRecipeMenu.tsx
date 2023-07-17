import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Recipe } from '../../../types/Recipes';
import Api from '../../../services/API/Api';
import useUser from '../../../hook/useUser';
import RecipeModal from '../../header/RecipeModal';
import ConfirmationDialog from '../../ConfirmationDialog';


export default function EditeDeleteRecipeMenu({ recipe }: { recipe: Recipe }) {
  const { recipes, setRecipes } = useUser()
  const [modalOpen, setModalOpen] = useState(false);

  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

  const handleClickOpenConfirmationDialog = () => {
    setOpenConfirmationDialog(true);
    handleMenuClose()
  };

  const handleCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
  };

  const handleModalOpen = () => {
    setModalOpen(true)
    handleMenuClose()
  }
  const handleModalClose = () => setModalOpen(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    try {
      await Api.deleteRecipe(recipe.id)
      const localRecipes: Recipe[] = recipes.filter(item => item.id !== recipe.id)
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
        <MenuItem onClick={handleModalOpen}>Editar receita</MenuItem>
        <MenuItem onClick={handleClickOpenConfirmationDialog}>Apagar receita</MenuItem>
      </Menu>
      <RecipeModal
        incomeRecipe={recipe}
        handleModalClose={handleModalClose}
        modalOpen={modalOpen} />
      <ConfirmationDialog
        confirm={handleDelete}
        handleCloseConfirmationDialog={handleCloseConfirmationDialog}
        openConfirmationDialog={openConfirmationDialog} />
    </div>
  );
}
