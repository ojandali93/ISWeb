import LayoutComponent from '../BaseScreen';
import { useData } from '../../Context/DataContext';
import TableComponent from '../../Components/Tables/TableComponent';
import { ExternalOptions } from '../../Options/ExternalOptions';
import ExternalFilterComponent from '../../Components/SortAndFilter/ExternalFilterComponent';

const ExternalScreen = () => {

  const {allUsers, externalData} = useData()


  return (
    <LayoutComponent
      header={
        <div className='h-14 w-full mb-2'>
          <ExternalFilterComponent />
        </div>
      } // Render your custom header component here
      content={
      <div>
        <TableComponent table='External' columns={ExternalOptions} records={externalData} users={allUsers} 
        />
      </div>
      } 
    />
  )
}

export default ExternalScreen
