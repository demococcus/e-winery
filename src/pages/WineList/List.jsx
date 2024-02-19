import { useTranslation } from 'react-i18next';
import { useSelector } from "react-redux";

import Table from 'react-bootstrap/Table';

import { getCurrentVintage } from "../../utils";
import { useFetchWinesQuery } from "../../store";
import PlaceholderBlock from '../_shared/PlaceholderBlock';
import ListElement from "./ListElement";
import ErrorMsgBox from "../_shared/ErrorMsgBox";
import NoResultsMsgBox from '../_shared/NoResultsMsgBox';
import { useEffect } from 'react';



function List () {

  const { t } = useTranslation();

  const { data, error, isLoading, refetch } = useFetchWinesQuery();
  // Refetch the data every time the days change  
  useEffect(() => {refetch()}, [refetch]);

  const vintageFilter = useSelector((state) => {
    return state.wine.vintageFilter
  });

  const currentVintage = getCurrentVintage();
  
  let content;

  const drawTable = (data) => {  

    const wines = [...data]

    // Order the wines by lot
    wines.sort((a, b) => (a.lot > b.lot) ? 1 : -1);

    // filter wines by vintage data
    const filteredWines = wines.filter((wine) => {
      if (vintageFilter === 'past') {
        return wine.vintage < currentVintage;
      } else {
        return wine.vintage >= currentVintage;
      }     
    });

    if (filteredWines.length === 0) {
      return <NoResultsMsgBox />
    }

    return <Table bordered hover size="sm">
    <thead>
      <tr className="text-center table-secondary">
        <th>{t('wine-vintage')}</th>
        <th>{t('wine-lot')}</th>
        <th>{t('wine-vessel')}</th>
        <th>{t('wine-quantity')}</th>
        <th>{t('wine-q-details')}</th>
        <th>{t('wine-status')}</th>
        <th>{t('wine-lab-date')}</th>
      </tr>
    </thead>
    <tbody>
      {filteredWines.map((wine) => <ListElement wine={wine} key={wine._id}></ListElement>)}
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