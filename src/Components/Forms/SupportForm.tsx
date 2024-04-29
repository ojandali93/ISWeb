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
    <div className='flex flex-col justify-center items-center min-h-screen w-full rounded-lg'>
      <div className="text-center max-w-md mx-auto rounded-md border-2 border-primary p-8">
        <h3 className='text-lg text-gray-400 font-bold mb-5'>Encountered an Issue? Let Us Know!</h3>
        <p className='text-white mb-4'>If you encounter any issues or have any concerns while using our website, 
        please don't hesitate to reach out. Whether it's a technical problem, a user interface query, or any 
        other challenge, we're here to help. We understand that encountering issues can be frustrating, but rest 
        assured, we're here to ensure a smooth and enjoyable experience on our website. Your feedback and reports are 
        invaluable to us, as they not only help us address your concerns but also contribute to making our website 
        better for everyone.
        </p>
      </div>
      <form className='flex flex-row'>
        <FormInputComponent
          value={subject}
          handleFunction={handleUpdateSubject}
          placeHolder={'Claims tab issue...'}
          type={'text'}
          icon={'Subject'}
        />
        <FormInputComponent
          value={message}
          handleFunction={handleUpdateMessage}
          placeHolder={'Whenever I click on...'}
          type={'text'}
          icon={'Message'}
        />
      </form>
    </div>
  )
}

export default SupportForm