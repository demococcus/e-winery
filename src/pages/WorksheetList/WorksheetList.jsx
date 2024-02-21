import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';

import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

import { setWorksheetPeriodFilter } from "../../store";
import PageTitle from '../_shared/PageTitle';
import List from './List';



function WorksheetList () {

  const { t } = useTranslation();
  const dispatch = useDispatch();


  const periodFilter = useSelector((state) => {
    return state.worksheet.periodFilter
  });

  const handleFilterChange = (eventKey) => {
    dispatch(setWorksheetPeriodFilter(eventKey));     
  }

  const actionBar = (
    <div className="d-flex justify-content-between my-3">
      <div>
        <Button as={Link} to="/worksheet/add" className="me-2" variant="primary">{t('ws-add-new')}</Button>
      </div>
      <div>
        <DropdownButton id="dropdown-basic-button" title={t(`event-period-${periodFilter}`)} variant="outline-primary" onSelect={handleFilterChange}>
          <Dropdown.Item eventKey="30">{t("event-period-30")}</Dropdown.Item>
          <Dropdown.Item eventKey="90">{t("event-period-90")}</Dropdown.Item>
        </DropdownButton>
      </div>
    </div>
);


  return (
    <div>
      <PageTitle>{t('ws-title')}</PageTitle>
      {actionBar}
      <List resultsNumber={periodFilter}/>
    </div>
  );
};

export default WorksheetList;