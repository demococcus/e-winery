/* eslint-disable react/prop-types */
import { useNavigate  } from 'react-router-dom';

import { getDateDaysAgo } from '../../utils';

import { useTranslation } from 'react-i18next';

function ListElement({wine}) {

  const { t } = useTranslation();

  const navigate = useNavigate ();

  const handleRowClick = (wineId) => {
    navigate(`/wine/${wineId}`);
  };

  let dateBottledStr = wine.dateBottled ? wine.dateBottled.split('T')[0] : null;

  return(
    <tr 
      onClick={() => handleRowClick(wine._id)} 
      style={{ cursor: 'pointer' }}

    >
      <td className="text-center">{wine.vintage}</td>
      <td className="text-center">{wine.accounting}</td>
      <td>{wine.lot}</td>
      <td className="text-end">{wine.quantity}</td>
      <td className="text-center">{dateBottledStr}</td>
    </tr>
  )


}

export default ListElement;