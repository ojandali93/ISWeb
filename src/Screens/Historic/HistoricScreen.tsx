import React, { useEffect, useState } from 'react'
import LayoutComponent from '../BaseScreen'
import TableComponent from '../../Components/Tables/TableComponent'
import axios from 'axios'
import { intakeOColumns } from '../../Options/IntakeOptions'

const HistoricScreen = () => {

  const [records, setRecords] = useState([])

  useEffect(() => {
    getIntakeRecords()
  }, [])

  const getIntakeRecords = () => {
    let data = JSON.stringify({
      "status": "success",
      "method": "GET"
    });
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://intellasurebackend-docker.onrender.com/intake/',
      headers: {
        'Content-Type': 'application/json'
      },
      data : data
    };
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data.data[0]))
      setRecords(response.data.data)
       
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const screenWidth = window.innerWidth;
  const maxWidth = screenWidth - 208;

  return (
    <LayoutComponent>
      <TableComponent columns={intakeOColumns} records={records}/>
    </LayoutComponent>
  )
}

export default HistoricScreen
