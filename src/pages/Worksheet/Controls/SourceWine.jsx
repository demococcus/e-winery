import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Col, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

import { setTaskWineIngredients, setTaskWineIngredientsQuantity, useFetchWinesQuery } from "../../../store";
import ErrorMsgBox from "../../_shared/ErrorMsgBox";
import PlaceholderBlock from "../../_shared/PlaceholderBlock";


function SourceWine() {

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

    // find the wine by id
    const selectedWine = data.find(item => item._id ===  e.currentTarget.value);

    const name = e.currentTarget.name;
    const value = selectedWine;

    dispatch(setTaskWineIngredients({name, value}));
  }

  const handleChangeQuantity = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    dispatch(setTaskWineIngredientsQuantity({name, value}));
  }

  const renderDropdown = (data, number) => {   
    
    // wine is required if it is the first option in the list or if there is a quantity entered
    const wineRequired = number === 'A' || task.sources[number]?.usedQuantity;

    // the quantity is required if it is the first option in the list or there is a wine selected
    const quantityRequired = number === 'A' || task.sources[number]?.wineId;
    
    let errorMessageWine;
    let errorMessageQuantity;

    if (wineRequired) {
      errorMessageWine = t("val-required-select");
    }

    if (quantityRequired) {
      errorMessageQuantity = t("val-required");
    }
    
    if ((task.sources[number]?.usedQuantity) > task.sources[number]?.wineQuantity) {
      errorMessageQuantity = t("ws-val-quantity-exceeds");
    } 




    return (
      <Row key={number} className="my-3">
        <Form.Group as={Col} md="5" className="my-1" controlId={`wine${number}`} >
          
          <Form.Control
            name={number}
            as="select"
            value={task.sources[number]?.wineId || ""}
            onChange={handleChange}
            required={wineRequired} 
          >
            <option value="">{t("ws-select-wine")}</option>
            {data.map((wine) => 
              <option 
                value={wine._id} 
                key={wine._id}
              >
                [{wine.vessel.label}] {wine.vintage} {wine.lot}
              </option>
            )}

          </Form.Control>      

          <Form.Control.Feedback type="invalid">{errorMessageWine}</Form.Control.Feedback>
        </Form.Group>


        <Form.Group as={Col} md="3" className="my-1" controlId={`quantity${number}`}>
          <Form.Control
            name={number}
            type="number"
            value={task.sources[number]?.usedQuantity || ""}
            onChange={handleChangeQuantity}
            placeholder={t("wine-quantity")}
            required={quantityRequired} 
            max={task.sources[number]?.wineQuantity}
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

    // filter the data to only include wines with vessel not null
    const filteredData = data.filter(wine => wine.vessel !== null);

    const sortedData = [...filteredData]
    sortedData.sort((a, b) => (a.vessel.label > b.vessel.label) ? 1 : -1);


    content = ["A", "B", "C", "D"].map((nb) => renderDropdown(sortedData, nb));
  }

 
  return  content;
}

export default SourceWine;


