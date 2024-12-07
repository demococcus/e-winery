import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate  } from 'react-router-dom';
import { useDeleteAdditiveMutation } from "../../store";

function ListElement({ additive }) {

  const { t } = useTranslation();

  const navigate = useNavigate ();

  const handleRowClick = (additiveId) => {
    navigate(`/additive/${additiveId}`);
  };

  return (
    <tr    
      onClick={() => handleRowClick(additive._id)} 
      style={{ cursor: 'pointer' }}
    >
      <td>{additive.label}</td>
      <td className="text-center">{t(additive.quantity)}</td>
      <td className="text-center">{t(additive.unit)}</td>
    </tr>
  );
}

export default ListElement;