import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Col, Row, Spinner } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { FaArrowDown } from "react-icons/fa6";

import { updateTaskFormField, useAddWineTaskMutation } from "../../store";
import TargetWine from "../Worksheet/Controls/TargetWine";
import ErrorMsgBox from "../_shared/ErrorMsgBox";
import SourceGrape from "../Worksheet/Controls/SourceGrape";
import { hasDuplicates } from "../../utils";


function Vinification() {

  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const [addTask, results] = useAddWineTaskMutation();
  const { t } = useTranslation();
  const navigate = useNavigate();

  // get the task from the store
  const task = useSelector((state) => {
    return state.worksheet.task
  });


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

      if (hasDupe) {
        event.stopPropagation();
        return;
      }
          

      const apiTask = {
        type: "vinification",
        date: task.date,
        note: task.note,
        wine: task.wine,
        subGrapes: selectedSubGrapes,
      };

      
      // console.log("apiTask", apiTask);

      const submitResult = addTask(apiTask);
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
    <Row className="mb-3 my-5">
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


  // consider the selected subWines
  const selectedSubGrapes = [];
  for (let key in task.subGrapes) {

    const subGrape = task.subGrapes[key];
    // console.log("ingredient", ingredient);

    if (subGrape.id !== null && subGrape.quantity !== null) {
      selectedSubGrapes.push({id: subGrape.id, quantity: subGrape.quantity});        
    }
  }   
 
  let dataMismatch;


  // Check for duplicates
  const wineIdsArray = selectedSubGrapes.map(item => item.id)
  wineIdsArray.push(task.wine); 
  const hasDupe = hasDuplicates(wineIdsArray);

  if (hasDupe) {
    dataMismatch = (
      <div style={{color: "magenta"}}>
        {t("ws-val-dupe")}
      </div>
    );
  }





  return <>

    <Form noValidate className="my-3" validated={validated} onSubmit={handleSubmit}>
  

      <SourceGrape />

      <FaArrowDown className="ms-5" />
      
      <TargetWine />

      <Row className="mb-3">
        <Col>{dataMismatch}</Col>
      </Row>

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

export default Vinification;