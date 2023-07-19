import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HeaderMenuOptions from './HeaderMenuOptions';
import HeaderMenuLogout from './HeaderMenuLogout';
import HeaderSearch from './HeaderSearch';
import useUser from '../../hook/useUser';
import { Link, useLocation } from 'react-router-dom';
import { logInPath, notLoggedDashboardPath, signUpPath } from '../../utils/pathnameUtils';



export default function Header() {
  const { isLogged } = useUser();

  const { pathname } = useLocation()
  const notOnDashboard = pathname === logInPath || pathname === signUpPath ? true : false

  return (
    <Box sx={{ flexGrow: 1, minHeight: '10vh', position: 'sticky', top: '0px', zIndex: '1' }}>
      <AppBar position="static" sx={{ minWidth: '100%' }}>
        {notOnDashboard ?
          <>
            <Link to={notLoggedDashboardPath}>
              <Typography
                sx={{ color: 'white', padding: '1rem', fontWeight: 'bold', textAlign: 'center' }}>
                Dashboard
              </Typography>
            </Link>
          </> :
          isLogged() ?
            <>
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  sx={{ mr: 2 }}
                >
                  <HeaderMenuOptions />
                </IconButton>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                  Receitas App
                </Typography>
                <HeaderSearch />
                <HeaderMenuLogout />
              </Toolbar>
            </> :
            <Link to={logInPath}>
              <Typography
                sx={{ color: 'white', padding: '1rem', fontWeight: 'bold', textAlign: 'center' }}>
                Logar
              </Typography>
            </Link>
        }
      </AppBar>
    </Box >
  );
}
