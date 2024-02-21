import { useState } from "react";
import { useTranslation } from 'react-i18next';

import WineTask from "../History/WineTask";

import {useDeleteWineTaskMutation, useDeleteWineLabMutation } from "../../store"; 


function EventListElement({ event, firstOpId }) {

  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);  
  const [deleteTask] = useDeleteWineTaskMutation();
  const [deleteLab] = useDeleteWineLabMutation();
  
  // canDelete is true if the event si of type 'lab' or if its id matches the prop deletableOpId
  const canDelete = event.type === 'lab' || (event._id === firstOpId && event.type !== 'transfer-out');
  
 
  // Transfer event.date to a string object like '2021-09-01'
  const dateString = new Date(event.date).toISOString().split('T')[0];

  const handleDeleteEvent = () => {
    console.log("Delete", event.type ,"event with id: ", event._id)    ;
    if (event.type === "lab") {
      deleteLab(event._id);
    } else {
      deleteTask(event._id);
    }
  }

  let rowsContent;
  let deleteLabel;

  if (event.type === "lab") {
    // Lab-specific fields
    deleteLabel = t("action-delete");

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
    deleteLabel = t("action-undo");
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
          onClick={() => canDelete && handleDeleteEvent()}
        >
          {deleteLabel}
        </span>
      )}
    </td>    
  </tr>




}

export default EventListElement;