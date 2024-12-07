/* eslint-disable react/prop-types */
import { useNavigate  } from 'react-router-dom';

import { getDateDaysAgo } from '../../utils';

import './ListElement.css';
import { useTranslation } from 'react-i18next';

function ListElement({wine}) {

  const { t } = useTranslation();

  const navigate = useNavigate ();

  const handleRowClick = (wineId) => {
    navigate(`/wine/${wineId}`);
  };

  let labClass = ''
  let labDateString = ''

  if (wine.lastLab !== null) {

 
    // convert the date in a string like '2021-11-26'
     labDateString = wine.lastLab.split('T')[0];
  
     const agLabDue = wine.lastLab < getDateDaysAgo(30) &&  wine.status === "AG";
     const feLabDue = wine.lastLab < getDateDaysAgo(3) &&  wine.status === "FE";
     const maLabDue = wine.lastLab < getDateDaysAgo(5) &&  wine.status === "MA";
  
    
    if (agLabDue) {
      labClass="red-text"
    } else if (feLabDue) {
      labClass="magenta-text"
    } else if (maLabDue) {
      labClass="blue-text"
    }
  }

  const vesselLabel = wine.vessel !== null ? wine.vessel.label : 'N/A'

  let quantityDetails;
  if (!wine.archived && wine.vessel?.type === "tank" && ["MA", "AG"].includes(wine.status)) {
    const discrepancy = wine.quantity - wine.vessel.capacity * wine.vessel.number;
    quantityDetails = discrepancy > 0 ? 
    <div className='red-text'>+{discrepancy}</div> : 
    discrepancy < 0 ? <div className='blue-text'>{discrepancy}</div> : 
    null
  } else if (!wine.archived && wine.vessel?.type === "barrel") {

    const discrepancy = wine.quantity % wine.vessel.capacity;
    const barrelDiscrepancy = discrepancy > 0 ? "~" : null;
    quantityDetails = <div>{barrelDiscrepancy}{Math.round(wine.quantity  / wine.vessel.capacity)} {t("wine-q-barrels")}</div>;
  }



  return(
    <tr 
      onClick={() => handleRowClick(wine._id)} 
      style={{ cursor: 'pointer' }}

    >
      <td className="text-center">{wine.vintage}</td>
      <td className="text-center">{wine.accounting}</td>
      <td>{wine.lot}</td>
      <td className="text-center">{vesselLabel}</td>
      <td className="text-end">{wine.quantity}</td>
      <td className="text-center">{quantityDetails}</td>
      <td className="text-center">{t(`wine-status-${wine.status}`)}</td>
      <td className="text-center"><span className={labClass}>{labDateString}</span></td>
    </tr>
  )


}

export default ListElement;