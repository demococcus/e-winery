import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { setBarrelFilter } from "../../store";
import PageTitle from '../_shared/PageTitle';
import BarrelList from './BarrelList';

function Barrel() {

  const { t } = useTranslation();
  const dispatch = useDispatch();


  const barrelFilter = useSelector((state) => {
    return state.barrel.barrelFilter
  });


  const handleFilterChange = (eventKey) => { 
    dispatch(setBarrelFilter(eventKey));     
  };

  const actionBar = (
    <div className="d-flex justify-content-between my-3">
        <div>
          <Button as={Link} to="/barrel/add" className="me-2" variant="primary">{t('vessel-add-new')}</Button>
        </div>
        <div>
            <DropdownButton 
              id="dropdown-basic-button" 
              title={t(`vessel-${barrelFilter}`)} 
              variant="outline-primary" 
              onSelect={handleFilterChange}
            >
              <Dropdown.Item eventKey="all">{t('vessel-all')}</Dropdown.Item>
              <Dropdown.Item eventKey="full">{t('vessel-full')}</Dropdown.Item>
              <Dropdown.Item eventKey="empty">{t('vessel-empty')}</Dropdown.Item>
              <Dropdown.Item eventKey="over-capacity">{t('vessel-over-capacity')}</Dropdown.Item>
              <Dropdown.Item eventKey="need-top-up">{t('vessel-need-top-up')}</Dropdown.Item>
            </DropdownButton>
        </div>
    </div>
);


  return (
    <div>
      <PageTitle>{t('barrels-title')}</PageTitle>
      <Row>
        <Col md="10">
          {actionBar}
          <BarrelList />
        </Col>
      </Row>
    </div>
  );
};

export default Barrel;