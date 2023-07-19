import MenuIcon from '@mui/icons-material/Menu';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import RecipeModal from './RecipeModal';
import { favoritesDashboardPath, generalDashboardPath, usersDashboardPath } from '../../utils/pathnameUtils';


export default function HeaderMenuOptions() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => {
    setModalOpen(true)
    handleMenuClose()
  }
  const handleModalClose = () => setModalOpen(false);


  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        onClick={handleMenuClick}>
        <MenuIcon />
      </IconButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        TransitionComponent={Fade}
      >
        <NavLink to={generalDashboardPath} onClick={handleMenuClose}>
          <MenuItem>
            Dashboard
          </MenuItem>
        </NavLink>
        <NavLink to={usersDashboardPath} onClick={handleMenuClose}>
          <MenuItem>
            Minhas receitas
          </MenuItem>
        </NavLink>
        <NavLink to={favoritesDashboardPath} onClick={handleMenuClose}>
          <MenuItem>
            Receitas favoritas
          </MenuItem>
        </NavLink>
        <MenuItem onClick={handleModalOpen}>Publicar receita</MenuItem >
      </Menu>
      <RecipeModal
        handleModalClose={handleModalClose}
        modalOpen={modalOpen}
        incomeRecipe={undefined}
      />
    </div>
  );
}