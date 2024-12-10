import { useTranslation } from 'react-i18next';
import Table from 'react-bootstrap/Table';
import ListElement from "./ListElement";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function List ({data}) {

  // console.log('data', data)
 
  const { t } = useTranslation();

  if (data.lenght < 1) {return <div>No records !</div> }

  // Order by date

  const deliveries = [...data];
  
  deliveries.sort((a, b) => (a.date > b.date) ? -1 : 1);

  // get the first element of type different than lab
  const firstDelivery = deliveries[0]
  const firstDeliveryId = firstDelivery ? firstDelivery._id : null;

  const drawTable = () => {
    return (
      <Table bordered hover size="sm">
      <thead>
        <tr className="text-center table-secondary">
          <th>{t('a-report-date')}</th>
          <th>{t('additive-quantity')}</th>
          <th>{t('additive-supplier')}</th>
          <th>{t('action-actions')}</th>
        </tr>
      </thead>
      <tbody>
        {deliveries.map((delivery) => <ListElement data={delivery} firstDeliveryId={firstDeliveryId} key={delivery._id} />)}
      </tbody>
    </Table>
    )
  }
       
  // Create the table
  return (<>
    <Row>
    <Col lg="8">
      <div className='my-2'>{t('additive-recent-deliveries')}</div>
      {drawTable()}
    </Col>
  </Row> 
  </>)
   


};

export default List;