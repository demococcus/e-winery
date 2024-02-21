import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

import { Col, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

import { updateTaskFormField, setTaskNextVessel, useFetchAvailableVesselsQuery } from "../../../store";
import ErrorMsgBox from "../../_shared/ErrorMsgBox";
import PlaceholderBlock from "../../_shared/PlaceholderBlock";


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



  const handleChangeVessel = (e) => {
    const selectedVessel = data.find(item => item._id ===  e.currentTarget.value);
    dispatch(setTaskNextVessel(selectedVessel));
  }

  const handleChangeNextQuantity = (e) => {
    dispatch(updateTaskFormField({field: 'nextQuantity', value: e.currentTarget.value}));
  }

  const renderDropdown = (data) => {    

    // sort data by vessel.label

    const sortedData = [...data]

    sortedData.sort((a, b) => (a.label > b.label) ? 1 : -1);

    let quantityMisMatch;

    let quantityErrorMessage = t("val-required");

    if (task.nextQuantity > task.targetWineQuantity) {
      quantityErrorMessage = t("ws-val-quantity-exceeds");
    }    

    if (
      task.nextVesselAvailableCapacity
      && (task.nextQuantity - task.nextVesselAvailableCapacity > 0)
    ) {
      quantityMisMatch = (
        <div style={{color: "red"}}>
          {t("ws-val-overcapacity")} {task.nextQuantity - task.nextVesselAvailableCapacity} {t('liters')}
          
        </div>
      );
    } else if (
      task.nextVesselType === "tank"
      && task.nextVesselAvailableCapacity 
      && (task.nextVesselAvailableCapacity - task.nextQuantity > 0)
    ) {
        quantityMisMatch = (
          <div style={{color: "blue"}}>
            {t("ws-val-top-up")} {task.nextVesselAvailableCapacity - task.nextQuantity} {t("liters")}
          </div>
        );
    }
    


    return (<>
      <Row className="my-3">
        <Form.Group as={Col} md="5" className="my-1" controlId="targetVessel">
          
          <Form.Control
            name='vessel'
            as="select"
            value={task.nextVesselId || ""}
            onChange={handleChangeVessel}
            required
          >
            <option value="">{t("wine-select-vessel")}</option>
            {sortedData.map((vessel) => 
              <option 
                // value={vessel._id} 
                value={vessel._id}
                key={vessel._id}
              >
                {vessel.label}
              </option>
            )}

          </Form.Control>
          <Form.Control.Feedback type="invalid">{t('val-required-select')}</Form.Control.Feedback>
        </Form.Group>

        



        <Form.Group as={Col} md="3" className="my-1" controlId='targetQuantity'>
          <Form.Control
            name='quantity'
            type="number"
            required
            max={task.targetWineQuantity}
            
            value={task.nextQuantity || ""}
            onChange={handleChangeNextQuantity}
            placeholder={t("wine-quantity")}
 
          />
          <Form.Control.Feedback type="invalid">{quantityErrorMessage}</Form.Control.Feedback>
        </Form.Group> 

      </Row>

      <Row className="mb-3">
      <Col>{quantityMisMatch}</Col>
      </Row>

    </>);
    
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


