import React from 'react'
import LayoutComponent from '../BaseScreen'
import TableComponent from '../../Components/Tables/TableComponent'
import { useData } from '../../Context/DataContext'
import { ClaimOptions } from '../../Options/ClaimOptions'
import AveaClaimsFilterComponent from "../../Components/SortAndFilter/AveaClaimsFilterComponent";
import {Tab} from "@mui/material";

const ClaimsAveaScreen = () => {
    const {aveaClaimsRecords, allUsers} = useData()

    return (

    <LayoutComponent
      header={
        <div className='h-12 w-full mb-2'>
          <AveaClaimsFilterComponent />
        </div>
      } 
      content={<div className="h-full w-full max-h-full max-w-full">
          <TableComponent columns={ClaimOptions} records={aveaClaimsRecords} users={allUsers} table={'Avea Claims'} />
      </div>}
    />
  )
}

export default ClaimsAveaScreen
