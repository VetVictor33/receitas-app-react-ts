import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Recipe } from '../../../@types/Recipes';
import AdonisjsApi from '../../../services/adonisjs/adonisjs';
import useUser from '../../../hook/useUser';
import { Alert } from '@mui/material';
import { IErrors } from '../../../@types/ApiReturn';

export default function NewCommentDialog({ recipeId, openNewCommentDialog, handleCloseNewCommentDialog }:
  { recipeId: Recipe['id'], openNewCommentDialog: boolean, handleCloseNewCommentDialog: () => void }) {

  const { recipes, setRecipes } = useUser()
  const [content, setContent] = useState('')
  const [commentError, setCommentError] = useState(false)
  const [alert, setAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  const handleNewCommentSubmit = async () => {
    if (!content) {
      setCommentError(true)
      setAlertMessage('Escreva algo')
      return
    }

    try {
      const newComment = await AdonisjsApi.addComment(recipeId, content)
      const localRecipes: Recipe[] = [...recipes]
      localRecipes.forEach(recipe => {
        if (recipe.id === recipeId) {
          recipe.metrics.comments.push(newComment)
        }
      })
      setRecipes(localRecipes)
      setAlert(true)
      setAlertMessage("Comentário adicionado com sucesso")
      setContent('')

    } catch (error: IErrors | unknown) {
      setCommentError(true)
      if ((error as IErrors).response.data.errors[0]) {
        setAlertMessage((error as IErrors).response.data.errors[0].message)
      } else {
        setAlertMessage('Algo deu errado')
      }
    }
  }
  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentError(false)
    setAlert(false)
    setContent(e.target.value)
  }

  return (
    <div>
      <Dialog open={openNewCommentDialog} onClose={handleCloseNewCommentDialog} fullWidth={true}>
        <DialogTitle>Adicionar comentário</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Procure sempre ser gentil
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="content"
            label="comentário"
            type="text"
            fullWidth
            variant="standard"
            multiline
            rows={4}
            value={content}
            onChange={handleContentChange}
            error={commentError}
          />
        </DialogContent>
        {(alert || commentError) && <Alert severity={commentError ? 'error' : 'success'}>{alertMessage}</Alert>}
        <DialogActions>
          <Button onClick={handleCloseNewCommentDialog}>Cancel</Button>
          <Button onClick={handleNewCommentSubmit}>Comentar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}