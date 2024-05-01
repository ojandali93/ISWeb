import React from 'react'
import LayoutComponent from '../BaseScreen'
import { accountsOptions } from '../../Options/AccountsOptions'
import TableComponent from '../../Components/Tables/TableComponent'
import { useData } from '../../Context/DataContext'

const AccountsScreen = () => {

  const {allUsers} = useData()

  return (
    <LayoutComponent
      header={null} // Render your custom header component here
      content={
        <div>
          <TableComponent table={'Accounts'} users={allUsers} columns={accountsOptions} records={allUsers}/>
        </div>
      } // Render your custom content component here
    />
  )
}

export default AccountsScreen
