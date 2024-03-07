import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Col, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

import { setTaskVinificationIngredients, setTaskVinificationQuantity, useFetchGrapesQuery } from "../../../store";
import ErrorMsgBox from "../../_shared/ErrorMsgBox";
import PlaceholderBlock from "../../_shared/PlaceholderBlock";


function SourceGrape() {

  const dispatch = useDispatch();
  const { t } = useTranslation();

  // get the task from the store
  const task = useSelector((state) => {
    return state.worksheet.task
  });

  // refetch grapes on every visit
  const { data, error, isLoading, refetch } = useFetchGrapesQuery();
  useEffect(() => {refetch()}, [refetch]);

  const handleChange = (e) => {

    // find the grape by id
    const selectedGrape = data.find(item => item._id ===  e.currentTarget.value);

    const name = e.currentTarget.name;
    const value = selectedGrape;

    dispatch(setTaskVinificationIngredients({name, value}));
  }

  const handleChangeQuantity = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    dispatch(setTaskVinificationQuantity({name, value}));
  }

  const renderDropdown = (data, number) => {   
    
    // wine is required if it is the first option in the list or if there is a quantity entered
    const grapeRequired = number === 'A' || task.subGrapes[number]?.quantity;

    // the quantity is required if it is the first option in the list or there is a wine selected
    const quantityRequired = number === 'A' || task.subGrapes[number]?.id;
    
    let errorMessageWine;
    let errorMessageQuantity;

    if (grapeRequired) {
      errorMessageWine = t("val-required-select");
    }

    if (quantityRequired) {
      errorMessageQuantity = t("val-required");
    }
    
    if ((task.subGrapes[number]?.quantity) > task.subGrapes[number]?.quantityBefore) {
      errorMessageQuantity = t("ws-val-quantity-exceeds");
    } 




    return (
      <Row key={number} className="my-3">
        <Form.Group as={Col} md="5" className="my-1" controlId={`wine${number}`} >
          
          <Form.Control
            name={number}
            as="select"
            value={task.subGrapes[number]?.id || ""}
            onChange={handleChange}
            required={grapeRequired} 
          >
            <option value="">{t("ws-select-grape")}</option>
            {data.map((wine) => 
              <option 
                value={wine._id} 
                key={wine._id}
              >
                {wine.parcel}
              </option>
            )}

          </Form.Control>      

          <Form.Control.Feedback type="invalid">{errorMessageWine}</Form.Control.Feedback>
        </Form.Group>


        <Form.Group as={Col} md="3" className="my-1" controlId={`quantity${number}`}>
          <Form.Control
            name={number}
            type="number"
            value={task.subGrapes[number]?.quantity || ""}
            onChange={handleChangeQuantity}
            placeholder={t("wine-quantity")}
            required={quantityRequired} 
            max={task.subGrapes[number]?.quantityBefore}
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
    sortedData.sort((a, b) => (a.parcel > b.parcel) ? 1 : -1);


    content = ["A", "B", "C", "D"].map((nb) => renderDropdown(sortedData, nb));
  }

 
  return  content;
}

export default SourceGrape;


