import React from 'react'
import { faC } from '@fortawesome/free-solid-svg-icons';

interface userInfoProps {
  name: string,
  insurance: string,
  policy: string,
  prefix: string,
  facility: string,
  dob: string,
}

const UserInfo:React.FC<userInfoProps> = (props) => {
  const {name, insurance, policy, prefix, facility, dob} = props
  return (
    <div className='w-full p-4'>
      <div>
        <p className='text-4xl text-white font-bold pb-4'>{name}</p>
      </div>
      <div className='flex flex-row items-center'>
        <p className='text-xl text-white'>{prefix}</p>
        <p className='text-2xl text-white mx-2'>|</p>
        <p className='text-xl text-white'>{policy}</p>
        <p className='text-2xl text-white mx-2'>|</p>
        <p className='text-xl text-white'>{insurance}</p>
        <p className='text-2xl text-white mx-2'>|</p>
        <p className='text-xl text-white'>{dob}</p>
      </div>
    </div>
  )
}

export default UserInfo
