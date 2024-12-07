import { useParams } from 'react-router-dom';

import { useFetchAdditiveByIdQuery } from "../../store";
import PlaceholderBlock from '../_shared/PlaceholderBlock';
import ErrorMsgBox from '../_shared/ErrorMsgBox';
import AdditiveDetals from './AdditiveDetals';

function Additive() {

  // get the id of the additive from the URL
  const { id } = useParams(); 

  // fetch the data
  const { data, error, isLoading } = useFetchAdditiveByIdQuery(id);

  let content;

  if (isLoading) {
    content = <div><PlaceholderBlock times={1}/></div>
  } else if (error) {
    content =  <ErrorMsgBox />
  } else {
    // console.log(data)
    content = <AdditiveDetals additive={data} />
  }  

  return (content);
};

export default Additive;