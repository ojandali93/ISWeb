import React, { useEffect, useState } from 'react'
import { useData } from '../../Context/DataContext';
import { useAuth } from '../../Context/AuthContext';
import { intakeOColumns } from '../../Options/IntakeOptions';
import TableComponent from '../../Components/Tables/TableComponent';
import { intakeAdminColumns } from '../../Options/IntakeAdminOptions';

const IntakeHome = () => {

  const {intakeRecords, intakeUsers} = useData()
  const {currentProfile} = useAuth();

  const [records, setRecords] = useState<any>([])

  useEffect(() => {
    setRecords(intakeRecords)
  }, [intakeRecords])

  return (
    <div className='h-full w-full max-h-full max-w-ful'>
      {currentProfile.department === 'administration' 
       ? <TableComponent table='intake' users={intakeUsers} columns={intakeAdminColumns} records={intakeRecords}/>
       : <TableComponent table='intake' users={intakeUsers} columns={intakeOColumns} records={intakeRecords}/>
      }
    </div>
  )
}

export default IntakeHome
