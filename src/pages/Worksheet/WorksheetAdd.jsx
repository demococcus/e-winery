import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from "react-redux";

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import PageTitle from '../_shared/PageTitle';
import Manipulation from './Manipulation';
import Blend from './Blend';
import Additive from './Additive';

import {resetTask, setTaskCategory } from "../../store";
import Transfer from './Transfer';


function WorksheetAdd() {

  const { t } = useTranslation();
  const dispatch = useDispatch();

  // Reset the task form form when the component is mounted
  useEffect(() => {
    dispatch(resetTask());
  } , [dispatch]);
    

  // get the task from the store
  const task = useSelector((state) => {
    return state.worksheet.task
  });


  const radios = [
    { name: t("add-task-manipulation"), value: 'manipulation' },
    { name: t("add-task-transfer"), value: 'transfer' },
    { name: t("add-task-blend"), value: 'blend' },
    { name: t("add-task-additive"), value: 'additive' },
  ];

  const handleRadioChange = (e) => {
    dispatch(setTaskCategory(e.currentTarget.value));
  }

  return (<>

    <PageTitle>{t('add-task-title')}</PageTitle>

    <ButtonGroup className='mb-3'>
      {radios.map((radio, idx) => (
        <ToggleButton
          key={idx}
          id={`radio-${idx}`}
          type="radio"
          variant='outline-primary'
          name="radio"
          value={radio.value}
          checked={task.category === radio.value}
          onChange={handleRadioChange}
        >
          {radio.name}
        </ToggleButton>
      ))}
    </ButtonGroup>

    {task.category === "manipulation" && <Manipulation />}
    {task.category === "transfer" && <Transfer />}
    {task.category === "blend" && <Blend />}
    {task.category === "additive" && <Additive />}
    
  </>);
}

export default WorksheetAdd;