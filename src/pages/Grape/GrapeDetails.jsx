/* eslint-disable react/prop-types */
import { useTranslation } from 'react-i18next';

import { Button, Row, Col, Container, Spinner } from 'react-bootstrap';

import EventList from './EventList';
import PageTitle from '../_shared/PageTitle';
import { useNavigate  } from 'react-router-dom';
import { useUpdateGrapeMutation } from '../../store';


// eslint-disable-next-line react/prop-types
function GrapeDetails({ grape }) {

  const { t } = useTranslation();
  const [updateGrape, results] = useUpdateGrapeMutation();
  const navigate = useNavigate();
  
  const handleArchive = () => { 
    updateGrape({id: grape._id, "archived": !grape.archived});
  };

  const handleAddLab = () => {
    // navigate to edit page
    navigate(`/lab/grape/add/${grape._id}`)
  };

  const actionBar = <div className="mb-4">
    <Button className='me-2' variant="primary" disabled={grape.archived} onClick={handleAddLab}>{t('grape-add-lab')}</Button>

    <Button 
      type="submit" 
      className='me-2'
      variant="outline-secondary" 
      onClick={handleArchive}
      disabled={results.isLoading || ""}
    >
      {results.isLoading ? (
        <>
          <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
          <span className='ms-2'>Please wait...</span>
        </>
      ) : grape.archived ? t("wine-restore") : (
        t("wine-archive")
      ) }
    </Button>

  </div>

  const drawPrimaryDetails = (wine) => {


    return (
      <Container className='my-4'>

      <Row>
        <Col className='col-md-2'>{t('grape-variety')}</Col>
        <Col>{wine.variety}</Col>
      </Row>

      <Row>
        <Col className='col-md-2'>{t('grape-area')}</Col>
        <Col>{wine.area}</Col>
      </Row>

    </Container>
    );
    
  } 

  return (<div>
    <PageTitle>{grape.parcel}{grape.archived && t('grape-archived')}</PageTitle>

    <Row>
        <Col md="8">
          {drawPrimaryDetails(grape)}
          {actionBar}
          <div>{<EventList grape={grape}/>}</div>
        </Col>
      </Row>


    
  </div>);
}

export default GrapeDetails;