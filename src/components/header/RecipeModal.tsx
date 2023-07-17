import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Recipe } from '../../types/Recipes';
import RecipeForm from '../forms/recipeForm/RecipeForm';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function RecipeModal({ modalOpen, handleModalClose, incomeRecipe }:
  { modalOpen: boolean, handleModalClose: () => void, incomeRecipe: Recipe | undefined }) {

  return (
    <Modal
      open={modalOpen}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <RecipeForm incomeRecipe={incomeRecipe} />
      </Box>
    </Modal>
  );
}
