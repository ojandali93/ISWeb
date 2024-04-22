import React, { useState } from 'react'
import { useData } from '../../Context/DataContext'
import FormInputComponent from '../Inputs/FormInputComponent'
import InsuranceSelectComponent from '../Inputs/InsuranceSelectComponent'
import DatePicker from "react-datepicker";
import CalendarSelectComponent from '../Inputs/CalendarSelectComponent';
import ButtonComponent from '../Inputs/ButtonComponent';

const IntakeForm = () => {

  const {insuranceOptions} = useData()

  const [clientName, setClientName] = useState<string>('')
  const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date())
  const [policy, setPolicy] = useState<string>('')
  const [insurance, setInsurance] = useState<string>('')
  const [source, setSource] = useState<string>('')
  const [coordinator, setCoordinator] = useState<string>('')
  const [note, setNote] = useState<string>('')

  const [insuranceOpen, setInsuranceOpen] = useState<boolean>(true)

  const handleOpenInsurance = () => {
    setInsuranceOpen(!insuranceOpen)
  }

  const handleUpdateClient = (text: string) => {
    setClientName(text)
  }

  const handleUpdateDOB = (text: Date) => {
    setDateOfBirth(text)
  }

  const handleUpdatePolicy = (text: string) => {
    setPolicy(text)
  }

  const handleUpdateInsurance = (text: string) => {
    setInsurance(text)
    setInsuranceOpen(!insuranceOpen)
  }

  const handleUpdateSource = (text: string) => {
    setSource(text)
  }

  const handleUpdateCoordinator = (text: string) => {
    setCoordinator(text)
  }

  const handleUpdateNotes = (text: string) => {
    setNote(text)
  }



  return (
    <form>
      <FormInputComponent 
        value={clientName}
        handleFunction={handleUpdateClient}
        placeHolder={'john doe...'}
        type={'text'}
        icon={'Client Name'}
        capitalization={true}
      />
      <FormInputComponent 
        value={policy}
        handleFunction={handleUpdatePolicy}
        placeHolder={'ABC123456789...'}
        type={'text'}
        icon={'Policy Number'}
        capitalization={true}
      />
      <CalendarSelectComponent selectedDate={dateOfBirth} handleDateChange={handleUpdateDOB}/>
      <InsuranceSelectComponent 
        placeholder='Insurance'
        options={insuranceOptions}
        selectedValue={insurance}
        handleOptionClick={handleUpdateInsurance}
        handleOpenSelect={handleOpenInsurance}
        isOpen={insuranceOpen}
      />
      <FormInputComponent 
        value={source}
        handleFunction={handleUpdateSource}
        placeHolder={'source...'}
        type={'text'}
        icon={'Source'}
        capitalization={true}
      />
      <FormInputComponent 
        value={note}
        handleFunction={handleUpdateNotes}
        placeHolder={'This is a new note...'}
        type={'text'}
        icon={'Initial Note'}
        capitalization={true}
      />
      <div className='w-full flex flex-row justify-center items-center my-2 mt-4'>
        <ButtonComponent label='Submit Record' handler={() => {console.log('submitting claim')}}/>
      </div>
    </form>
  )
}

export default IntakeForm
