import TableComponent from "../../../Components/Tables/TableComponent";

import { useData } from "../../../Context/DataContext";
import { AvailityOptions } from "../../../Options/AvailityOptions";

const AvailityComponent = () => {
  const {grabAvailityData, availityData, allUsers} = useData();
  // try calling useEffect here after routing to see if this will work for us.
  return (
    <div>
      <TableComponent records={availityData} columns={AvailityOptions} users={allUsers} table="Availity"/>
    </div>
  )
}

export default AvailityComponent;