import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import { Box, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
export default function EmptyContentPage() {
  const { pathname } = useLocation()
  let message;

  switch (pathname) {
    case '/dashboard/home':
      message = 'Parece que a comunidade ainda não começou a compartilhar suas receitas. Que tal começar por você?'
      break;
    case '/dashboard/minhas-receitas':
      message = 'Você ainda não compartilhou suas receitas'
      break;
    case '/dashboard/receitas-favoritas':
      message = 'Você ainda não favoritou nenhuma receita'
      break;

    default:
      break;
  }


  return (
    <Box>
      <HeartBrokenIcon style={{ fontSize: '25rem', width: '100%' }} />
      <Typography textAlign={'center'} width={'50%'} margin={'auto'}>
        {message}
      </Typography>
    </Box>
  )
}
