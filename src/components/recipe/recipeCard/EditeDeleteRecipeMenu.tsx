import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Recipe } from '../../../@types/Recipes';
import AdonisjsApi from '../../../services/adonisjs/adonisjs';
import useUser from '../../../hook/useUser';
import RecipeModal from '../../header/RecipeModal';
import ConfirmationDialog from '../../ConfirmationDialog';
import IconButton from '@mui/material/IconButton';



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
      await AdonisjsApi.deleteRecipe(recipe.id)
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
      <IconButton
        onClick={handleClick} >
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
