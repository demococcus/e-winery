import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';

import { Col, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

import { setTaskWineAdditives, setTaskWineAdditivesQuantity, useFetchAdditivesQuery } from "../../../store";
import ErrorMsgBox from "../../_shared/ErrorMsgBox";
import PlaceholderBlock from "../../_shared/PlaceholderBlock";
import { useEffect } from "react";


function SourceAdditive() {

  const { t } = useTranslation();

  const dispatch = useDispatch();

  // get the task from the store
  const task = useSelector((state) => {
    return state.worksheet.task
  });

  // refetch additives list on every visit
  const { data, error, isLoading, refetch } = useFetchAdditivesQuery();
  useEffect(() => {refetch()}, [refetch]);

  const handleChange = (e) => {

    // find teh additive by id
    const selectedAdditive = data.find(item => item._id ===  e.currentTarget.value);

    const name = e.currentTarget.name;
    const value = selectedAdditive;

    dispatch(setTaskWineAdditives({name, value}));
  }

  const handleChangeQuantity = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    dispatch(setTaskWineAdditivesQuantity({name, value}));
  }

  const renderDropdown = (data, number) => {  
    
    // additive is required if it is the first option in the list or if there is a quantity entered
    const additiveRequired = number === 'A' || task.additives[number]?.quantity;

    // the quantity is required if it is the first option in the list or there is an additive selected
    const quantityRequired = number === 'A' || task.additives[number]?.id;

    const errorMessageAdditive = additiveRequired ? t("val-required-select") : null;
    const errorMessageQuantity = quantityRequired ? t("val-required") : null;
   

    return (
      <Row key={number} className="my-3">
        <Form.Group as={Col} md="5" className="my-1" controlId={`additive${number}`} >
          
          <Form.Control
            name={number}
            as="select"
            value={task.additives[number]?.id || ""}
            onChange={handleChange}
            required={additiveRequired} 
          >
            <option value="">{t("ws-select-additive")}</option>
            {data.map((additive) => 
              <option 
                value={additive._id} 
                key={additive._id}
              >
                {additive.label} ({t(additive.unit)})
              </option>
            )}

          </Form.Control>      
          <Form.Control.Feedback type="invalid">{errorMessageAdditive}</Form.Control.Feedback>
        </Form.Group>


        <Form.Group as={Col} md="3" className="my-1" controlId={`quantity${number}`}>
          <Form.Control
            name={number}
            type="number"
            value={task.additives[number]?.quantity || ""}
            onChange={handleChangeQuantity}
            placeholder={t("wine-quantity")}
            required={quantityRequired} 
          />
          <Form.Control.Feedback type="invalid">{errorMessageQuantity}</Form.Control.Feedback>
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

    
    const sortedData = [...data]
    sortedData.sort((a, b) => (a.label > b.label) ? 1 : -1);

    content = ["A", "B", "C", "D"].map((nb) => renderDropdown(data, nb));
  }

 
  return  content;
}

export default SourceAdditive;


