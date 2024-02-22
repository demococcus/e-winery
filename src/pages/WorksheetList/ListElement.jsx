
import WineTask from "../History/WineTask";

function ListElement({ wineTask, canDelete=false }) {

  // Transform event.date to a string object like '2021-09-01'
  const dateString = new Date(wineTask.date).toISOString().split('T')[0];


  return <tr>
    <td className="text-center">{dateString}</td>
    <td className="text-center">{wineTask.seqNumber}</td>
    <td> <WineTask>{wineTask}</WineTask> </td>
    <td className="text-center">{wineTask.userName}</td>   
  </tr>

}

export default ListElement;