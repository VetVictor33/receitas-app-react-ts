import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteConfirmationDialog({
  openDeleteConfirmationDialog, handleCloseDeleteConfirmationDialog, confirmDelete
}: { openDeleteConfirmationDialog: boolean, handleCloseDeleteConfirmationDialog: () => void, confirmDelete: () => void }) {

  const handleDeleteConfirmation = () => {
    confirmDelete()
  }

  return (
    <Dialog
      open={openDeleteConfirmationDialog}
      onClose={handleCloseDeleteConfirmationDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Deseja prosseguir?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Essa ação não pode ser revertida.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDeleteConfirmationDialog}>Cancelar</Button>
        <Button onClick={handleDeleteConfirmation} autoFocus>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
