import TableComponent from "../../../Components/Tables/TableComponent";

import { useData } from "../../../Context/DataContext";
import { AvailityOptions } from "../../../Options/AvailityOptions";

const AvailityComponent = () => {
  const {availityData, allUsers} = useData();
  
  return (
    <div>
      <TableComponent records={availityData} columns={AvailityOptions} users={allUsers} table="Availity"/>
    </div>
  )
}

export default AvailityComponent;