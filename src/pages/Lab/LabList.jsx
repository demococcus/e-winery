import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from "react-redux";

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { labSetPeriodFilter } from "../../store";
import PageTitle from '../_shared/PageTitle';
import List from './List';



function LabList () {

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const periodFilter = useSelector((state) => {
    return state.lab.periodFilter
  });


  const handleFilterChange = (eventKey) => {
    dispatch(labSetPeriodFilter(eventKey));     
  }

  const actionBar = (
    <div className="d-flex justify-content-between my-3">
      <div></div>
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
      <PageTitle>{t('lab-title')}</PageTitle>
      {actionBar}
      <List resultsNumber={periodFilter}/>
    </div>
  );
};

export default LabList;