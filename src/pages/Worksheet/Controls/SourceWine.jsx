import { useDispatch, useSelector } from "react-redux";

import { Col, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

import { setTaskWineIngredients, setTaskWineIngredientsQuantity, useFetchWinesQuery } from "../../../store";
import ErrorMsgBox from "../../_shared/ErrorMsgBox";
import PlaceholderBlock from "../../_shared/PlaceholderBlock";
import { useEffect } from "react";


function SourceWine() {

  const dispatch = useDispatch();

  // get the task from the store
  const task = useSelector((state) => {
    return state.worksheet.task
  });

  // refetch wines on every visit
  const { data, error, isLoading, refetch } = useFetchWinesQuery();
  useEffect(() => {refetch()}, [refetch]);

  const handleChange = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    dispatch(setTaskWineIngredients({name, value}));
  }

  const handleChangeQuantity = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    dispatch(setTaskWineIngredientsQuantity({name, value}));
  }

  const renderDropdown = (data, number) => {    

    return (
      <Row key={number} className="my-3">
        <Form.Group as={Col} md="5" className="my-1" controlId={`wine${number}`} >
          
          <Form.Control
            name={number}
            as="select"
            value={task.sources[number]?.dropDown || ""}
            onChange={handleChange}
            required={number === 'A'} 
          >
            <option value="">Select wine</option>
            {data.map((wine) => 
              <option 
                value={`{"wine": "${wine._id}", "quantity": ${wine.quantity}}`} 
                key={wine._id}
              >
                [{wine.vessel.label}] {wine.vintage} {wine.lot}
              </option>
            )}

          </Form.Control>      

          {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
          <Form.Control.Feedback type="invalid">
            Please choose a wine.
          </Form.Control.Feedback>
        </Form.Group>


        <Form.Group as={Col} md="3" className="my-1" controlId={`quantity${number}`}>
          <Form.Control
            name={number}
            type="number"
            value={task.sources[number]?.quantity || ""}
            onChange={handleChangeQuantity}
            placeholder="Quantity"
            required={number === 'A'} 
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide a quantity.
          </Form.Control.Feedback>
        </Form.Group> 


      </Row>
    );
    
  }


  let content;
  if (isLoading) {
    content = <PlaceholderBlock times={1} />    
  } else if (error) {
      content =  <ErrorMsgBox />
  } else {

    // filter the data to only include wines with vessel not null
    const filteredData = data.filter(wine => wine.vessel !== null);

    const sortedData = [...filteredData]
    sortedData.sort((a, b) => (a.vessel.label > b.vessel.label) ? 1 : -1);


    content = ["A", "B", "C", "D"].map((nb) => renderDropdown(sortedData, nb));
  };

 
  return  content;
};

export default SourceWine;


