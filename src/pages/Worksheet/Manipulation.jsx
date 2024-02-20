import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';

import { Button, Col, Row, Spinner } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

import TargetWine from "../Worksheet/Controls/TargetWine";
import { setTaskNote, setTaskType, useAddWineTaskMutation } from "../../store";
import ErrorMsgBox from "../_shared/ErrorMsgBox";
import { useState } from "react";


function Manipulation() {

  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const [addTask, results] = useAddWineTaskMutation();
  const { t } = useTranslation();

  // get the task from the store
  const task = useSelector((state) => {
    return state.worksheet.task
  });

  const handleTypeChange = (e) => {
    dispatch(setTaskType(e.currentTarget.value));
  }
  const handleNoteChange = (e) => {
    dispatch(setTaskNote(e.currentTarget.value));
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      // console.log("Form looks invalid");
    } else {
      // console.log("Form looks valid");

      // console.log("task", task);
      
      const apiTask = {
        type: task.type,
        date: task.date,
        note: task.note,
        wine: task.targetWineId,
        quantity: task.targetWineQuantity,  
      };


      console.log("apiTask", apiTask);
      // addTask(apiTask);
    }   


    setValidated(true);
  };
 
  

  const note = (
    <Row className="mb-3">
      <Form.Group as={Col} md="8" controlId="note">
        <Form.Control
          name='note'
          type="text"
          value={task.note || ""} 
          onChange={handleNoteChange}
          placeholder={t("ws-note")}
          maxLength={150}
          
        />
        <Form.Control.Feedback type="invalid">{t("ws-note-length")}</Form.Control.Feedback>
      </Form.Group>        
    </Row>
  );

  const manipulationType = (
    <Row className="mb-3">
      <Form.Group as={Col} md="4" controlId="type">        
        <Form.Control
          name='type'
          as="select"
          value={task.type || ""}
          onChange={handleTypeChange}
          required
        >
          <option value="">{t("op-select-type")}</option>
          <option value="aerate" key="aerate">{t("op-aerate")}</option>
          <option value="decant" key="decant">{t("op-decant")}</option>
          <option value="filter" key="filter">{t("op-filter")}</option>
          <option value="freeze" key="freeze">{t("op-freeze")}</option>
          <option value="remontage" key="remontage">{t("op-remontage")}</option>

        </Form.Control>
        <Form.Control.Feedback type="invalid">{t('val-required-select')}</Form.Control.Feedback>
      </Form.Group>
    </Row>
  );


  return <>

    <Form noValidate className='my-4' validated={validated} onSubmit={handleSubmit}>
  
      <div>{manipulationType}</div>
      <TargetWine />
      <div>{note}</div>

      <Button 
        type="submit" 
        variant="primary" 
        disabled={results.isLoading || ""}
      >
        {results.isLoading ? (
          <>
            <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
            <span className='ms-2'>{t("form-wait")}</span>
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

  </>;
}

export default Manipulation;