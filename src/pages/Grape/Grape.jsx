import { useParams } from 'react-router-dom';

import { useFetchGrapeByIdQuery } from "../../store";
import PlaceholderBlock from '../_shared/PlaceholderBlock';
import ErrorMsgBox from '../_shared/ErrorMsgBox';
import GrapeDetails from './GrapeDetails';

function Grape() {

  // get the id of the grape from the URL
  const { id } = useParams(); 

  // fetch the wine
  const { data, error, isLoading } = useFetchGrapeByIdQuery(id);

  let content;

  if (isLoading) {
    content = <div><PlaceholderBlock times={1}/></div>
  } else if (error) {
    content =  <ErrorMsgBox />
  } else {
    content = <GrapeDetails grape={data} />
  }  

  return (content);
}

export default Grape;