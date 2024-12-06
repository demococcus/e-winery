import { useParams } from 'react-router-dom';

import { useFetchTaskByIdQuery } from "../../store";
import PlaceholderBlock from '../_shared/PlaceholderBlock';
import ErrorMsgBox from '../_shared/ErrorMsgBox';
import WorksheetDetails from './WorksheetDetails';

function Worksheet() {

  // get the id of the wine from the URL
  const { id } = useParams(); 

  // fetch the wine
  const { data, error, isLoading } = useFetchTaskByIdQuery(id);

  let content;

  if (isLoading) {
    content = <div><PlaceholderBlock times={1}/></div>
  } else if (error) {
    content =  <ErrorMsgBox />
  } else {
    content = <WorksheetDetails  wineTask={data} />
  }  

  return (content);
};

export default Worksheet;