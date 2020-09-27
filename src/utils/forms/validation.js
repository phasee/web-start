import { registerErrors } from '@/utils/forms/errors'

const validateEmail = (email) => {
  if (email === '') {
    return [registerErrors.EMAIL_EMPTY]
  }
  return []
}

const validateUsername = (username) => {
  if (username === '') {
    return [registerErrors.USERNAME_EMPTY]
  }
  return []
}

const validatePasswordRegister = (password, confirmPassword) => {
  const errors = []
  if (password === '' || confirmPassword === '') {
    errors.push(registerErrors.PASSWORD_EMPTY)
  } else if (password !== confirmPassword) {
    errors.push(registerErrors.PASSWORDS_DO_NOT_MATCH)
  }
  return errors
}

const validatePasswordLogin = (password) => {
  if (password === '') {
    return [registerErrors.PASSWORD_EMPTY]
  }
  return []
}

const handleAuthError = (error) => {
  const formErrors = []
  switch (error.code) {
    case 'auth/email-already-in-use': formErrors.push('An account already exists with this e-mail')
      break
    case 'auth/invalid-email': formErrors.push('Invalid e-mail address provided')
      break
    case 'auth/operation-not-allowed': formErrors.push('Registration is unavailable at the time')
      break
    case 'auth/weak-password': formErrors.push('Password provided is weak')
      break
    case 'auth/user-disabled': formErrors.push('This account has been disabled')
      break
    case 'auth/user-not-found': formErrors.push('User not found. Please create an account')
      break
    case 'auth/wrong-password': formErrors.push('E-mail/Password do not match our records')
      break
    case 'auth/too-many-requests': formErrors.push('Too many unsuccessful login attempts. Please try again later')
      break
  }

  return formErrors
}

export {
  validateEmail,
  validateUsername,
  validatePasswordRegister,
  validatePasswordLogin,
  handleAuthError
}
