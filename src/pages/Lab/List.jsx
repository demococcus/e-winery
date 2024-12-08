import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

import Table from 'react-bootstrap/Table';

import { useFetchWineLabsQuery } from "../../store";
import PlaceholderBlock from '../_shared/PlaceholderBlock';
import ErrorMsgBox from '../_shared/ErrorMsgBox';
import NoResultsMsgBox from '../_shared/NoResultsMsgBox';
import ListElement from './ListElement';


function List ({ resultsNumber }) {

  const { t } = useTranslation();

  const { data, error, isLoading, refetch } = useFetchWineLabsQuery(resultsNumber);

  // Refetch the data every time the days change  
  useEffect(() => {refetch()}, [resultsNumber, refetch]);

  let content;

  const drawTable = () => {

    if (data.length === 0) {
      return <NoResultsMsgBox></NoResultsMsgBox>
    }

    // sort by date
    const labs = [...data];
    // Order the wines by lot
    labs.sort((a, b) => (a.date < b.date) ? 1 : -1);

    return <Table bordered hover size="sm">
    <thead>
      <tr className="text-center table-secondary">
        <th>{t('lab-date')}</th>
        <th>{t('wine-vessel')}</th>
        <th>{t('wine-lot')}</th>
        <th>{t('lab-alcohol-short')}</th>
        <th>{t('lab-tAcids-short')}</th>
        <th>{t('lab-pH')}</th>
        <th>{t('lab-SO2')}</th>
        <th>{t('lab-tSO2')}</th>
        <th>{t('lab-vAcids-short')}</th>
        <th>{t('lab-sugars')}</th>
        <th>{t('lab-density')}</th>
        <th>{t('lab-mAcid-short')}</th>
        <th>{t('lab-cold')}</th>
        <th>{t('lab-hot')}</th>
        <th>{t('lab-corr-SO2-short')}</th>
        <th>{t('lab-user')}</th>
      </tr>
    </thead>
    <tbody>
      {labs.map(lab => <ListElement key={lab._id} event={lab} canDelete />)}      
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