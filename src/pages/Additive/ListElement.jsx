import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useDeleteAdditiveMutation } from "../../store";

function ListElement({ additive }) {

  const [deleteAdditive] = useDeleteAdditiveMutation();

  const [isHovered, setIsHovered] = useState(false);
  const { t } = useTranslation();


  const handleDelete = (id) => {
    deleteAdditive(id);
  };


  return (
    <tr
      // style={{ cursor: 'pointer' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <td>{additive.label}</td>
      <td className="text-center">{t(additive.unit)}</td>
      <td className="text-center">
        {isHovered && (
          <span
            style={{ cursor: 'pointer', color: 'red' }}
            onClick={() => handleDelete(additive._id)}
          >
            {t("additive-delete")}
          </span>
        )}
      </td>
    </tr>
  );
}

export default ListElement;