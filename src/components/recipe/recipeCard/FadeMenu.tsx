import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Recipe } from '../../../types/Recipes';
import Api from '../../../services/API/api';
import useUser from '../../../hook/useUser';


export default function FadeMenu({recipeId}: {recipeId: Recipe['id']}) {
  const {recipes, setRecipes} = useUser()!
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    try {
      await Api.deleteRecipe(recipeId)
      const localRecipes: Recipe[] = recipes.filter(item => item.id !== recipeId)
      setRecipes(localRecipes)
    } catch (error) {
      console.log(error)
    } finally {
      handleClose()
    }
  }

  return (
    <div>
      <MoreVertIcon onClick={handleClick}/>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Editar receita</MenuItem>
        <MenuItem onClick={handleDelete}>Apagar receita</MenuItem>
      </Menu>
    </div>
  );
}
