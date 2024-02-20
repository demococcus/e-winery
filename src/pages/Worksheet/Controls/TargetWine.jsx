import { useDispatch, useSelector } from "react-redux";

import { Col, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

import { setTaskTargetWine, useFetchWinesQuery } from "../../../store";
import ErrorMsgBox from "../../_shared/ErrorMsgBox";
import PlaceholderBlock from "../../_shared/PlaceholderBlock";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";


function TargetWine() {

  const dispatch = useDispatch();
  const { t } = useTranslation();

  // get the task from the store
  const task = useSelector((state) => {
    return state.worksheet.task
  });

  // refetch wines on every visit
  const { data, error, isLoading, refetch } = useFetchWinesQuery();
  useEffect(() => {refetch()}, [refetch]);

  const handleChange = (e) => {
    const value = e.currentTarget.value;
    dispatch(setTaskTargetWine(value));
  }

  const renderDropdown = (data) => {    
    
    // filter the data to only include wines with vessel not null
    const filteredData = data.filter(wine => wine.vessel !== null);
    
    // sort data by vessel.label
    const sortedData = [...filteredData];
    sortedData.sort((a, b) => (a.vessel.label > b.vessel.label) ? 1 : -1);


    return (
      <Row className="my-3">
        <Form.Group as={Col} md="5" className="my-1" controlId="wine">
          
          <Form.Control
            name='wine'
            as="select"
            value={task.targetWineOption || ""}
            onChange={handleChange}
            required
          >
            <option value="">{t('ws-select-wine')}</option>
            {sortedData.map((wine) => 
              <option 
                value={`{"targetWineId": "${wine._id}", "targetWineQuantity": ${wine.quantity}}`} 
                key={wine._id}
              >
                [{wine.vessel.label}] {wine.vintage} {wine.lot}
              </option>
            )}

          </Form.Control>
          <Form.Control.Feedback type="invalid">{t('val-required-select')}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="3" className="my-1" controlId='quantity'>
          <Form.Control
            name='quantity'
            type="number"
            disabled
            value={task.targetWineQuantity || ""}
            onChange={() => {}}
            placeholder={t("wine-quantity")}
            // required={number === 'A'} 
          />
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
    content = renderDropdown(data);
  }

 
  return  content;
}

export default TargetWine;


