import { useDispatch, useSelector } from "react-redux";

import { Col, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

import { setTaskNextQuantity, setTaskNextVessel, useFetchAvailableVesselsQuery } from "../../../store";
import ErrorMsgBox from "../../_shared/ErrorMsgBox";
import PlaceholderBlock from "../../_shared/PlaceholderBlock";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";


function TargetVessel() {

  const dispatch = useDispatch();
  const { t } = useTranslation();

  // get the task from the store
  const task = useSelector((state) => {
    return state.worksheet.task
  });

  // refetch on every visit
  const { data, error, isLoading, refetch } = useFetchAvailableVesselsQuery();
  useEffect(() => {refetch()}, [refetch]);



  const handleChange = (e) => {
    const value = e.currentTarget.value;
    dispatch(setTaskNextVessel(value));
  }

  const handleChangeNextQuantity = (e) => {
    const value = e.currentTarget.value;
    dispatch(setTaskNextQuantity(value));
  }

  const renderDropdown = (data) => {    

    // sort data by vessel.label

    const sortedData = [...data]

    sortedData.sort((a, b) => (a.label > b.label) ? 1 : -1);


    return (
      <Row className="my-3">
        <Form.Group as={Col} md="5" className="my-1" controlId="targetVessel">
          
          <Form.Control
            name='vessel'
            as="select"
            value={task.nextVessel || ""}
            onChange={handleChange}
            required
          >
            <option value="">{t("wine-select-vessel")}</option>
            {sortedData.map((vessel) => 
              <option 
                value={vessel._id} 
                key={vessel._id}
              >
                {vessel.label}
              </option>
            )}

          </Form.Control>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{t('val-required-select')}</Form.Control.Feedback>
        </Form.Group>


        <Form.Group as={Col} md="3" className="my-1" controlId='targetQuantity'>
          <Form.Control
            name='quantity'
            type="number"
            required
            value={task.nextQuantity || ""}
            onChange={handleChangeNextQuantity}
            placeholder="Quantity"
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

export default TargetVessel;


