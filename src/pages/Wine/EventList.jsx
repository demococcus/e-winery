import { useTranslation } from 'react-i18next';
import Table from 'react-bootstrap/Table';

import { useFetchWineHistoryQuery } from "../../store";
import PlaceholderBlock from '../_shared/PlaceholderBlock';
import EventListElement from "./EventListElement";
import ErrorMsgBox from "../_shared/ErrorMsgBox";


function EventList ({ wine }) {

  const { t } = useTranslation();

  const { data, error, isLoading } = useFetchWineHistoryQuery(wine);

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
            <th>{t('lab-location')}</th>
            <th>{t('lab-alcohol')}</th>
            <th>{t('lab-tAcids')}</th>
            <th>{t('lab-pH')}</th>
            <th>{t('lab-SO2')}</th>
            <th>{t('lab-tSO2')}</th>
            <th>{t('lab-vAcids')}</th>
            <th>{t('lab-sugars')}</th>
            <th>{t('lab-density')}</th>
            <th>{t('lab-mAcid')}</th>
            <th>{t('lab-cold')}</th>
            <th>{t('lab-hot')}</th>
            <th>{t('lab-corr-SO2')}</th>
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