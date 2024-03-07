/* eslint-disable react/prop-types */
import { useState } from "react";
import { useTranslation } from 'react-i18next';

import GrapeSubTask from "../History/GrapeTask";

import {useDeleteGrapeLabMutation } from "../../store"; 


function EventListElement({ event, firstOpId }) {

  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);  
  const [deleteLab] = useDeleteGrapeLabMutation();

  // hide the show the delete/undo button for secondary tasks
  const  showDeleteAction = !["vinification"].includes(event.type);
  
  // only the lab analysis and the most recent task can be deleted
  const canDelete = event.type === 'lab' || (event._id === firstOpId);

  // show disabled undo button if it is not the most recent task
  const deleteActionStyle = canDelete ? { cursor: 'pointer', color: 'red' } : { cursor: '', color: 'gray' };

  // lab analysis are deleted, tasks are undone
  const deleteLabel = event.type === "lab" ? t("action-delete") : t("action-undo");
 

  // Transfer event.date to a string object like '2021-09-01'
  const dateString = new Date(event.date).toISOString().split('T')[0];

  const handleDeleteEvent = () => {
    // console.log("Delete", event.type ,"event with id: ", event._id)    ;
    if (event.type === "lab") {
      deleteLab(event._id);
    }  
  }

  let rowsContent;

  if (event.type === "lab") {
    // Lab-specific fields
    rowsContent = (
      <> 
      <td className="text-center">{event.grapeParcel}</td>      
      <td className="text-center">{event.sugars}</td>     
      <td className="text-center">{event.tAcids}</td>      
      <td className="text-center">{event.pH}</td>           
    </>
    );
  } else {
    // Op-specific fields
    rowsContent = (
      <>
      <td className="text-center">{t("op-location-task")} {event.seqNumber}</td>
      <td colSpan={3}> <GrapeSubTask>{event}</GrapeSubTask> </td>    
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
      {isHovered && showDeleteAction && (
        <span
          style={deleteActionStyle}
          onClick={() => canDelete && handleDeleteEvent()}
        >
          {deleteLabel}
        </span>
      )}
    </td>    
  </tr>




}

export default EventListElement;