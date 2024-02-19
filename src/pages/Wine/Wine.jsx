import { useParams } from 'react-router-dom';

import { useFetchWineByIdQuery } from "../../store";
import PlaceholderBlock from '../_shared/PlaceholderBlock';
import ErrorMsgBox from '../_shared/ErrorMsgBox';
import WineDetails from './WineDetails';
import EditForm from './EditForm';


function Wine( {editMode} ) {

  // get the id of the wine from the URL
  const { id } = useParams(); 

  // fetch the wine
  const { data, error, isLoading } = useFetchWineByIdQuery(id);

  let content;

  if (isLoading) {
    content = <div><PlaceholderBlock times={1}/></div>
  } else if (error) {
    content =  <ErrorMsgBox />
  } else {
    content = editMode ? <EditForm wine={data} /> : <WineDetails wine={data} />
  }  

  return (content);
};

export default Wine;