import { useTranslation } from 'react-i18next';

import { Button, Row, Col, Container, Spinner } from 'react-bootstrap';

import EventList from './EventList';
import PageTitle from '../_shared/PageTitle';
import { useNavigate  } from 'react-router-dom';
import { useUpdateWineMutation } from '../../store';


function WineDetails({ wine }) {

  const { t } = useTranslation();
  const [updateWine, results] = useUpdateWineMutation();
  const navigate = useNavigate();
  
  const handleArchive = () => { 
    updateWine({id: wine._id, "archived": !wine.archived});
  };

  const handleEdit = () => {
    // navigate to edit page
    navigate(`/wine/edit/${wine._id}`)
  };

  const handleAddLab = () => {
    navigate(`/lab/add/${wine._id}`)
  };

  const handleAddNote = () => {
    navigate(`/note/add/${wine._id}`)
  };

  const actionBar = <div className="mb-4">
        <Button className='me-2' variant="primary" disabled={wine.archived} onClick={handleAddLab}>{t('wine-add-lab')}</Button>
        <Button className='me-2' variant="primary" disabled={wine.archived} onClick={handleAddNote}>{t('wine-add-note')}</Button>
        <Button className='me-2' variant="success" disabled={wine.archived} onClick={handleEdit}>{t('wine-edit')}</Button>

        <Button 
          type="submit" 
          className='me-2'
          variant="outline-danger" 
          onClick={handleArchive}
          disabled={results.isLoading || ""}
        >
          {results.isLoading ? (
            <>
              <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
              <span className='ms-2'>Please wait...</span>
            </>
          ) : wine.archived ? t("wine-restore") : (
            t("wine-archive")
          ) }
        </Button>
        


      </div>

  const drawPrimaryDetails = (wine) => {

    let quantityDetails;
    if (!wine.archived && wine.vessel?.type === "tank") {
      const discrepancy = wine.quantity - wine.vessel.capacity * wine.vessel.number;
      quantityDetails = discrepancy > 0 ? 
        <span className='red-text ms-3'>{t("vessel-over-capacity")} {discrepancy} {t('liters')}</span> : 
        discrepancy < 0 ? 
        <span className='blue-text ms-3'>{t("vessel-need-top-up")} {Math.abs(discrepancy)} {t('liters')}</span> : 
        null
      } else if (!wine.archived && wine.vessel?.type === "barrel") {
        const discrepancy = wine.quantity % wine.vessel.capacity;
        const barrelDiscrepancy = discrepancy > 0 ? "~" : null;
        quantityDetails = <span className=' ms-3'>{barrelDiscrepancy}{Math.round(wine.quantity  / wine.vessel.capacity)} {t("wine-q-barrels")}</span>;

      };

    return (
      <Container className='my-4'>
      <Row>
        <Col className='col-md-2'>{t('wine-acc')}</Col>
        <Col>{wine.accounting}</Col>
      </Row>
      <Row>
        <Col className='col-md-2'>{t('wine-vintage')}</Col>
        <Col>{wine.vintage}</Col>
      </Row>
      <Row>
        <Col className='col-md-2'>{t('wine-vessel')}</Col>
        <Col>{wine.vessel?.label || t("vessel-na")}</Col>
      </Row>
      <Row>
        <Col className='col-md-2'>{t('wine-quantity')}</Col>
        <Col>{wine.quantity} {t('liters')} {quantityDetails}</Col>
      </Row>
      <Row>
        <Col className='col-md-2'>{t('wine-status')}</Col>
        <Col>{t(`wine-status-full-${wine.status}`)}</Col>
      </Row>
    </Container>
    );
    
  } 

  return (<div>
    <PageTitle>{wine.lot}{wine.archived && t('wine-archived')}</PageTitle>
    {drawPrimaryDetails(wine)}
    {actionBar}
    <div>{<EventList wine={wine}/>}</div>
  </div>);
};

export default WineDetails;