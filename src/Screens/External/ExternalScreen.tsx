import LayoutComponent from '../BaseScreen';
import { useData } from '../../Context/DataContext';
import TableComponent from '../../Components/Tables/TableComponent';
import { ExternalOptions } from '../../Options/ExternalOptions';

const ExternalScreen = () => {

  const {allUsers, externalData} = useData()


  return (
    <LayoutComponent
      header={null} // Render your custom header component here
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
