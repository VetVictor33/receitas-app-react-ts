import FormControl from '@mui/material/FormControl';
import { Box, Button, Input, InputLabel } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import { ChangeEvent, useState, useRef, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { HINT_RECIPE_CATEGORY, HINT_RECIPE_DESCRIPTION, HINT_RECIPE_INGREDIENTS, HINT_RECIPE_NAME } from '../../../utils/formHints';
import { Recipe, newRecipeFromForm } from '../../../@types/Recipes';
import AdonisjsApi from '../../../services/adonisjs/adonisjs';
import useUser from '../../../hook/useUser';
import { AlertStyle, SubmitButtonStyle } from '../../../@types/FormTypes';


export default function RecipeForm({ incomeRecipe }: { incomeRecipe: Recipe | undefined }) {
  const { recipes, setRecipes, currentRecipesPage, setCurrentRecipesPage } = useUser()!
  const editing = incomeRecipe ? true : false;

  const [title, setTitle] = useState<string>('')
  const [categoryName, setCategoryName] = useState<string>('')
  const [ingredients, setIngredients] = useState<string | string[]>('')
  const [description, setDescription] = useState<string>('')
  const [image, setImage] = useState<File | null>(null)

  const previewImage = useRef(undefined)
  const reader = new FileReader()

  const [titleError, setTitleError] = useState<boolean>(false)
  const [categoryNameError, setCategoryNameError] = useState<boolean>(false)
  const [ingredientsError, setIngredientsError] = useState<boolean>(false)
  const [descriptionError, setDescriptionError] = useState<boolean>(false)
  const [imageError, setImageError] = useState<boolean>(false)

  const hasAnyFeedbackRef = useRef(false)
  const [feedBackMessage, setFeedbackMessage] = useState<string>('')

  const [submitButtonStyle, setSubmitButtonStyle] = useState<keyof SubmitButtonStyle>('secondary')
  const [alertStyle, setAlertStyle] = useState<keyof AlertStyle>('warning')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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
        { // @ts-ignore
          const file = e.target.files[0]
          setImage(file)
          setImageError(false)
          reader.onload = (ev: ProgressEvent<FileReader>) => {
            // @ts-ignore
            previewImage.current.src = ev.target.result
            // @ts-ignore
            previewImage.current.style.display = 'block'
          }
          reader.readAsDataURL(file);
        }
        break
    }

    if (!titleError && !categoryNameError && !ingredientsError && !descriptionError && !imageError) {
      setSubmitButtonStyle('secondary')
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!title) {
      setTitleError(true)
      hasAnyFeedbackRef.current = true
    }

    if (!categoryName) {
      setCategoryNameError(true)
      hasAnyFeedbackRef.current = true
    }

    if (!ingredients) {
      setIngredientsError(true)
      hasAnyFeedbackRef.current = true
    }

    if (!description) {
      setDescriptionError(true)
      hasAnyFeedbackRef.current = true
    }

    if (!image || (image.type.indexOf('jpeg') < 0 && image.type.indexOf('png') < 0)) {
      setImageError(true)
      hasAnyFeedbackRef.current = true
    }

    if (hasAnyFeedbackRef.current || !image) {
      setSubmitButtonStyle('error')
      setAlertStyle('warning')
      if (image && (image.type.indexOf('jpeg') < 0 && image.type.indexOf('png') < 0)) {
        setFeedbackMessage('Formato de arquivo não suportado')
      } else {
        setFeedbackMessage('Preencha todos os campos')
      }
      return
    }

    try {
      const data = { title, categoryName, description, ingredients, image }
      const newRecipe = await postOrUpdateRecipe(data)

      hasAnyFeedbackRef.current = true
      setAlertStyle('success')
      setSubmitButtonStyle('success')

      let localRecipes: Recipe[];
      if (editing && incomeRecipe) {
        const filteredRecipes = recipes.filter(item => item.id !== incomeRecipe.id)
        localRecipes = [newRecipe, ...filteredRecipes]
        setFeedbackMessage('Receita atualizada com sucesso!')
      } else {
        setFeedbackMessage('Receita adicionada com sucesso!')
        localRecipes = [newRecipe, ...recipes]
        if (localRecipes.length > 6) {
          localRecipes.pop()
          if (currentRecipesPage <= 1) {
            setCurrentRecipesPage(1)
          }
        }
      }
      setRecipes(localRecipes)
      cleanForm()
    } catch (error) {
      hasAnyFeedbackRef.current = true
      // @ts-ignore
      if (error.response.data.errors) {
        // @ts-ignore
        setFeedbackMessage(error.response.data.errors[0].message)
      } else {
        // @ts-ignore
        setFeedbackMessage(error.response.data.message)
      }
      setAlertStyle('error')
      setSubmitButtonStyle('error')
    }
  }

  async function postOrUpdateRecipe(data: newRecipeFromForm) {
    const formData = new FormData();
    formData.append('title', data.title)
    formData.append('categoryName', data.categoryName)
    formData.append('description', data.description)
    formData.append('ingredients', data.ingredients as string)
    formData.append('image', data.image)
    let response;
    if (editing && incomeRecipe) {
      response = await AdonisjsApi.updateRecipe(formData, incomeRecipe.id)
    } else {
      response = await AdonisjsApi.createRecipe(formData)
    }
    return response
  }

  function cleanForm() {
    setTitle('')
    setCategoryName('')
    setDescription('')
    setIngredients('')
  }

  useEffect(() => {
    if (editing && incomeRecipe) {
      setTitle(incomeRecipe.title)
      setCategoryName(incomeRecipe.category)
      setIngredients(incomeRecipe.ingredients.map(item => item.name))
      setDescription(incomeRecipe.description)
      // @ts-ignore
      previewImage.current.src = incomeRecipe.imageUrl
      // @ts-ignore
      previewImage.current.style.display = 'block';
    }
  }, [])

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}
      style={{ display: 'fle', flexDirection: 'column', gap: '10px' }}
    >
      <FormControl>
        <InputLabel htmlFor="my-input">Nome da receita</InputLabel>
        <Input error={titleError} name="title" value={title} onChange={handleInputChange}
          aria-describedby="my-helper-text" />
        <FormHelperText id="my-helper-text">{title ? '' : `${HINT_RECIPE_NAME}`}</FormHelperText>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Categoria</InputLabel>
        <Input error={categoryNameError} name="categoryName" value={categoryName} onChange={handleInputChange}
          aria-describedby="my-helper-text" />
        <FormHelperText id="my-helper-text">{categoryName ? '' : `${HINT_RECIPE_CATEGORY}`}</FormHelperText>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel htmlFor="my-input">Ingredientes</InputLabel>
        <Input error={ingredientsError} name="ingredients" value={ingredients} onChange={handleInputChange}
          aria-describedby="my-helper-text"
          fullWidth
        />
        <FormHelperText id="my-helper-text">{ingredients ? '' : `${HINT_RECIPE_INGREDIENTS}`}</FormHelperText>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel htmlFor="my-input">Instruções</InputLabel>
        <Input error={descriptionError} name="description" value={description} onChange={handleInputChange}
          multiline
          rows={4}
          aria-describedby="my-helper-text"
          fullWidth={true}
        />
        <FormHelperText id="my-helper-text">{description ? '' : `${HINT_RECIPE_DESCRIPTION}`}</FormHelperText>
      </FormControl>

      <FormControl>
        <Input error={imageError} type='file' name="image" onChange={handleInputChange} />
        {/* @ts-ignore */}
        <img ref={previewImage} id="previewImage" src="#" alt="Imagem do arquivo" style={{ display: 'none', maxWidth: '100%' }} />
      </FormControl>

      <Stack sx={{ width: '100%' }} spacing={2}>
        {hasAnyFeedbackRef.current && <Alert severity={alertStyle}>{feedBackMessage}</Alert>}
        <Button color={submitButtonStyle} type='submit'>
          {editing ?
            'Atualizar' :
            'Criar'
          }
        </Button>
      </Stack>

    </Box>
  );
}