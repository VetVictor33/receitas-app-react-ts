import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useUser from '../hook/useUser';

export default function ConfirmationDialog({
  openConfirmationDialog, handleCloseConfirmationDialog, confirm
}: { openConfirmationDialog: boolean, handleCloseConfirmationDialog: () => void, confirm: () => void }) {
  const { loginOut: logginOut } = useUser()
  const handleConfirmation = () => {
    confirm()
  }

  return (
    <Dialog
      open={openConfirmationDialog}
      onClose={handleCloseConfirmationDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Deseja prosseguir?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {logginOut ? 'Você será deslogado' :
            'Essa ação não pode ser revertida.'
          }
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseConfirmationDialog}>Cancelar</Button>
        <Button onClick={handleConfirmation} autoFocus>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
