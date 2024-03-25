import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import InputContainerUser from '../../Components/General/InputContainerUser'
import { useAuth } from '../../Context/AuthContext'

const ConfirmEmailScreen = () => {
  const navigate = useNavigate()

  const {confirmEmailCode, resetConfirmEmail} = useAuth()

  const [confirmationCode, setConfirmationCode] = useState<string>('')

  const handleConfirmationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmationCode(e.target.value)
  }

  const checkConfirmationCide = () => {
    confirmEmailCode(confirmationCode)
  }

  return (
    <div>
      <div>
        <h1>Email Confirmation</h1>
        <InputContainerUser
          value={confirmationCode}
          handleFunction={handleConfirmationCodeChange}
          placeHolder={'confirmation code...'}
          type='text'
          capitalize={'none'}
          icon={'user'}
          split={'full'}
        />
        <div onClick={() => {checkConfirmationCide()}}>
          <p>Confirm Code</p>
        </div>
        <div onClick={() => {resetConfirmEmail()}}>
          <p>Resend Code</p>
        </div>
        <div>
          <Link to="/">Back To Login</Link>
        </div>
      </div>
    </div>
  )
}

export default ConfirmEmailScreen
