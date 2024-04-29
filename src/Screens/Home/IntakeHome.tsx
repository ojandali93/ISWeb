import React, { useEffect, useState } from 'react'
import { useData } from '../../Context/DataContext';
import { intakeOColumns } from '../../Options/IntakeOptions';
import TableComponent from '../../Components/Tables/TableComponent';

const IntakeHome = () => {

  const {intakeRecords, intakeUsers} = useData()

  const [records, setRecords] = useState<any>([])

  useEffect(() => {
    setRecords(intakeRecords)
  }, [intakeRecords])

  return (
    <div className='h-full w-full max-h-full max-w-ful'>
      <TableComponent table='intake' users={intakeUsers} columns={intakeOColumns} records={intakeRecords}/>
    </div>
  )
}

export default IntakeHome
