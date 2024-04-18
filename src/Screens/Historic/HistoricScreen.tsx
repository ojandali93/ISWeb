import React, { useEffect, useState } from 'react'
import LayoutComponent from '../BaseScreen'
import TableComponent from '../../Components/Tables/TableComponent'
import axios from 'axios'
import { intakeOColumns } from '../../Options/IntakeOptions'
import FilterBarComponent from '../../Components/SortAndFilter/FilterBarComponent'

interface coordinatorInfo {
  name: string;
  userid: string;
}

const HistoricScreen = () => {

  const [records, setRecords] = useState([])
  const [columns, setColumns] = useState(intakeOColumns);

  useEffect(() => {
    grabAllProfiles()
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
      setRecords(response.data.data)
       
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const grabAllProfiles = () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://intellasurebackend-docker.onrender.com/users/all',
      headers: {
        'Content-Type': 'application/json'
      },
    };
    
    axios.request(config)
      .then((response) => {
        let allCoordinators: any = [];
        response.data.forEach((selection: any) => {
          if(selection.department === 'intake'){
            allCoordinators.push({name: selection.name, userId: selection.userid}); // Assuming you want to display the names
          }
        });
        updateCoordinatorOptions(allCoordinators);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const updateCoordinatorOptions = (coordinatorOptions: coordinatorInfo[]) => {
    setColumns((prevColumns: any) => {
      return prevColumns.map((col: any) => {
        if (col.recordName === 'coordinator') {
          return { ...col, people: coordinatorOptions };
        }
        return col;
      });
    });
  };

  return (
      <LayoutComponent 
        header={<FilterBarComponent />} 
        content={<TableComponent columns={columns} records={records}/>}
      />
  )
}

export default HistoricScreen