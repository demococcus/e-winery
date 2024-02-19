function ListElement({ event }) {

  // Transform event.date to a string object like '2021-09-01'
  const dateString = new Date(event.date).toISOString().split('T')[0];

  return <tr>
    <td className="text-center">{dateString}</td>
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
    <td className="text-center">{event.userName}</td>    
  </tr>
}

export default ListElement;