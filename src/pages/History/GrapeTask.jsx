import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { GoArrowRight } from "react-icons/go";

import VesselLabel from "../_shared/VesselLabel";
import './WineTask.css';



function GrapeTask({children}) {

  const event = children;
  const { t } = useTranslation();


  const renderVinification = () => {


    return (<>
      <div>{t(`op-${event.type}`)}</div>
      <div>{event.quantity} {t('u-kg')} <span className="mx-2">
      
      <GoArrowRight />

      </span> <VesselLabel>{event.refVesselLabel}</VesselLabel> <Link to={`/wine/${event.refWine}`} className='no-underline'>{event.refWineLot}</Link></div>

    </>)    
  };




  let taskContent;


  switch (event.type) {

    case "vinification":
      taskContent = renderVinification();
      break;

    default: 
    taskContent = "Unknown"       
      break;
  }


  return taskContent;
    


}

export default GrapeTask;