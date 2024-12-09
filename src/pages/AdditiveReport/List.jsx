import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

import Table from 'react-bootstrap/Table';

import { useFetchAdditiveReportQuery } from '../../store';
import ErrorMsgBox from "../_shared/ErrorMsgBox";
import PlaceholderBlock from '../_shared/PlaceholderBlock';
import NoResultsMsgBox from '../_shared/NoResultsMsgBox';
import ListElement from "./ListElement";
import { Button } from 'react-bootstrap';


function List ({searchParams: {accounting, dateFrom, dateTo}}) {
 
    const { t } = useTranslation();

    // convert the dates to YYY-MM-DD
    const dateFromS = dateFrom.toISOString().split('T')[0];
    const dateToS = dateTo.toISOString().split('T')[0];

    const params = {accounting, dateTo: dateToS, dateFrom: dateFromS}
    // console.log("params", params)
 

  const { data, error, isLoading, refetch } = useFetchAdditiveReportQuery(params);
  useEffect(() => {
    refetch();
  }, [refetch]);

 
  let content;

  const drawTable = (data) => {

    // Show message if no results are found        
    if (data.length === 0) {
      return <NoResultsMsgBox></NoResultsMsgBox>
    }

    
    // Create the table
    return <Table bordered hover size="sm">
    <thead>
      <tr className="text-center table-secondary">
      <th>{t('a-report-date')}</th>
        <th>{t('a-report-additive')}</th>
        <th>{t('a-report-additive-acc')}</th>
        <th>{t('a-report-additive-quantity')}</th>
        <th>{t('a-report-additive-units')}</th>
        <th>{t('a-report-wine')}</th>
        <th>{t('a-report-wine-acc')}</th>
      </tr>
    </thead>
    <tbody>
      {data.map((op) => <ListElement op={op} key={op._id} />)}
    </tbody>
  </Table>
   
  }

  if (isLoading) {
    content = <PlaceholderBlock times={3} />    
  } else if (error) {
      content =  <ErrorMsgBox />
  } else {
    content = (<>
      <div className='d-none d-print-inline'>
        <span className='me-4'>{t('additive-acc')}: {accounting}</span>
        <span className='me-4'>{t('additive-date-from')}: {dateFromS}</span>
        <span>{t('additive-date-to')}: {dateToS}</span>
      </div>
      
      {drawTable(data)}

      {data.length > 0 && <div className='d-print-none'>
        <Button className='me-2' variant="success" onClick={() => window.print()}>{t('ws-print-task')}</Button>
      </div>}

    </>);
  }


  return (content);
};

export default List;