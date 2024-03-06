import { useTranslation } from 'react-i18next';
import Table from 'react-bootstrap/Table';

import { useFetchGrapeHistoryQuery } from "../../store";
import PlaceholderBlock from '../_shared/PlaceholderBlock';
import EventListElement from "./EventListElement";
import ErrorMsgBox from "../_shared/ErrorMsgBox";


function EventList ({ grape }) {

  const { t } = useTranslation();

  const { data, error, isLoading } = useFetchGrapeHistoryQuery(grape);

  let content;

  const drawTable = () => {

    if (data.length === 0) {
      // return <Alert key='secondary' variant='secondary'>{t('NoResults')}</Alert>
      return
    }

    // sort by date
    const events = [...data];
    // Order the wines by lot
    events.sort((a, b) => (a.date < b.date) ? 1 : -1);

    // get the first element of type different than lab
    const firstOp = events.find(event => event.type !== 'lab');

    // if the type of fistOp is not 'lab' and not 'blend-out' assign his _id to a variable
    const firstOpId = firstOp ? firstOp._id : null;


    return (
      <Table bordered hover size="sm">
        <thead>
          <tr className="text-center table-secondary">
            <th>{t('lab-date')}</th>
            <th>{t('lab-sugars')}</th>
            <th>{t('lab-tAcids')}</th>
            <th>{t('lab-pH')}</th>
            <th>{t('lab-user')}</th>
            <th>{t('action-actions')}</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => <EventListElement event={event} firstOpId={firstOpId} key={event._id}/>)}    
        </tbody>
      </Table> 
    );   
  };

  if (isLoading) {
    content = <PlaceholderBlock times={3} />
  } else if (error) {
    content =  <ErrorMsgBox />
  } else {
    content = drawTable();
  }


  return content;
};

export default EventList;