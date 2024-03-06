import { useTranslation } from 'react-i18next';
import Table from 'react-bootstrap/Table';

import { useFetchGrapesQuery } from "../../store";
import PlaceholderBlock from '../_shared/PlaceholderBlock';
import ListElement from "./ListElement";
import ErrorMsgBox from "../_shared/ErrorMsgBox";
import NoResultsMsgBox from '../_shared/NoResultsMsgBox';
import { useEffect } from 'react';



function List () {

  const { t } = useTranslation();

  const { data, error, isLoading, refetch } = useFetchGrapesQuery();
  // Refetch the data every time the days change  
  useEffect(() => {refetch()}, [refetch]);

  
  let content;

  const drawTable = (data) => {  

    const grapes = [...data]

    if (grapes.length === 0) {
      return <NoResultsMsgBox />
    }
    // Order the grapes by parcel
    grapes.sort((a, b) => (a.parcel > b.parcel) ? 1 : -1);
    

    return <Table bordered hover size="sm">
    <thead>
      <tr className="text-center table-secondary">
        <th>{t('grape-parcel')}</th>
        <th>{t('grape-variety')}</th>
        <th>{t('grape-area')}</th>
      </tr>
    </thead>
    <tbody>
      {grapes.map((grape) => <ListElement grape={grape} key={grape._id}></ListElement>)}
    </tbody>
  </Table>
   
  }

  if (isLoading) {
    content = <PlaceholderBlock times={3} />    
  } else if (error) {
      content =  <ErrorMsgBox />
  } else {
    content = drawTable(data);
  }


  return (content);
}

export default List;