import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';

import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

import List from './List';
import PageTitle from '../_shared/PageTitle';
import { setVintageFilter } from "../../store";



function WineList () {

  const { t } = useTranslation();
  const dispatch = useDispatch();


  const vintageFilter = useSelector((state) => {
    return state.wine.vintageFilter
  });

  const handleFilterChange = (eventKey) => {
    dispatch(setVintageFilter(eventKey));     
  }



  const actionBar = (
    <div className="d-flex justify-content-between my-3">
    <div>
      <Button as={Link} to="/wine/add" className="me-2" variant="primary">{t('wine-add-new')}</Button>
      <Button as={Link} to="/wines/bottled" className="me-2" variant="success">{t('wine-bottled-btn')}</Button>
    </div>
    <div>
      <DropdownButton id="dropdown-basic-button" title={t(`wine-filter-${vintageFilter}`)} variant="outline-primary" onSelect={handleFilterChange}>
        <Dropdown.Item eventKey="current">{t('wine-filter-current')}</Dropdown.Item>
        <Dropdown.Item eventKey="past">{t('wine-filter-past')}</Dropdown.Item>
      </DropdownButton>
    </div>
    </div>
);


  return (
    <div>
      <PageTitle>{t('wine-title')}</PageTitle>
      {actionBar}
      <List />
    </div>
  );
};

export default WineList;