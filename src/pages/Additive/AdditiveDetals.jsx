import { useTranslation } from 'react-i18next';
import { Button, Row, Col, Container, Spinner } from 'react-bootstrap';
import PageTitle from '../_shared/PageTitle';
import { useNavigate  } from 'react-router-dom';
import { useDeleteAdditiveMutation } from '../../store';

function AdditiveDetals({ additive }) {

  const [deleteAdditive, results] = useDeleteAdditiveMutation();

  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const handleDelete = () => { 
    deleteAdditive(additive._id);
    navigate('/additives')
  };

  const handleTopUp = () => {
    // navigate to edit page
    navigate(`/additive/receive/${additive._id}`)
  };


  const actionBar = <div className="mb-4">
        <Button 
            className='me-2' 
            variant="success" 
            onClick={handleTopUp}>{t('additive-receive-btn')}
        </Button>

        <Button 
            type="submit" 
            className='me-2' 
            variant="danger" 
            onClick={handleDelete}
            disabled={results.isLoading || ""}
        >
          {results.isLoading ? (
            <>
              <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
              <span className='ms-2'>Please wait...</span>
            </>
          ) : t('additive-delete-btn') }

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