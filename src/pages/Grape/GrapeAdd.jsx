import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Spinner } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { resetGrapeFormInput, useAddGrapeMutation } from "../../store";
import ErrorMsgBox from '../_shared/ErrorMsgBox';
import PageTitle from '../_shared/PageTitle';

import { setGrapeFormInput } from '../../store';



function GrapeAdd() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();  
  const [addGrape, results] = useAddGrapeMutation();
  const [validated, setValidated] = useState(false);  

  
  // Reset the form form when the component is mounted
  useEffect(() => {
    dispatch(resetGrapeFormInput());
  } , [dispatch]);

  // Get the values from the store
  const formInputData = useSelector((state) => state.grape.formInput);  


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    
    // create a copy of the formInputData with the new value
    const updatedData = {
      ...formInputData,
      [name]: value
    };

    // update the store
    dispatch(setGrapeFormInput(updatedData));
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
      const submitResult = await addGrape(newWine);

      // verify if the result succeeds
      if (submitResult.error) {
        console.log("An error occurred", submitResult.error);
        return;
      }
      // navigate to the home page
      navigate(`/grapes`)
    }   
    setValidated(true);
  };
 

  return (<>
  <PageTitle>{t('grape-add-title')}</PageTitle>
  <Form noValidate validated={validated} onSubmit={handleSubmit}>
    
    <Row className="mb-3">
      <Form.Group as={Col} md="6" controlId="parcel">
        <Form.Label>{t("grape-parcel")}</Form.Label>
        <Form.Control
          name='parcel'
          type="text"
          value={formInputData.parcel || ""} 
          onChange={handleChange}
          // placeholder={t("grape-parcel")}
          required
          minLength={1}
          maxLength={60}
        />
        <Form.Control.Feedback type="invalid">{t('val-required')}</Form.Control.Feedback>
      </Form.Group>        
    </Row>

    <Row className="mb-3">
      <Form.Group as={Col} md="4" controlId="variety">
        <Form.Label>{t("grape-variety")}</Form.Label>
        <Form.Control
          name='variety'
          type="text"
          value={formInputData.variety || ""} 
          onChange={handleChange}
          // placeholder={t("grape-variety")}
          required
          minLength={1}
          maxLength={60}
        />
        <Form.Control.Feedback type="invalid">{t('val-required')}</Form.Control.Feedback>
      </Form.Group>   

      <Form.Group as={Col} md="2" controlId="area">
        <Form.Label>{t("grape-area")}</Form.Label>
        <Form.Control
          name='area'
          type="number"
          value={formInputData.area || ""} 
          onChange={handleChange}
          // placeholder={t( "grape-area")}
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

export default GrapeAdd;