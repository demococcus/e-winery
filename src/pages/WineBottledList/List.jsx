import { useTranslation } from 'react-i18next';
import Table from 'react-bootstrap/Table';

import { useFetchWinesBottledQuery } from "../../store";
import PlaceholderBlock from '../_shared/PlaceholderBlock';
import ListElement from "./ListElement";
import ErrorMsgBox from "../_shared/ErrorMsgBox";
import NoResultsMsgBox from '../_shared/NoResultsMsgBox';
import { useEffect } from 'react';



function List ({searchParams: {lot, dateFrom, dateTo}}) {

  const { t } = useTranslation();

  // convert the dates to YYY-MM-DD
  const dateFromS = dateFrom.toISOString().split('T')[0];
  const dateToS = dateTo.toISOString().split('T')[0];

  const params = {lot, dateTo: dateToS, dateFrom: dateFromS}
  // console.log("params", params)


  const { data, error, isLoading, refetch } = useFetchWinesBottledQuery(params);
  // Refetch the data every time the days change  
  useEffect(() => {refetch()}, [refetch]);
 
  let content;

  const drawTable = (data) => {  

    if (data.length === 0) {
      return <NoResultsMsgBox />
    }

    const wines = [...data]

    // Order the wines by lot
    // wines.sort((a, b) => (a.lot > b.lot) ? 1 : -1);

    wines.sort((a, b) => {
    if (a.vintage !== b.vintage) {
        return a.vintage > b.vintage ? -1 : 1; // Sort by vintage first
    }
    return a.lot > b.lot ? 1 : -1; // Then sort by lot
});

    

    return <Table bordered hover size="sm">
    <thead>
      <tr className="text-center table-secondary">
        <th>{t('wine-vintage')}</th>
        <th>{t('wine-acc')}</th>
        <th>{t('wine-lot')}</th>
        <th>{t('wine-quantity')}</th>
        <th>{t('wine-bottled-date')}</th>
      </tr>
    </thead>
    <tbody>
      {wines.map((wine) => <ListElement wine={wine} key={wine._id}></ListElement>)}
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
};

export default List;