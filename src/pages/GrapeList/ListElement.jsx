/* eslint-disable react/prop-types */
import { useNavigate  } from 'react-router-dom';

function ListElement({grape}) {

  const navigate = useNavigate ();

  const handleRowClick = (wineId) => {
    navigate(`/grape/${wineId}`);
  };


  return(
    <tr 
      onClick={() => handleRowClick(grape._id)} 
      style={{ cursor: 'pointer' }}   >
      <td>{grape.parcel}</td>
      <td>{grape.variety}</td>
      <td className="text-end">{grape.area}</td>
    </tr>
  )


}

export default ListElement;