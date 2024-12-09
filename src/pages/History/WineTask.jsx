import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { GoArrowDown } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";

import VesselLabel from "../_shared/VesselLabel";
import TaskNote from "./TaskNote";
import './WineTask.css';
import { wineTaskSimpleTypes } from './opTypes';


function WineTask({noLinks=false, children}) {

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
      <div><VesselLabel isBold>{event.vesselLabel}</VesselLabel> {event.wineLot}</div>
      
      <GoArrowDown  className="ms-3" />

      <div><VesselLabel>{event.nextVesselLabel}</VesselLabel></div>
      <TaskNote>{event.note}</TaskNote>
    </>)    
  };

  const renderSplitFrom = () => {

    const subWines = event.subTasks.map((ing) => {
      let result = <div key={ing._id}><Link to={`/wine/${ing.wine}`} className='no-underline'><VesselLabel>{ing.vesselLabel}</VesselLabel></Link></div>
      if (noLinks) {result = <div key={ing._id}><VesselLabel>{ing.vesselLabel}</VesselLabel></div>}
      return result
    })

    return (<div key={event._id}>
      <div>{t(`op-${event.type}`)}</div>
      <div><VesselLabel isBold>{event.vesselLabel}</VesselLabel> {event.wineLot} - {event.quantity} {t('liters')}</div>
      <GoArrowDown  className="ms-3" />
      <div>{subWines}</div>
      <hr className="my-2 w-50" />
      <div>{t("op-sub-remaining")}{event.quantityBefore - event.quantity} {t('liters')}</div>

      <TaskNote>{event.note}</TaskNote>
    </div>)    
  };

  const renderSplitTo = () => {
    return (<>
      <div>{t(`op-${event.type}`)}</div>
      <div>
        <VesselLabel>{event.refVesselLabel}</VesselLabel>&nbsp;
          {noLinks ? event.refWineLot : <Link to={`/wine/${event.refWine}`} className='no-underline'>{event.refWineLot}</Link>}
        <GoArrowRight className="mx-2" />
        {event.quantity} {t('liters')}      
      </div>    
    </>)    
  };

  const renderTransferOut = () => {

    const remainingQuantity = event.quantityBefore - event.quantity;
    const remainingText = remainingQuantity <= 0 ? <div>{t("op-sub-depleted")}</div> : <div>{t("op-sub-remaining")}{remainingQuantity} {t('liters')}</div>;


    return (<>
      <div>{t(`op-${event.type}`)}</div>
      <div>{event.quantity} {t('liters')} <span className="mx-2">
      
      <GoArrowRight />

      </span> <VesselLabel>{event.refVesselLabel}</VesselLabel>&nbsp;
        {noLinks ? event.refWineLot : <Link to={`/wine/${event.refWine}`} className='no-underline'>{event.refWineLot}</Link>}        
      </div>

      <hr className="my-2 w-50" />
      {remainingText}
    </>)    
  };

  const renderBlend = () => {

    let blendQuantity = 0;
    const ingredients = event.subTasks.map((ing) => {
      blendQuantity += ing.quantity;
      const wholeQuantity = ing.quantity === ing.quantityBefore ? <span>{t('op-ingredient-all')}</span> : null;
      return (<div key={ing._id}><VesselLabel isBold>{ing.vesselLabel}</VesselLabel>&nbsp;
       {noLinks ? ing.wineLot : <Link to={`/wine/${ing.wine}`} className='no-underline'>{ing.wineLot}</Link>}
       {" - "}{ing.quantity} {t('liters')} {wholeQuantity}</div>)
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

  const renderVinification = () => {

    const ingredients = event.grapeSubTasks.map((ing) => {   
      return <div key={ing._id}><Link to={`/grape/${ing.grape}`} className='no-underline'>{ing.grapeParcel}</Link> - {ing.quantity} {t('u-kg')}</div>
    })

    return (<>
      <div>{t(`op-${event.type}`)}</div>
      <div>{ingredients}</div>

      <GoArrowDown  className="ms-3" />

      <div>
        <VesselLabel>{event.vesselLabel}</VesselLabel> {event.wineLot}
      </div>
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


  if (wineTaskSimpleTypes.includes(event.type)) {
    taskContent = renderSimpleTask();
  } else {
    switch (event.type) {

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
      case "vinification":
        taskContent = renderVinification();
        break;
      case "additive":
        taskContent = renderAdditive();
        break;

      default: 
      taskContent = "Unknown"       
        break;
    }
  }

  return taskContent;
    


}

export default WineTask;