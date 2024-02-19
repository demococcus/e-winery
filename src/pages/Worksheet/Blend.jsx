import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';
import { useState } from "react";

import { Button, Col, Row, Spinner } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { FaArrowDown } from "react-icons/fa6";

import TargetWine from "../Worksheet/Controls/TargetWine";
import { setTaskNote, useAddWineTaskMutation } from "../../store";
import ErrorMsgBox from "../_shared/ErrorMsgBox";
import SuccessMsgBox from "../_shared/SuccessMsgBox";
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
      
      // transform the task so that it matches the API format

      // console.log("task", task);
      
      let nextQuantity = task.quantity;

      const ingredients = [];
      for (let key in task.sources) {

        const ingredient = task.sources[key];
        // console.log("ingredient", ingredient);

        if (ingredient.wine !== null && ingredient.quantity !== null) {
          ingredients.push({wine: ingredient.wine, quantity: ingredient.quantity});        
          nextQuantity += ingredient.quantity;
        };
      };      
      
      const apiTask = {
        type: "blend",
        date: task.date,
        note: task.note,
        wine: task.wine,
        quantity: task.quantity, 
        ingredients,
        nextQuantity
      };

      // console.log("apiTask", apiTask);

      addTask(apiTask);
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
          placeholder="Note"
          
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Please provide a note.
        </Form.Control.Feedback>
      </Form.Group>        
    </Row>
  );


  return <>

    <Form noValidate className="my-3" validated={validated} onSubmit={handleSubmit}>
  

      <SourceWine />

      <FaArrowDown className="ms-5" />
      
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
            <span className='ms-2'>Please wait...</span>
          </>
        ) : (
          t("form-submit")
        )}
      </Button>
      
      <Row className="mb-3">
        <Col md="8">
        {results.isError && <ErrorMsgBox />} 
        {results.isSuccess && <SuccessMsgBox>Your wine task has been created.</SuccessMsgBox> }  
        </Col>
      </Row>

    </Form>

  </>;
}

export default Blend;