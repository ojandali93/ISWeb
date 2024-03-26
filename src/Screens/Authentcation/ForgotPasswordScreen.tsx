import React from 'react'
import { Link } from 'react-router-dom'

const ForgotPasswordScreen = () => {
  return (
    <div>
      <p>forgot password</p>
      <div>
        <Link to="/auth/login">Back to Login</Link>
      </div>
    </div>
  )
}

export default ForgotPasswordScreen
