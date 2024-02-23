import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Col, Row, Spinner } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

import { updateTaskFormField, useAddWineTaskMutation } from "../../store";
import TargetWine from "../Worksheet/Controls/TargetWine";
import ErrorMsgBox from "../_shared/ErrorMsgBox";
import { wineTaskSimpleTypes } from '../History/opTypes';



function Manipulation() {

  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const [addTask, results] = useAddWineTaskMutation();
  const { t } = useTranslation();
  const navigate = useNavigate();

  // get the task from the store
  const task = useSelector((state) => {
    return state.worksheet.task
  });

  const handleTypeChange = (e) => {
    dispatch(updateTaskFormField({field: 'type', value: e.currentTarget.value}));
  }
  const handleNoteChange = (e) => {
    dispatch(updateTaskFormField({field: 'note', value: e.currentTarget.value}));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      // console.log("Form looks invalid");
    } else {
      // console.log("Form looks valid");

      const apiTask = {
        type: task.type,
        date: task.date,
        note: task.note,
        wine: task.wine,
      };


      // console.log("apiTask", apiTask);

      const submitResult = await addTask(apiTask);

      // verify if the result succeeds
      if (submitResult.error) {
        console.log("An error occurred", submitResult.error);
        return;
      }
      // navigate to the home page
      navigate(`/worksheets`)

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
        <Form.Control.Feedback type="invalid">{t("ws-val-note-length")}</Form.Control.Feedback>
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
          <option value="">{t("ws-select-type")}</option>
          {wineTaskSimpleTypes.map((element) => {
            return <option value={element} key={element}>{t(`op-${element}`)}</option>
          })}

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
