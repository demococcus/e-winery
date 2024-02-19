import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

import Table from 'react-bootstrap/Table';

import PlaceholderBlock from '../_shared/PlaceholderBlock';
import ErrorMsgBox from "../_shared/ErrorMsgBox";
import NoResultsMsgBox from '../_shared/NoResultsMsgBox';
import ListElement from './ListElement';

import { useFetchWineTasksQuery } from "../../store";


  
function List({ resultsNumber }) {
    
  const { t } = useTranslation();
  
  const { data, error, isLoading, refetch } = useFetchWineTasksQuery(resultsNumber);
  
  // Refetch the data every time the days change  
  useEffect(() => {refetch()}, [resultsNumber, refetch]);


  let content;

  const drawTable = () => {

    if (data.length === 0) {
      return <NoResultsMsgBox></NoResultsMsgBox>
    }

    // sort by date (should be already sorted by the API, but just in case...)
    const wineTasks = [...data];
    // Order the wines by lot
    wineTasks.sort((a, b) => (a.date < b.date) ? 1 : -1);

    return <Table bordered hover size="sm">
    <thead>
      <tr className="text-center table-secondary">
        <th>{t('ws-Date')}</th>
        <th>{t('ws-Task')}</th>
        <th>{t('ws-Description')}</th>
        <th>{t('ws-User')}</th>
      </tr>
    </thead>
    <tbody>
      {wineTasks.map(wineTask => <ListElement wineTask={wineTask} key={wineTask._id}/>)}      
    </tbody>
  </Table>    
  }

  if (isLoading) {
    content = <PlaceholderBlock times={3} />
  } else if (error) {
    content =  <ErrorMsgBox>{error}</ErrorMsgBox>
  } else {
    content = drawTable(data);
  }

  return (
    <div>{content}</div>
  );
};

export default List;