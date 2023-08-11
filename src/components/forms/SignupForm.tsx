import { Box, Button, Input, InputLabel } from '@mui/material';
import Alert from '@mui/material/Alert';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ChangeEvent, useRef, useState } from 'react';
import AdonisjsApi from '../../services/adonisjs/adonisjs';
import { formStyle, parentFormStyle } from '../../style/formStyles';
import { AlertStyle, SubmitButtonStyle } from '../../@types/FormTypes';
import { verifyEmailFormat } from '../../utils/formatUtils';
import { Link } from 'react-router-dom';
import { logInPath } from '../../utils/pathnameUtils';
import { IErrors } from '../../@types/ApiReturn';


export default function SignupForm() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const [usernameError, setUsernameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [passwordConfirmationError, setPasswordConfirmationError] = useState(false)

  const hasAnyFeedbackRef = useRef(false)
  const [feedBackMessage, setFeedbackMessage] = useState<string>('')

  const [submitButtonStyle, setSubmitButtonStyle] = useState<keyof SubmitButtonStyle>('secondary')
  const [alertStyle, setAlertStyle] = useState<keyof AlertStyle>('warning')


  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value

    hasAnyFeedbackRef.current = false
    switch (name) {
      case 'username':
        setUsername(value)
        setUsernameError(false)
        break
      case 'email':
        setEmail(value)
        setEmailError(false)
        break
      case 'password':
        setPassword(value)
        setPasswordError(false)
        setPasswordConfirmationError(false)
        break
      case 'passwordConfirmation':
        setPasswordConfirmation(value)
        setPasswordConfirmationError(false)
        break
    }

    if (!usernameError && !emailError && !passwordError) {
      setSubmitButtonStyle('secondary')
    }
  }

  function cleanForm() {
    setUsername('')
    setEmail('')
    setPassword('')
    setPasswordConfirmation('')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!username) {
      setUsernameError(true)
      hasAnyFeedbackRef.current = true
    }

    if (!email) {
      setEmailError(true)
      hasAnyFeedbackRef.current = true
    }

    if (!verifyEmailFormat(email)) {
      setEmailError(true)
      hasAnyFeedbackRef.current = true
    }

    if (!password) {
      setPasswordError(true)
      hasAnyFeedbackRef.current = true
    }

    if (!passwordConfirmation || (passwordConfirmation !== password)) {
      setPasswordConfirmationError(true)
      setPasswordError(true)
      hasAnyFeedbackRef.current = true
    }

    if (hasAnyFeedbackRef.current) {
      setSubmitButtonStyle('error')
      if (!verifyEmailFormat(email)) {
        setFeedbackMessage('Formado de email inválido')
      } else if (passwordConfirmationError) {
        setFeedbackMessage('Senhas não são idênticas')
      }
      else {
        setFeedbackMessage('Preencha todos os campos')
      }
      setAlertStyle('warning')
      return
    }

    try {
      const data = { username, email, password }
      await AdonisjsApi.signupAttempt(data)

      hasAnyFeedbackRef.current = true
      setFeedbackMessage('Conta criada com sucesso!')
      setAlertStyle('success')
      setSubmitButtonStyle('success')
      cleanForm()
    } catch (error: IErrors | unknown) {
      hasAnyFeedbackRef.current = true
      if ((error as IErrors).response.data.errors) {
        setFeedbackMessage((error as IErrors).response.data.errors[0].message)
      } else {
        setFeedbackMessage((error as IErrors).response.data.message)
      }
      setAlertStyle('error')
      setSubmitButtonStyle('error')
    }
  }

  return (
    //@ts-ignore
    <div style={{ ...parentFormStyle }}>
      <Box component="form" noValidate autoComplete="on" onSubmit={handleSubmit}
        sx={{ ...formStyle }}>
        <Typography variant='h5' color={'#000'}>Receitas App</Typography>
        <Typography variant='h6' color={'#000'}>Sign Up</Typography>
        <FormControl sx={{ width: '90%' }}>
          <InputLabel htmlFor="username">Username</InputLabel>
          <Input id='username' error={usernameError} name="username" value={username} onChange={handleInputChange} autoComplete='on' />
        </FormControl>
        <FormControl sx={{ width: '90%' }}>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input id='email' error={emailError} name="email" type={email} value={email} onChange={handleInputChange} autoComplete='on' />
        </FormControl>
        <FormControl sx={{ width: '90%' }}>
          <InputLabel htmlFor="password">Senha</InputLabel>
          <Input id='password' error={passwordError} name="password" type='password'
            value={password} onChange={handleInputChange} autoComplete='on' />
        </FormControl>
        <FormControl sx={{ width: '90%' }}>
          <InputLabel htmlFor="passwordConfirmation">Confirmar senha</InputLabel>
          <Input id='passwordConfirmation' error={passwordConfirmationError}
            name="passwordConfirmation" type='password' value={passwordConfirmation}
            onChange={handleInputChange} autoComplete='on' />
        </FormControl>
        <Stack sx={{ width: '100%' }} spacing={2}>
          {hasAnyFeedbackRef.current && <Alert severity={alertStyle}>{feedBackMessage}</Alert>}
          <Button color={submitButtonStyle} type='submit'>
            Inscrever-se
          </Button>
          <Link to={logInPath}>Já tem cadastro?</Link>
        </Stack>
      </Box>
    </div >
  )
}