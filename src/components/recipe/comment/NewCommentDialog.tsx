import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function NewCommentDialog({ openNewCommentDialog, handleCloseNewCommentDialog }:
  { openNewCommentDialog: boolean, handleCloseNewCommentDialog: () => void }) {

  return (
    <div>
      <Dialog open={openNewCommentDialog} onClose={handleCloseNewCommentDialog}>
        <DialogTitle>Adicionar commentário</DialogTitle>
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewCommentDialog}>Cancel</Button>
          <Button onClick={handleCloseNewCommentDialog}>Comentar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}