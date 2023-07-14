import FormControl from '@mui/material/FormControl';
import { Box, Button, Input, InputLabel } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import { ChangeEvent, useState, useRef } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { HINT_RECIPE_CATEGORY, HINT_RECIPE_DESCRIPTION, HINT_RECIPE_INGREDIENTS, HINT_RECIPE_NAME } from '../../../utils/formHints';
import { Recipe, newRecipeFromForm } from '../../../types/Recipes';
import Api from '../../../services/API/api';
import useUser from '../../../hook/useUser';


type SubmitButtonStyle = {
  'secondary': string,
  'success': string,
  'error': string
}

type AlertStyle = {
  'error': string,
  'warning': string,
  'info': string,
  'success': string
}

export default function RecipeForm() {
  const {recipes, setRecipes} = useUser()!

  const [title, setTitle] = useState<string>('')
  const [categoryName, setCategoryName] = useState<string>('')
  const [ingredients, setIngredients] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [image, setImage] = useState<File | null>(null)

  const [titleError, setTitleError] = useState<boolean>(false)
  const [categoryNameError, setCategoryNameError] = useState<boolean>(false)
  const [ingredientsError, setIngredientsError] = useState<boolean>(false)
  const [descriptionError, setDescriptionError] = useState<boolean>(false)
  const [imageError, setImageError] = useState<boolean>(false)

  const hasAnyFeedbackRef = useRef(false)
  const [feedBackMessage, setFeedbackMessage] = useState<string>('')


  const [submitButtonStyle, setSubmitButtonStyle] = useState<keyof SubmitButtonStyle>('secondary')
  const [alertStyle, setAlertStyle] = useState<keyof AlertStyle>('warning')

  const handleInputChange = (e : ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value

    hasAnyFeedbackRef.current = false
    switch (name) {
      case 'title':
          setTitle(value)
          setTitleError(false)
        break
      case 'categoryName':
          setCategoryName(value)
          setCategoryNameError(false)
        break
      case 'ingredients':
          setIngredients(value)
          setIngredientsError(false)
        break
      case 'description':
          setDescription(value)
          setDescriptionError(false)
        break
      case 'image':
          setImage(e.target.files[0])
          setImageError(false)
        break
    }

    if(!titleError && !categoryNameError && !ingredientsError && !descriptionError && !imageError) {
      setSubmitButtonStyle('secondary')
    }
  }
  
  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!title) {
      setTitleError(true)
      hasAnyFeedbackRef.current = true
    }

    if(!categoryName) {
      setCategoryNameError(true)
      hasAnyFeedbackRef.current = true
    }

    if(!ingredients) {
      setIngredientsError(true)
      hasAnyFeedbackRef.current = true
    }

    if(!description) {
      setDescriptionError(true)
      hasAnyFeedbackRef.current = true
    }

    if(!image || image.type.indexOf('image') < 0) {
      setImageError(true)
      hasAnyFeedbackRef.current = true
    }

    if(hasAnyFeedbackRef.current || !image){
      setSubmitButtonStyle('error')
      setAlertStyle('warning')
      if(image && image.type.indexOf('image') < 0) {
        setFeedbackMessage('Formato de arquivo não suportado')
      } else {
        setFeedbackMessage('Preencha todos os campos')
      }
      return
    }
    
    try {
      const data = {title, categoryName, description, ingredients, image}
      const newRecipe = await postRescipe(data)
      
      hasAnyFeedbackRef.current= true
      setFeedbackMessage('Receita adicionada com sucesso!')
      setAlertStyle('success')
      setSubmitButtonStyle('success')

      const localRecipes: Recipe[] = [...recipes, newRecipe]
      setRecipes(localRecipes)
    } catch (error) {
      console.log(error)

      hasAnyFeedbackRef.current= true
      setFeedbackMessage('Algo deu errado')
      setAlertStyle('error')
      setSubmitButtonStyle('error')
    }
  }

  async function postRescipe(data: newRecipeFromForm ) {
    const formData = new FormData();
    formData.append('title', data.title)
    formData.append('categoryName', data.categoryName)
    formData.append('description', data.description)
    formData.append('ingredients', data.ingredients)
    formData.append('image', data.image)
    const response = await Api.createRecipe(formData)
    return response
  }

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
    <FormControl>
      <InputLabel htmlFor="my-input">Nome da receita</InputLabel>
      <Input error={titleError} name="title" value={title} aria-describedby="my-helper-text" onChange={handleInputChange}/>
      <FormHelperText id="my-helper-text">{title ? '':`${HINT_RECIPE_NAME}`}</FormHelperText>
    </FormControl>
    <FormControl>
      <InputLabel htmlFor="my-input">Categoria</InputLabel>
      <Input error={categoryNameError} name="categoryName" value={categoryName} aria-describedby="my-helper-text" onChange={handleInputChange}/>
      <FormHelperText id="my-helper-text">{categoryName ? '':`${HINT_RECIPE_CATEGORY}`}</FormHelperText>
    </FormControl>
    <FormControl>
      <InputLabel htmlFor="my-input">Ingredientes</InputLabel>
      <Input error={ingredientsError} name="ingredients" value={ingredients} aria-describedby="my-helper-text" onChange={handleInputChange}/>
      <FormHelperText id="my-helper-text">{ingredients ? '':`${HINT_RECIPE_INGREDIENTS}`}</FormHelperText>
    </FormControl>
    <FormControl>
      <InputLabel htmlFor="my-input">Instruções</InputLabel>
      <Input error={descriptionError} name="description" value={description} aria-describedby="my-helper-text" onChange={handleInputChange}/>
      <FormHelperText id="my-helper-text">{description ? '':`${HINT_RECIPE_DESCRIPTION}`}</FormHelperText>
    </FormControl>

    <FormControl>
      <Input type='file' name="image" onChange={handleInputChange}/>
    </FormControl>

    <Stack sx={{ width: '100%' }} spacing={2}>
      {hasAnyFeedbackRef.current && <Alert severity={alertStyle}>{feedBackMessage}</Alert>}
      <Button color={submitButtonStyle} type='submit'>Criar</Button>
    </Stack>

    </Box>
  );
}