import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

import Table from 'react-bootstrap/Table';

import { useFetchVesselsQuery } from '../../store';
import ErrorMsgBox from "../_shared/ErrorMsgBox";
import PlaceholderBlock from '../_shared/PlaceholderBlock';
import BarrelListElement from "./BarrelListElement";
import NoResultsMsgBox from '../_shared/NoResultsMsgBox';


function BarrelList () {
 
  const barrelFilter = useSelector((state) => {
    return state.barrel.barrelFilter
  });

  const { t } = useTranslation();
 

  const { data, error, isLoading, refetch } = useFetchVesselsQuery('barrel');
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
    const vessels = [...data];

    // Order the tanks by label
    vessels.sort((a, b) => (a.label > b.label) ? 1 : -1);

    // Filter by barrelFilter
    const filteredResult = vessels.filter((vessel) => {
      if (barrelFilter === 'all') {return true;}
      return vessel.status === barrelFilter;     
    });
    
    
    // Create the table
    return <Table bordered hover size="sm">
    <thead>
      <tr className="text-center table-secondary">
        <th>{t('vessel-label')}</th>
        <th>{t('vessel-capacity')}</th>
        <th>{t('vessel-number')}</th>
        <th>{t('vessel-full')}</th>
        <th>{t('vessel-wine')}</th>
        <th>{t('vessel-status')}</th>
        <th>{t('action-actions')}</th>
      </tr>
    </thead>
    <tbody>
      {filteredResult.map((vessel) => <BarrelListElement vessel={vessel} key={vessel._id} />)}
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

export default BarrelList;