import {useState} from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import Api from '../../services/API/api';
import { destroyStorage } from '../../storage';

export default function HeaderMenuLogout() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigateTo = useNavigate()
  const [lockButton, setLockButton] = useState<boolean>(false)
  
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };


  const handleLogout = async () => {
      if(lockButton) return
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
      <MoreIcon onClick={handleClick}/>
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
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}