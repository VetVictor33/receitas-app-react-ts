import { Dialog } from '@mui/material';
import Box from '@mui/material/Box';
import { Recipe } from '../../@types/Recipes';
import RecipeForm from '../forms/recipeForm/RecipeForm';

const style = {
  width: '100%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function RecipeModal({ modalOpen, handleModalClose, incomeRecipe }:
  { modalOpen: boolean, handleModalClose: () => void, incomeRecipe: Recipe | undefined }) {

  return (
    <Dialog
      open={modalOpen}
      onClose={handleModalClose}
      fullWidth={true}
    >
      <Box sx={style}>
        <RecipeForm incomeRecipe={incomeRecipe} />
      </Box>
    </Dialog>
  );
}
