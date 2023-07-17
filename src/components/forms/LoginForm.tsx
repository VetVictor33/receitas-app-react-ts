import { Box, Button, Input, InputLabel } from '@mui/material';
import Alert from '@mui/material/Alert';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import { ChangeEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from '../../hook/useUser';
import Api from '../../services/API/Api';
import { setItem } from '../../storage';
import { AlertStyle, SubmitButtonStyle } from '../../types/FormTypes';
import Typography from '@mui/material/Typography';
import { verifyEmailFormat } from '../../utils/formatUtils';



export const formStyle = {
  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
  gap: '10px', width: '380px',
  background: 'aliceblue', padding: '20px', borderRadius: '5px'
}

export const parentFormStyle = { height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }

export default function LoginForm() {
  const navigateTo = useNavigate()
  const { setUser } = useUser()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
      case 'email':
        setEmail(value)
        setEmailError(false)
        break
      case 'password':
        setPassword(value)
        setPasswordError(false)
        break
    }

    if (!emailError && !passwordError) {
      setSubmitButtonStyle('secondary')
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

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
      const data = { email, password }
      const { token, user } = await Api.loginAttempt(data)
      setItem('token', token.token)
      setItem('username', user.username)
      setUser(user)
      navigateTo('/dashboard/home')

    } catch (error) {
      console.log(error)
      hasAnyFeedbackRef.current = true
      setFeedbackMessage('Algo deu errado')
      setAlertStyle('error')
      setSubmitButtonStyle('error')
    }
  }

  return (
    <div style={parentFormStyle}>
      <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}
        style={formStyle}>
        <Typography variant='h5' color={'#000'}>Receitas App</Typography>
        <Typography variant='h7' color={'#000'}>Login</Typography>
        <FormControl sx={{ width: '90%' }}>
          <InputLabel htmlFor="my-input">Email</InputLabel>
          <Input error={emailError} name="email" type='email' value={email} aria-describedby="my-helper-text" onChange={handleInputChange} />
        </FormControl>
        <FormControl sx={{ width: '90%' }}>
          <InputLabel htmlFor="my-input">Password</InputLabel>
          <Input error={passwordError} name="password" type='password' value={password} aria-describedby="my-helper-text" onChange={handleInputChange} />
        </FormControl>

        <Stack sx={{ width: '100%' }} spacing={2}>
          {hasAnyFeedbackRef.current && <Alert severity={alertStyle}>{feedBackMessage}</Alert>}
          <Button color={submitButtonStyle} type='submit'>
            Entrar
          </Button>
          <a href="/sign-up">Ainda não tem cadastro?</a>
        </Stack>
      </Box>
    </div>
  )
}