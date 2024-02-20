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
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    dispatch(setTaskWineAdditives({name, value}));
  }

  const handleChangeQuantity = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    dispatch(setTaskWineAdditivesQuantity({name, value}));
  }

  const renderDropdown = (data, number) => {    

    return (
      <Row key={number} className="my-3">
        <Form.Group as={Col} md="5" className="my-1" controlId={`additive${number}`} >
          
          <Form.Control
            name={number}
            as="select"
            value={task.additives[number]?.dropDown || ""}
            onChange={handleChange}
            required={number === 'A'} 
          >
            <option value="">Select additive</option>
            {data.map((additive) => 
              <option 
                value={`{"id": "${additive._id}", "quantity": ${additive.quantity}}`} 
                key={additive._id}
              >
                {additive.label} ({t(additive.unit)})
              </option>
            )}

          </Form.Control>      

          {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
          <Form.Control.Feedback type="invalid">{t('wine-select-additive')}</Form.Control.Feedback>
        </Form.Group>


        <Form.Group as={Col} md="3" className="my-1" controlId={`quantity${number}`}>
          <Form.Control
            name={number}
            type="number"
            value={task.additives[number]?.quantity || ""}
            onChange={handleChangeQuantity}
            placeholder={t("wine-quantity")}
            required={number === 'A'} 
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{t('val-required')}</Form.Control.Feedback>
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


