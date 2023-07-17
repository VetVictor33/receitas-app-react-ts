import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <Box style={{ flexGrow: 1, minHeight: '10vh' }}>
      <AppBar position="static">
        <Toolbar variant="dense" style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography>Desenvolvido por - Victor Feliciano</Typography>
          <Typography>victorjfeliciaon@gmail.com - @2023</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
