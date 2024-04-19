import React, { useEffect, useState } from 'react'
import { useData } from '../../Context/DataContext';
import { intakeOColumns } from '../../Options/IntakeOptions';
import TableComponent from '../../Components/Tables/TableComponent';

const IntakeHome = () => {

  const {intakeRecords, intakeUsers} = useData()

  const [records, setRecords] = useState<any>([])
  const [columns, setColumns] = useState(intakeOColumns);

  useEffect(() => {
    setRecords(intakeRecords)
  }, [intakeRecords])

  useEffect(() => {
    setColumns(intakeOColumns)
  }, [intakeOColumns])

  return (
    <div className='h-full w-full max-h-full max-w-ful'>
      <TableComponent users={intakeUsers} columns={columns} records={records}/>
    </div>
  )
}

export default IntakeHome
