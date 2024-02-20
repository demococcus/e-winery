import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';
import { useState } from "react";

import { Button, Col, Row, Spinner } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { FaArrowDown } from "react-icons/fa6";

import TargetWine from "../Worksheet/Controls/TargetWine";
import { setTaskNote, useAddWineTaskMutation } from "../../store";
import ErrorMsgBox from "../_shared/ErrorMsgBox";
import SourceWine from "../Worksheet/Controls/SourceWine";


function Blend() {

  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const [addTask, results] = useAddWineTaskMutation();
  const { t } = useTranslation();

  // get the task from the store
  const task = useSelector((state) => {
    return state.worksheet.task
  });


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
      
      // TODO - check for duplicates !!!

      const apiTask = {
        type: "blend",
        date: task.date,
        note: task.note,
        wine: task.targetWineId,
        quantity: task.targetWineQuantity, 
        ingredients,
        nextQuantity
      };

      
      console.log("apiTask", apiTask);
      // addTask(apiTask);
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


  let nextQuantity = task.targetWineQuantity;

  const ingredients = [];
  for (let key in task.sources) {

    const ingredient = task.sources[key];
    // console.log("ingredient", ingredient);

    if (ingredient.wineId !== null && ingredient.usedQuantity !== null) {
      ingredients.push({wine: ingredient.wineId, quantity: ingredient.usedQuantity});        
      nextQuantity += ingredient.usedQuantity;
    }
  }   

  // console.log("nextQuantity", nextQuantity);
  // console.log("task.targetWineVesselCapacity", task.targetWineVesselCapacity);
  // console.log("task.targetWineVesselType", task.targetWineVesselType);
  // console.log("task.targetWineQuantity", task.targetWineQuantity);
  
  let quantityMisMatch;
  if (
    task.targetWineVesselType === "tank"
    && nextQuantity > task.targetWineQuantity
    && task.targetWineVesselCapacity < nextQuantity) {
    quantityMisMatch = (
      <div style={{color: "red"}}>
        {t("ws-val-overcapacity")} {nextQuantity - task.targetWineVesselCapacity} {t('liters')}
        
      </div>
    );
  } else if (
    task.targetWineVesselType === "tank"
    && nextQuantity > task.targetWineQuantity
    && (task.targetWineVesselCapacity > nextQuantity)) {
      quantityMisMatch = (
        <div style={{color: "blue"}}>
          {t("ws-val-top-up")} {task.targetWineVesselCapacity - nextQuantity} {t("liters")}
        </div>
      );
  }

  // console.log("quantityMisMatch", quantityMisMatch);




  return <>

    <Form noValidate className="my-3" validated={validated} onSubmit={handleSubmit}>
  

      <SourceWine />

      <FaArrowDown className="ms-5" />
      
      <TargetWine />

      <Row className="mb-3">
        <Col>{quantityMisMatch}</Col>
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

export default Blend;