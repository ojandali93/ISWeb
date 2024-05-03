import React, { useState } from 'react'
import FormInputComponent from '../Inputs/FormInputComponent';
import ButtonComponent from '../Inputs/ButtonComponent';
import SelectComponent from '../Inputs/SelectComponent';
import { useData } from '../../Context/DataContext';
import { useAuth } from '../../Context/AuthContext';

const SupportForm = (props: any) => {

  const { addSupportTicket, loadingNewTicket } = useData()
  const { currentProfile } = useAuth()

  const [category, setCategory] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const categories = [
    {value: 'Technical Problem', label: 'Technical Problem'},
    {value: 'User Interface Problem', label: 'User Interface Problem'},
    {value: 'General Problem', label: 'General Problem'}
  ]

  const handleUpdateMessage = (text: string) => {
    setMessage(text);
  }

  const handleOptionClick = (value: string) => {
    setCategory(value);
    setIsOpen(false);
  }

  const handleTicketSubmit = () => {
    const data = {
      email: currentProfile.email,
      message: message,
      name: currentProfile.name,   
      status: true,
      subject: category,
    }
    addSupportTicket(data)
  }

  const handleOpenSelect = () => {
    setIsOpen(true);
  }


  return (
    <div className='flex flex-col justify-center items-center min-h-screen w-full rounded-lg'>
      <div className="text-center max-w-md mx-auto rounded-md border-2 border-primary p-8 mb-3">
        <h3 className='text-lg text-gray-400 font-bold mb-7'>Encountered an Issue? Let Us Know!</h3>
        <p className='text-white mb-4'>If you encounter any issues or have any concerns while using our website, 
        please don't hesitate to reach out. Whether it's a technical problem, a user interface query, or any 
        other challenge, we're here to help. We understand that encountering issues can be frustrating, but rest 
        assured, we're here to ensure a smooth and enjoyable experience on our website. Your feedback and reports are 
        invaluable to us, as they not only help us address your concerns but also contribute to making our website 
        better for everyone.
        </p>
      </div>
      <form className='flex flex-row text-color-primary items-center relative'>
        <div className='mt-3 overflow-visible text-white'>
        <SelectComponent
          placeholder="Select issue category"
          options={categories}
          selectedValue={category}
          handleOptionClick={handleOptionClick}
          handleOpenSelect={handleOpenSelect}
          isOpen={isOpen}
        />
        </div>
        <FormInputComponent
          value={message}
          handleFunction={handleUpdateMessage}
          placeHolder={'Whenever I click on...'}
          type={'text'}
          icon={'Message'}
        />
        <div className='mt-7'>
          <ButtonComponent
            label={loadingNewTicket ? 'submitting' : 'Submit Ticket'} 
            handler={() => handleTicketSubmit()}/>
        </div>
      </form>
    </div>
  )
}

export default SupportForm