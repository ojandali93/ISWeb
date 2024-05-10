import { colors } from '@mui/material'
import React from 'react'
import { RefreshCcw } from 'react-feather'
import { useData } from '../../Context/DataContext'

interface SingleClickProps {
  value: string,
  onChange: (claim_id: string) => void,
  record: any
}

const SingleSelectClickComponent: React.FC<SingleClickProps> = (props) => {
  const {value, onChange, record} = props
  const {loadingAvailityData} = useData()

  return (
    <div className='hover:cursor-pointer'>
      {
        loadingAvailityData
          ? <RefreshCcw className='animate-spin flex flex-row justify-center text-sky-500' height={24} width={24}/>
          : <p className='text-sky-500' onClick={() => onChange(record['claim_id'])}>{value}</p>
      }
      
    </div>
  )
}

export default SingleSelectClickComponent