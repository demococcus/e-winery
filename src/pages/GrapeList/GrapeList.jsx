import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import List from './List';
import PageTitle from '../_shared/PageTitle';



function GrapeList () {

  const { t } = useTranslation();


  const actionBar = (
    <div className="d-flex justify-content-between my-3">
    <div>
      <Button as={Link} to="/grape/add" className="me-2" variant="primary">{t('grape-add-new')}</Button>
    </div>

    </div>
);


  return (
    <div>
      <PageTitle>{t('grape-title')}</PageTitle>
      <Row>
        <Col md="8">
        {actionBar}
        <List />
        </Col>
      </Row>

      
    </div>
  );
}

export default GrapeList;