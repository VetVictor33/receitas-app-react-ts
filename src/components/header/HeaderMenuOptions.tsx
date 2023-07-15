import MenuIcon from '@mui/icons-material/Menu';
import Fade from '@mui/material/Fade';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import NewRecipeModal from './NewRecipeModal';

export default function HeaderMenuOptions() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigateTo = useNavigate()
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
      <MenuIcon onClick={handleMenuClick}/>
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
            <NavLink to={'/dashboard'} onClick={handleMenuClose}>
          <MenuItem>
              Dashboard
          </MenuItem>
            </NavLink>
            <NavLink to={'/dashboard/minhas-receitas'} onClick={handleMenuClose}>
          <MenuItem>
              Minhas receitas
          </MenuItem>
            </NavLink>
            <NavLink to={'/dashboard/receitas-favoritas'} onClick={handleMenuClose}>
          <MenuItem>
              Receitas favoritas
          </MenuItem>
            </NavLink>
          <MenuItem onClick={handleModalOpen}>Publicar receita</MenuItem >
      </Menu>
      <NewRecipeModal 
        handleModalClose={handleModalClose}
        modalOpen={modalOpen}
        />
    </div>
  );
}