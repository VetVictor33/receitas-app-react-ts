import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import Api from '../../services/API/Api';
import { destroyStorage, getItem } from '../../storage';
import IconButton from '@mui/material/IconButton';
import { Typography } from '@mui/material';


export default function HeaderMenuLogout() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigateTo = useNavigate()
  const [lockButton, setLockButton] = useState<boolean>(false)

  const username = getItem('username')

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };


  const handleLogout = async () => {
    if (lockButton) return
    setLockButton(true)
    try {
      await Api.logOut()
    } catch (error) {
      destroyStorage()
    } finally {
      navigateTo('/')
    }
  }

  const handleClose = () => {
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
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <Typography align='center'>
          {username}
        </Typography>
        <IconButton
          onClick={handleLogout}>
          <MenuItem>Logout</MenuItem>
        </IconButton>
      </Menu>
    </div>
  );
}