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
        <VesselLabel isBold>{event.vesselLabel}</VesselLabel> {event.wineLot} - {event.quantityBefore} {t('liters')}
      </div>
      <TaskNote>{event.note}</TaskNote>
    </>)    
  };

  const renderTransfer = () => {
    return (<>
      <div>{t(`op-${event.type}`)}</div>
      <div><VesselLabel isBold>{event.vesselLabel}</VesselLabel> {event.wineLot} - {event.quantityBefore} {t('liters')}</div>
      
      <GoArrowDown  className="ms-3" />

      <div><VesselLabel>{event.nextVesselLabel}</VesselLabel></div>
      <TaskNote>{event.note}</TaskNote>
    </>)    
  };

  const renderSplitFrom = () => {

    const subWines = event.subTasks.map((ing) => {
      return <div key={ing._id}><VesselLabel isBold>{ing.vesselLabel}</VesselLabel> <Link to={`/wine/${ing.wine}`} className='no-underline'>{ing.wineLot}</Link> - {ing.quantity} {t('liters')}</div>
    })

    return (<>
      <div>{t(`op-${event.type}`)}</div>
      <div><VesselLabel isBold>{event.vesselLabel}</VesselLabel> {event.wineLot}</div>
      <GoArrowDown  className="ms-3" />
      <div>{subWines}</div>
      {/* <div key={event.nextWine._id}><VesselLabel>{event.nextVesselLabel}</VesselLabel> <Link to={`/wine/${event.nextWine}`} className='no-underline'>{event.nextWineTag}</Link> - {event.nextQuantity} {t('liters')}</div> */}
      <hr className="my-2 w-50" />
      <div>{t("op-sub-remaining")}{event.quantityBefore - event.quantity} {t('liters')}</div>

      <TaskNote>{event.note}</TaskNote>
    </>)    
  };

  const renderSplitTo = () => {
    return (<>
      <div>{t(`op-${event.type}`)}</div>
      <div>
        <VesselLabel>{event.refVesselLabel}</VesselLabel> <Link to={`/wine/${event.refWine}`} className='no-underline'>{event.refWineLot}</Link> 
        <GoArrowRight className="mx-2" />
        {event.quantity} {t('liters')}      
      </div>

      

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

      </span> <VesselLabel>{event.refVesselLabel}</VesselLabel> <Link to={`/wine/${event.refWine}`} className='no-underline'>{event.refWineLot}</Link></div>

      <hr className="my-2 w-50" />
      {remaining}
    </>)    
  };

  const renderBlend = () => {

    let blendQuantity = 0;
    const ingredients = event.subTasks.map((ing) => {
      blendQuantity += ing.quantity;
      return <div key={ing._id}><VesselLabel isBold>{ing.vesselLabel}</VesselLabel> <Link to={`/wine/${ing.wine}`} className='no-underline'>{ing.wineLot}</Link> - {ing.quantity} {t('liters')}</div>
    })

    return (<>
      <div>{t(`op-${event.type}`)}</div>
      <div>{ingredients}</div>

      <GoArrowDown  className="ms-3" />

      <div>
        <VesselLabel>{event.vesselLabel}</VesselLabel> {event.wineLot} - {event.quantityBefore} {t('liters')}
      </div>
      <hr className="my-2 w-50" />
      <div>{t("op-total-quantity")} {event.quantityBefore + blendQuantity} {t('liters')}</div>
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
        <VesselLabel isBold>{event.vesselLabel}</VesselLabel> {event.wineLot} - {event.quantityBefore} {t('liters')}
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
    case "split-from":
      taskContent = renderSplitFrom();
      break;
    case "split-to":
      taskContent = renderSplitTo();
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