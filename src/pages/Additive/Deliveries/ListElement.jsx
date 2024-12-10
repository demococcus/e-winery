import { useTranslation } from 'react-i18next';
import { useState } from "react";
import { useUndoReceiveAdditiveMutation } from "../../../store"; 

function ListElement({ data, firstDeliveryId }) {

  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false); 
  const [deleteDelivery] = useUndoReceiveAdditiveMutation();
  
  
  
  // only the most recent delivery can be deleted
  const canDelete = (data._id === firstDeliveryId);
  
  // show disabled undo button if it is not the most recent delivery
  const deleteActionStyle = canDelete ? { cursor: 'pointer', color: 'red' } : { cursor: '', color: 'gray' };

  // Transform event.date to a string object like '2021-09-01'
  const dateString = new Date(data.date).toISOString().split('T')[0];


  return (
    <tr
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}   
    >
      <td className="text-center">{dateString}</td>
      <td className="text-center">{data.quantity}</td>
      <td >{data.supplier}</td>
      
      <td className="text-center">
        {isHovered && (
          <span
            style={deleteActionStyle}
            onClick={() => canDelete &&  deleteDelivery(data._id)}
          >
            {t("action-undo")}
          </span>
        )}
      </td>
      
    </tr>
  );
}

export default ListElement;