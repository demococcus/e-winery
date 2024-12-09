import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import PageTitle from '../_shared/PageTitle';
import List from './List';

function AdditiveList() {

  const { t } = useTranslation();

  const actionBar = (
    <div className="my-3">
      <Button as={Link} to="/additive/add" className="me-2" variant="primary">{t('additive-add-new')}</Button>
      <Button as={Link} to="/additive/report" className="me-2" variant="success">{t('additive-report')}</Button>
    </div>
  );


  return (
    <div>
      <PageTitle>{t('additive-title')}</PageTitle>
      <Row>
        <Col md="6">
          {actionBar}
          <List />
        </Col>
      </Row>
    </div>
  );
};

export default AdditiveList;