import { useState } from "react";
import { useTranslation } from 'react-i18next';

import WineTask from "../History/WineTask";

function EventListElement({ event, firstOpId }) {

    const [isHovered, setIsHovered] = useState(false);
  
  const { t } = useTranslation();
  
  // canDelete is true if the event si of type 'lab' or if its id matches the prop deletableOpId
  const canDelete = event.type === 'lab' || (event._id === firstOpId && event.type !== 'transfer-out');
  
 
  // Transfer event.date to a string object like '2021-09-01'
  const dateString = new Date(event.date).toISOString().split('T')[0];

  const handleDeleteEvent = (id) => {
    console.log("Delete event with id: ", id)    
  }

  let rowsContent;

  if (event.type === "lab") {
    // Lab-specific fields
    rowsContent = (
      <>
      <td className="text-center">{event.vesselLabel}</td>
      <td style={{ backgroundColor: '#AAF2FF' }} className="text-center">{event.alcohol}</td>      
      <td className="text-center">{event.tAcids}</td>      
      <td className="text-center">{event.pH}</td>      
      <td style={{ backgroundColor: '#FFFFC8' }} className="text-center">{event.SO2}</td>      
      <td className="text-center">{event.tSO2}</td>      
      <td style={{ backgroundColor: '#FFDCFF' }} className="text-center">{event.vAcids}</td>      
      <td className="text-center">{event.sugars}</td>      
      <td className="text-center">{event.density}</td>      
      <td className="text-center">{event.mAcid}</td>     
    </>
    );
  } else {
    // Op-specific fields
    rowsContent = (
      <>
      <td className="text-center">Task {event.number}</td>
      <td colSpan={9}> <WineTask>{event}</WineTask> </td>    
    </>
    );
  }

  return <tr
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}    
  >
    <td className="text-center">{dateString}</td>

    {rowsContent}

    <td className="text-center">{event.userName}</td>      
    <td className="text-center">
      {isHovered && (
        <span
          style={{ cursor: canDelete ? 'pointer' : '', color: canDelete ? 'red' : 'gray' }}
          onClick={() => canDelete && handleDeleteEvent(event._id)}
        >
          {t("event-delete")}
        </span>
      )}
    </td>    
  </tr>




}

export default EventListElement;