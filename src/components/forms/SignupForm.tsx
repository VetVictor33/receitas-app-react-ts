import { Box, Button, Input, InputLabel } from '@mui/material';
import Alert from '@mui/material/Alert';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ChangeEvent, useRef, useState } from 'react';
import { formStyle, parentFormStyle } from '../../style/formStyles';
import { AlertStyle, SubmitButtonStyle } from '../../@types/FormTypes';
import { verifyEmailFormat } from '../../utils/formatUtils';
import { signupAttempt } from '../../services/adonisjs/requests';


export default function LoginForm() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [usernameError, setUsernameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

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

    if (hasAnyFeedbackRef.current) {
      setSubmitButtonStyle('error')
      if (!verifyEmailFormat(email)) {
        setFeedbackMessage('Formado de email inválido')
      } else {
        setFeedbackMessage('Preencha todos os campos')
      }
      setAlertStyle('warning')
      return
    }

    try {
      const data = { username, email, password }
      await signupAttempt(data)

      hasAnyFeedbackRef.current = true
      setFeedbackMessage('Conta criada com sucesso!')
      setAlertStyle('success')
      setSubmitButtonStyle('success')
      cleanForm()
    } catch (error) {
      hasAnyFeedbackRef.current = true
      //@ts-ignore
      if (error.response.data.errors) {
        //@ts-ignore
        setFeedbackMessage(error.response.data.errors[0].message)
      } else {
        //@ts-ignore
        setFeedbackMessage(error.response.data.message)
      }
      setAlertStyle('error')
      setSubmitButtonStyle('error')
    }
  }

  return (
    //@ts-ignore
    <div style={{ ...parentFormStyle }}>
      <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}
        sx={{ ...formStyle }}>
        <Typography variant='h5' color={'#000'}>Receitas App</Typography>
        <Typography variant='h6' color={'#000'}>Signup</Typography>
        <FormControl sx={{ width: '90%' }}>
          <InputLabel htmlFor="my-input">Username</InputLabel>
          <Input error={usernameError} name="username" value={username} aria-describedby="my-helper-text" onChange={handleInputChange} />
        </FormControl>
        <FormControl sx={{ width: '90%' }}>
          <InputLabel htmlFor="my-input">Email</InputLabel>
          <Input error={emailError} name="email" type={email} value={email} aria-describedby="my-helper-text" onChange={handleInputChange} />
        </FormControl>
        <FormControl sx={{ width: '90%' }}>
          <InputLabel htmlFor="my-input">Senha</InputLabel>
          <Input error={passwordError} name="password" type='password' value={password} aria-describedby="my-helper-text" onChange={handleInputChange} />
        </FormControl>
        <Stack sx={{ width: '100%' }} spacing={2}>
          {hasAnyFeedbackRef.current && <Alert severity={alertStyle}>{feedBackMessage}</Alert>}
          <Button color={submitButtonStyle} type='submit'>
            Inscrever-se
          </Button>
          <a href="/">Já tem cadastro?</a>
        </Stack>
      </Box>
    </div >
  )
}