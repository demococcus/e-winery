import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

import Table from 'react-bootstrap/Table';

import { useFetchVesselsQuery } from '../../store';
import ErrorMsgBox from "../_shared/ErrorMsgBox";
import PlaceholderBlock from '../_shared/PlaceholderBlock';
import TankListElement from "./TankListElement";
import NoResultsMsgBox from '../_shared/NoResultsMsgBox';


function TankList () {
 
  const tankFilter = useSelector((state) => {
    return state.tank.tankFilter
  });

  const { t } = useTranslation();
  
  const { data, error, isLoading, refetch } = useFetchVesselsQuery('tank');
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

    // Order by label
    // vessels.sort((a, b) => (a.label > b.label) ? 1 : -1);

    vessels.sort((a, b) => {
      if (a.status !== b.status) {
        return a.status > b.status ? -1 : 1; // Sort by status first
      }
      return a.label > b.label ? 1 : -1; // If status is the same, sort by label
    });
    

    // Filter by tankFilter
    const filteredResult = vessels.filter((vessel) => {
      if (tankFilter === 'all') {return true;}
      return vessel.status === tankFilter;     
    });

    
    
    // Create the table
    return <Table bordered hover size="sm">
    <thead>
      <tr className="text-center table-secondary">
        <th>{t('tank-label')}</th>
        <th>{t('vessel-capacity')}</th>
        <th>{t('vessel-wine')}</th>
        <th>{t('vessel-status')}</th>
        <th>{t('action-actions')}</th>
      </tr>
    </thead>
    <tbody>
      {filteredResult.map((vessel) => <TankListElement vessel={vessel} key={vessel._id} />)}
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

export default TankList;