import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

import Table from 'react-bootstrap/Table';

import { useFetchAdditivesQuery } from '../../store';
import ErrorMsgBox from "../_shared/ErrorMsgBox";
import PlaceholderBlock from '../_shared/PlaceholderBlock';
import NoResultsMsgBox from '../_shared/NoResultsMsgBox';
import ListElement from "./ListElement";


function AdditiveList () {
 
  const { t } = useTranslation();
 

  const { data, error, isLoading, refetch } = useFetchAdditivesQuery();
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
        <th>{t('additive-unit')}</th>
        <th>{t('additive-actions')}</th>
      </tr>
    </thead>
    <tbody>
      {additives.map((additive) => <ListElement additive={additive} key={additive._id} />)}
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

export default AdditiveList;