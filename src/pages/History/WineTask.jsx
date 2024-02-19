import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { GoArrowDown } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";

import VesselLabel from "../_shared/VesselLabel";
import TaskNote from "./TaskNote";
import './WineTask.css';




function WineTask({children}) {

  const event = children;
  const { t } = useTranslation();

  
  const renderSimpleTask = () => {
    return (<>
      <div>{t(`op-${event.type}`)}</div>
      <div>
        <VesselLabel isBold>{event.vesselLabel}</VesselLabel> {event.wineTag}  - {event.quantity} {t('liters')}
      </div>
      <TaskNote>{event.note}</TaskNote>
    </>)    
  };

  const renderTransfer = () => {
    return (<>
      <div>{t(`op-${event.type}`)}</div>
      <div><VesselLabel isBold>{event.vesselLabel}</VesselLabel> {event.wineTag} - {event.nextQuantity} {t('liters')}</div>
      
      <GoArrowDown  className="ms-3" />

      <div><VesselLabel>{event.nextVesselLabel}</VesselLabel></div>
      <TaskNote>{event.note}</TaskNote>
    </>)    
  };

  const renderTransferPartial = () => {
    const ingredients = event.subTasks.map((ing) => {
      return <div key={ing._id}><VesselLabel isBold>{ing.vesselLabel}</VesselLabel> <Link to={`/wine/${ing.wine}`} className='no-underline'>{ing.wineTag}</Link> - {ing.quantity} {t('liters')}</div>
    })
    return (<>
      <div>{t(`op-${event.type}`)}</div>
      <div>{ingredients}</div>
      {/* <div><VesselLabel isBold>{event.vesselLabel}</VesselLabel> {event.wineTag} - {event.nextQuantity} {t('liters')}</div> */}
      
      <GoArrowDown  className="ms-3" />

      <div><VesselLabel>{event.nextVesselLabel}</VesselLabel> {event.wineTag}</div>
      <TaskNote>{event.note}</TaskNote>
    </>)    
  };

  const renderTransferOut = () => {

    // const remaining = <div>Remaining: {event.quantityAfter} {t('liters')}</div>;
    // const depleated = <div>Wine depleted</div>;

    const remaining = event.quantityAfter <= 0 ? <div>{t("op-sub-depleted")}</div> : <div>{t("op-sub-remaining")}{event.quantityAfter} {t('liters')}</div>;


    return (<>
      <div>{t(`op-${event.type}`)}</div>
      <div>{event.quantity} {t('liters')} <span className="mx-2">
      
      <GoArrowRight />

      </span> <VesselLabel>{event.destVesselLabel}</VesselLabel> <Link to={`/wine/${event.destWine}`} className='no-underline'>{event.destWineTag}</Link></div>

      <hr className="my-2 w-50" />
      {remaining}
    </>)    
  };


  const renderBlend = () => {
    const ingredients = event.subTasks.map((ing) => {
      return <div key={ing._id}><VesselLabel isBold>{ing.vesselLabel}</VesselLabel> <Link to={`/wine/${ing.wine}`} className='no-underline'>{ing.wineTag}</Link> - {ing.quantity} {t('liters')}</div>
    })

    return (<>
      <div>{t(`op-${event.type}`)}</div>
      <div>{ingredients}</div>

      <GoArrowDown  className="ms-3" />

      <div>
        <VesselLabel>{event.vesselLabel}</VesselLabel> {event.wineTag} - {event.quantity} {t('liters')}
      </div>
      <hr className="my-2 w-50" />
      <div>Total quantity: {event.nextQuantity} {t('liters')}</div>
      <TaskNote>{event.note}</TaskNote>
    </>)    
  };

  const renderAdditive = () => {
    const ingredients = event.subTasks.map((ing) => {
      return (
      <div key={ing._id}>
        {ing.additiveLabel} - {ing.quantity} {t(ing.additiveUnit)}
      </div>);
    })

    return (<>
      <div>{t(`op-${event.type}`)}</div>
      <div>{ingredients}</div>

      <GoArrowDown  className="ms-3" />

      <div>
        <VesselLabel isBold>{event.vesselLabel}</VesselLabel> {event.wineTag} - {event.quantity} {t('liters')}
      </div>
      <TaskNote>{event.note}</TaskNote>

    </>)    
  };

  let taskContent;

  switch (event.type) {
    case "aerate":
    case "decant":
    case "filter":
    case "freeze":
    case "remontage":
      taskContent = renderSimpleTask();
      break;
    case "transfer":
      taskContent = renderTransfer();
      break;
    case "transfer-partial":
      taskContent = renderTransferPartial();
      break;
    case "transfer-out":
      taskContent = renderTransferOut();
      break;
    case "blend":
      taskContent = renderBlend();
      break;
    case "additive":
      taskContent = renderAdditive();
      break;

    default: 
    taskContent = "Unknown"       
      break;
  }

  return taskContent;
    


}

export default WineTask;