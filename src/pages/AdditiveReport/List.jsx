import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

import Table from 'react-bootstrap/Table';

import { useFetchAdditiveReportQuery } from '../../store';
import ErrorMsgBox from "../_shared/ErrorMsgBox";
import PlaceholderBlock from '../_shared/PlaceholderBlock';
import NoResultsMsgBox from '../_shared/NoResultsMsgBox';
// import ListElement from "./ListElement";


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
    // make a copy of the data
    const additives = [...data];

    // Order the tanks by label
    additives.sort((a, b) => (a.label > b.label) ? 1 : -1);

    
    // Create the table
    return <Table bordered hover size="sm">
    <thead>
      <tr className="text-center table-secondary">
        <th>{t('additive-label')}</th>
        <th>{t('additive-quantity')}</th>
        <th>{t('additive-unit')}</th>
        <th>{t('additive-acc')}</th>
      </tr>
    </thead>
    <tbody>
      {/* {additives.map((additive) => <ListElement additive={additive} key={additive._id} />)} */}
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