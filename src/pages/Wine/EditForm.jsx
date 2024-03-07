/* eslint-disable react/prop-types */
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Spinner } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useUpdateWineMutation } from '../../store';
import { useFetchVesselsQuery } from '../../store';
import ErrorMsgBox from '../_shared/ErrorMsgBox';
import PageTitle from '../_shared/PageTitle';
import { setWineFormInput } from '../../store';

function EditForm({ wine }) {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();  

  const [validated, setValidated] = useState(false);  
  const [updateWine, results] = useUpdateWineMutation();


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

  // Append the current vessel to the list if it is not already there
  if (wine.vessel && !vesselsList.find(vessel => vessel._id === wine.vessel._id))
  vesselsList.push({label: wine.vessel.label, _id: wine.vessel._id});

  // Sort the vessels by label
  vesselsList.sort((a, b) => (a.label > b.label) ? 1 : -1); 

  // send the details in the store on the first page load with useEffect
  useEffect(() => {
    dispatch(setWineFormInput({
      vintage:  wine.vintage,
      lot: wine.lot,
      vessel: wine.vessel?._id,
      quantity: wine.quantity,
      status: wine.status
    }))
  }, [wine, dispatch]) ;


  // Get the values from the store
  const formInputData = useSelector((state) => state.wine.formInput);  
 

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
      // console.log("Form looks invalid");
      event.stopPropagation();
    } else {
      // console.log("Form looks valid");  
      
      const data = {
        ...formInputData,
        id: wine._id,
        vintage: parseInt(formInputData.vintage),
        quantity: parseInt(formInputData.quantity),
      }

      const submitResult = await updateWine(data);

      // / verify if the result succeeds
      if (submitResult.error) {
        console.log("An error occurred", submitResult.error);
        return;
      }

      // navigate to the home page
      navigate(`/wine/${wine._id}`)

    }   
    setValidated(true);
  };




  return (<>
    <PageTitle>{t('wine-edit-title')}</PageTitle>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="lot">
          <Form.Label>{t("wine-lot")}</Form.Label>
          <Form.Control
            name='lot'
            type="text"
            value={formInputData.lot || ""} 
            onChange={handleChange}
            // placeholder={t("wine-lot")}
            required
            minLength={1}
            maxLength={60}
          />
          <Form.Control.Feedback type="invalid">{t('val-required')}</Form.Control.Feedback>
        </Form.Group>        
      </Row>
  
      
      <Row className="mb-3">        
        <Form.Group as={Col} md="2" controlId="Vintage">
          <Form.Label >{t("wine-vintage")}</Form.Label>
          <Form.Control
            name='vintage'
            type="number"
            value={formInputData.vintage || ""} 
            onChange={handleChange}
            // placeholder={t("wine-vintage")}
            required
          />
          <Form.Control.Feedback type="invalid">{t('val-required')}</Form.Control.Feedback>
        </Form.Group>
  
        <Form.Group as={Col} md="4" controlId="status">
          <Form.Label >{t("wine-status")}</Form.Label>
          
          <Form.Control
            name='status'
            as="select"
            value={formInputData.status || ""}
            onChange={handleChange}
            required
          >
            <option value="">{t("wine-select-status")}</option>
            <option value="FE">{t("wine-status-full-FE")}</option>
            <option value="MA">{t("wine-status-full-MA")}</option>
            <option value="AG">{t("wine-status-full-AG")}</option>
            <option value="FR">{t("wine-status-full-FR")}</option>
          </Form.Control> 
          <Form.Control.Feedback type="invalid">{t('val-required-select')}</Form.Control.Feedback>
        </Form.Group>        
  
      </Row>
  
  
      <Row className="mb-3">
        
        <Form.Group as={Col} md="3" controlId="vessel">
          
          <Form.Label >{t("wine-vessel")}</Form.Label>
          <Form.Control
            name='vessel'
            as="select"
            value={formInputData.vessel || ""}
            onChange={handleChange}
            required
          >
            <option value="">{t("wine-select-vessel")}</option>
            {vesselsList.map((vessel) => <option value={vessel._id} key={vessel._id}>{vessel.label}</option>)}
  
          </Form.Control>
  
          <Form.Control.Feedback type="invalid">{t('val-required-select')}</Form.Control.Feedback>
        </Form.Group>
  
        
  
        <Form.Group as={Col} md="3" controlId="quantity">
          <Form.Label>{t("wine-quantity")}</Form.Label>
          <Form.Control
            name='quantity'
            type="number"
            value={formInputData.quantity || ""} 
            onChange={handleChange}
            // placeholder={t("wine-quantity")}
            required
            min={0}
            max={100000}
          />
          <Form.Control.Feedback type="invalid">{t('val-required')}</Form.Control.Feedback>
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
            <span className='ms-2'>{t('form-wait')}</span>
          </>
        ) : (
          t("form-submit")
        )}
      </Button>
      
      <Row className="mb-3">
        <Col md="8">
        {results.isError && <ErrorMsgBox />}
        </Col>
      </Row>
  
  
    </Form>
    </>
    );
}

export default EditForm;