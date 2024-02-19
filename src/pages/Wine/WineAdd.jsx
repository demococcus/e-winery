import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Spinner } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { resetWineFormInput, useAddWineMutation } from "../../store";
import { useFetchVesselsQuery } from '../../store';
import ErrorMsgBox from '../_shared/ErrorMsgBox';
import SuccessMsgBox from '../_shared/SuccessMsgBox';
import PageTitle from '../_shared/PageTitle';

import { setWineFormInput } from '../../store';



function WineAdd() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();  
  const [addWine, results] = useAddWineMutation();
  const [validated, setValidated] = useState(false);  

  
  // Reset the form form when the component is mounted
  useEffect(() => {
    dispatch(resetWineFormInput());
  } , [dispatch]);

  // Get the values from the store
  const formInputData = useSelector((state) => state.wine.formInput);  

 
  // Fetch all vessels (refetch on every visit)
  const { data, error, isLoading, refetch } = useFetchVesselsQuery();
  useEffect(() => {refetch()}, [refetch]);


  let vesselsList;
  if (isLoading) {
    vesselsList = [];
  } else if (error) {
    vesselsList = [];
  } else {
    vesselsList= [...data];
  };

  // Filter the vessels to show only the empty and available vessels
  vesselsList = vesselsList.filter((vessel) => {
    return  ["empty", "available"].includes(vessel.status);
  });

  // Sort the vessels by label
  vesselsList.sort((a, b) => (a.label > b.label) ? 1 : -1);  

  
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    
    // create a copy of the formInputData with the new value
    const updatedData = {
      ...formInputData,
      [name]: value
    };

    // update the store
    dispatch(setWineFormInput(updatedData));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      // console.log("Form looks invalid");
    } else {
      // console.log("Form looks valid");      
      const newWine = {
        ...formInputData,
        vintage: parseInt(formInputData.vintage),
        quantity: parseInt(formInputData.quantity)
      };
      const submitResult = await addWine(newWine);

      // verify if the result succeeds
      if (submitResult.error) {
        console.log("An error occurred", submitResult.error);
        return;
      }

      // TODO show a confirmation ?

      // navigate to the home page
      navigate(`/wines`)
    }   
    setValidated(true);
  };
 

  return (<>
  <PageTitle>{t('wine-add-title')}</PageTitle>
  <Form noValidate validated={validated} onSubmit={handleSubmit}>
    
    <Row className="mb-3">
      <Form.Group as={Col} md="6" controlId="lot">
        <Form.Label>Lot</Form.Label>
        <Form.Control
          name='lot'
          type="text"
          value={formInputData.lot || ""} 
          onChange={handleChange}
          placeholder="Lot"
          required
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Please provide a lot. For exemple: Merlot 02.24 
        </Form.Control.Feedback>
      </Form.Group>        
    </Row>

    
    <Row className="mb-3">
      
      <Form.Group as={Col} md="2" controlId="Vintage">
        <Form.Label >Vintage</Form.Label>
        <Form.Control
          name='vintage'
          type="number"
          value={formInputData.vintage || ""} 
          onChange={handleChange}
          placeholder="Vintage"
          required
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Please provide a vintage.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group as={Col} md="4" controlId="status">
        <Form.Label >Status</Form.Label>
        
        <Form.Control
          name='status'
          as="select"
          value={formInputData.status || ""}
          onChange={handleChange}
          required
        >
          <option value="">Select status</option>
          <option value="FE">FE - Fermentation</option>
          <option value="MA">MA - Malic Fermentation</option>
          <option value="AG">AG - Aging</option>
          <option value="FR">FR - Freezing</option>
        </Form.Control>

        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Please choose a status.
        </Form.Control.Feedback>
      </Form.Group>        

    </Row>


    <Row className="mb-3">
      
      <Form.Group as={Col} md="3" controlId="tank">
        
        <Form.Label >Tank</Form.Label>
        <Form.Control
          name='vessel'
          as="select"
          value={formInputData.vessel || ""}
          onChange={handleChange}
          required
        >
          <option value="">Select tank</option>
          {vesselsList.map((vessel) => <option value={vessel._id} key={vessel._id}>{vessel.label}</option>)}

        </Form.Control>


        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Please choose a tank.
        </Form.Control.Feedback>
      </Form.Group>

      

      <Form.Group as={Col} md="3" controlId="quantity">
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          name='quantity'
          type="number"
          value={formInputData.quantity || ""} 
          onChange={handleChange}
          placeholder="Quantity"
          required
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Please provide a quantity.
        </Form.Control.Feedback>
      </Form.Group>        
    </Row>


    <Button 
      type="submit" 
      variant="primary" 
      disabled={results.isLoading || ""}
    >
      {results.isLoading ? (
        <>
          <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
          <span className='ms-2'>Please wait...</span>
        </>
      ) : (
        t("wine-submit")
      )}
    </Button>
    
    <Row className="mb-3">
      <Col md="8">
      {results.isError && <ErrorMsgBox />} 
      {results.isSuccess && <SuccessMsgBox>Your wine {formInputData.lot} has been created.</SuccessMsgBox> }  
      </Col>
    </Row>


  </Form>
  </>
  );

};

export default WineAdd;