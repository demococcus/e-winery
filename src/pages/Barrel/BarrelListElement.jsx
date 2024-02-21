import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useDeleteVesselMutation } from "../../store";

function BarrelListElement({ vessel }) {

  const [deleteVessel] = useDeleteVesselMutation();

  const [isHovered, setIsHovered] = useState(false);
  const { t } = useTranslation();

  const wineTag = vessel.wines.map((wine) => {
    return <div key={wine._id}>{wine.vintage} {wine.lot}</div>;
  });

  const handleDeleteVessel = (id) => {
    deleteVessel(id);
  };

  // can delete the vessel only if there are no wines in it
  const canDelete = vessel.wines.length === 0;

  // calculate the number of full barrels
  const fullBarrels = vessel.usedCapacity > 0 ? Math.round(vessel.usedCapacity / vessel.capacity) : null;


  return (
    <tr
      // style={{ cursor: 'pointer' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <td className="text-center">{vessel.label}</td>
      <td className="text-center">{vessel.capacity}</td>
      <td className="text-center">{vessel.number}</td>
      <td className="text-center">{fullBarrels}</td>
      <td>{wineTag}</td>
      <td>{t(`vessel-${vessel.status}`)}</td>
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

export default BarrelListElement;