import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import AdonisjsApi from '../../services/api/api';
import { destroyStorage, getItem } from '../../storage';
import IconButton from '@mui/material/IconButton';
import { Typography } from '@mui/material';
import ConfirmationDialog from '../ConfirmationDialog';
import useUser from '../../hook/useUser';


export default function HeaderMenuLogout() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigateTo = useNavigate()
  const [lockButton, setLockButton] = useState(false)
  const { setLogginOut } = useUser()

  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

  const handleClickOpenConfirmationDialog = () => {
    setOpenConfirmationDialog(true);
    setLogginOut(true)
    handleMenuClose()
  };

  const handleCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
  };

  const username = getItem('username')

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };


  const handleLogout = async () => {
    if (lockButton) return
    setLockButton(true)
    try {
      await AdonisjsApi.logOut()
    } catch (error) {
    } finally {
      destroyStorage()
      navigateTo('/')
      setLogginOut(false)
    }
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        onClick={handleClick} >
        <MoreIcon />
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
        <Typography align='center'>
          {username}
        </Typography>
        <IconButton
          onClick={handleClickOpenConfirmationDialog}>
          <MenuItem>Logout</MenuItem>
        </IconButton>
      </Menu>
      <ConfirmationDialog confirm={handleLogout} handleCloseConfirmationDialog={handleCloseConfirmationDialog} openConfirmationDialog={openConfirmationDialog} />
    </div>
  );
}