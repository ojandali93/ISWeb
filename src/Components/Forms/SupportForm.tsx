import React, { useState } from 'react'
import FormInputComponent from '../Inputs/FormInputComponent';

const SupportForm = (props: any) => {

  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleUpdateSubject = ( text: string ) => {
    setSubject(text);
  };

  const handleUpdateMessage = ( text: string) => {
    setMessage(text);
  }

  return (
    <form className='flex flex-row justify-center items-center'>
      <FormInputComponent
        value={subject}
        handleFunction={handleUpdateMessage}
        placeHolder={'Claims tab issue...'}
        type={'text'}
        icon={'Subject'}
      />
      <FormInputComponent
        value={message}
        handleFunction={handleUpdateSubject}
        placeHolder={'Whenever I click on...'}
        type={'text'}
        icon={'Message'}
      />
    </form>
  )
}

export default SupportForm