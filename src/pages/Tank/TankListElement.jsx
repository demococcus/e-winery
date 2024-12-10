import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useDeleteVesselMutation } from "../../store";
import './TankListElement.css';

function TanksListElement({ vessel }) {

  const [deleteVessel] = useDeleteVesselMutation();

  const [isHovered, setIsHovered] = useState(false);
  const { t } = useTranslation();

  const wineTag = vessel.wines.map((wine) => {
    return <div key={wine._id}>{wine.vintage} {wine.lot}</div>;
  });

  const handleDeleteVessel = (id) => {
    deleteVessel(id);
  };

  const canDelete = vessel.wines.length === 0;

  return (
    <tr
      // style={{ cursor: 'pointer' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      <td className={vessel.status !== 'empty' ? 'text-red' : ''}>
        {vessel.label}
      </td>

      <td className="text-center">{vessel.capacity}</td>
      <td>{wineTag}</td>
      
      {/* <td className={"text-center"}>{t(`vessel-${vessel.status}`)}</td> */}


      <td className="text-center">
        {isHovered && (
          <span
            style={{ cursor: canDelete ? 'pointer' : '', color: canDelete ? 'red' : 'gray' }}
            onClick={() => canDelete && handleDeleteVessel(vessel._id)}
          >
            {t("action-delete")}
          </span>
        )}
      </td>
    </tr>
  );
}

export default TanksListElement;