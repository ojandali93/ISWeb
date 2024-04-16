import React, { useEffect, useState } from 'react'
import LayoutComponent from '../BaseScreen'
import TableComponent from '../../Components/Tables/TableComponent'
import { ExternalColumns } from '../../Options/ExternalOptions'
import axios from 'axios'

const ExternalScreen = () => {

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

  return (
    <LayoutComponent>
      <TableComponent columns={ExternalColumns} records={records}/>
    </LayoutComponent>
  )
}

export default ExternalScreen
