import { useTranslation } from 'react-i18next';
import { Button, Row, Col, Container, Spinner } from 'react-bootstrap';
import PageTitle from '../_shared/PageTitle';
import { useNavigate  } from 'react-router-dom';


function AdditiveDetals({ additive }) {

  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const handleDelete = () => { 
    console.log("Delete additive")
  };

  const handleTopUp = () => {
    // navigate to edit page
    navigate(`/additive/topup/${additive._id}`)
  };


  const actionBar = <div className="mb-4">
        <Button 
            className='me-2' 
            variant="success" 
            onClick={handleTopUp}>{t('additive-receive-btn')}
        </Button>

        <Button 
            className='me-2' 
            variant="danger" 
            onClick={handleDelete}>{t('additive-delete-btn')}
        </Button>

      </div>


  return (<div>
    <PageTitle>{additive.label}</PageTitle>

    <Container className='my-4'>
      <Row>
        <Col className='col-md-2'>{t("additive-quantity")}</Col>
        <Col>{t(additive.quantity)}</Col>
      </Row>
      <Row>
        <Col className='col-md-2'>{t("additive-unit")}</Col>
        <Col>{t(additive.unit)}</Col>
      </Row>
    </Container>

    {actionBar}
  </div>);
};

export default AdditiveDetals;