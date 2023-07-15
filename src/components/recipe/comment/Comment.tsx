import { Avatar, Card, CardContent, CardHeader, IconButton, Typography } from "@mui/material";
import { Recipe } from "../../../types/Recipes";
import { red } from '@mui/material/colors';
import { formatDate, getFirstLetter } from "../../../utils/formatUtils";
import { getItem } from "../../../storage";


export default function Comment({ recipeUsername, comment }: { recipeUsername: string, comment: Recipe['metrics']['comments'][number] }) {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label={comment.username}>
            {getFirstLetter(comment.username)}
          </Avatar>
        }
        action={recipeUsername === getItem('username') ?
          <IconButton aria-label="settings">
            <p>local para o usuario autor do comentario apagá-lo</p>
          </IconButton>
          : ''
        }
        title={comment.username}
        subheader={formatDate(comment.createdAt)}
      />
      <CardContent>
        <Typography variant='body1'>
          {comment.content}
        </Typography>
      </CardContent>
    </Card>
  )
}
