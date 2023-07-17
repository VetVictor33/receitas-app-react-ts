import { Avatar, Card, CardContent, CardHeader, IconButton, Typography } from "@mui/material";
import { Recipe } from "../../../types/Recipes";
import { red } from '@mui/material/colors';
import { formatDate, getFirstLetter } from "../../../utils/formatUtils";
import { getItem } from "../../../storage";
import DeleteCommentMenu from "./DeleteCommentMenu";


export default function Comment({ recipeId, comment }: { recipeId: Recipe['id'], comment: Recipe['metrics']['comments'][number] }) {

  return (
    < Card sx={{ width: '100%' }}>
      <hr />
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label={comment.username}>
            {getFirstLetter(comment.username)}
          </Avatar>
        }
        action={comment.username === getItem('username') ?
          <IconButton aria-label="settings">
            <DeleteCommentMenu commentId={comment.id} recipeId={recipeId} />
          </IconButton>
          : ''
        }
        title={comment.username}
        subheader={formatDate(comment.createdAt)}
      />
      <CardContent>
        <Typography variant='body1' >
          {comment.content}
        </Typography>
      </CardContent>
    </Card >
  )
}
