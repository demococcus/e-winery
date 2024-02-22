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
import SourceWine from "../Worksheet/Controls/SourceWine";
import { hasDuplicates } from "../../utils";


function Blend() {

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
        type: "blend",
        date: task.date,
        note: task.note,
        wine: task.wine,
        subWines: selectedSubWines,
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

  // use the volume of the target wine and then add to it the volume of the subWines
  let nextQuantity = task.wineQuantity;

  // consider the selected subWines
  const selectedSubWines = [];
  for (let key in task.subWines) {

    const subWine = task.subWines[key];
    // console.log("ingredient", ingredient);

    if (subWine.id !== null && subWine.quantity !== null) {
      selectedSubWines.push({id: subWine.id, quantity: subWine.quantity});        
      nextQuantity += subWine.quantity;
    }
  }   

  // console.log("nextQuantity", nextQuantity);
  // console.log("task.wineVesselCapacity", task.wineVesselCapacity);
  // console.log("task.wineVesselType", task.wineVesselType);
  // console.log("task.wineQuantity", task.wineQuantity);
  
  let dataMismatch;
  if (
    task.wineVesselType === "tank"
    && nextQuantity > task.wineQuantity
    && task.wineVesselCapacity < nextQuantity) {
      dataMismatch = (
      <div style={{color: "red"}}>
        {t("ws-val-overcapacity")} {nextQuantity - task.wineVesselCapacity} {t('liters')}
        
      </div>
    );
  } else if (
    task.wineVesselType === "tank"
    && nextQuantity > task.wineQuantity
    && (task.wineVesselCapacity > nextQuantity)) {
      dataMismatch = (
        <div style={{color: "blue"}}>
          {t("ws-val-top-up")} {task.wineVesselCapacity - nextQuantity} {t("liters")}
        </div>
      );
  }



  // Check for duplicates
  const wineIdsArray = selectedSubWines.map(item => item.id)
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
  

      <SourceWine />

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

export default Blend;