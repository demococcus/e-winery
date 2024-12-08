import { useTranslation } from 'react-i18next';
import WineTask from "../History/WineTask";
import PageTitle from '../_shared/PageTitle';
import { useFetchWineHistoryQuery } from "../../store";
import { Button } from 'react-bootstrap';
import PlaceholderBlock from '../_shared/PlaceholderBlock';
import ErrorMsgBox from "../_shared/ErrorMsgBox";
import { useNavigate  } from 'react-router-dom';
import {useDeleteWineTaskMutation } from "../../store"; 

function WorksheetDetails({ wineTask }) {

  const [deleteTask] = useDeleteWineTaskMutation();

  const { t } = useTranslation();
  const navigate = useNavigate();

  // fetch the history of the wine
  const { data, error, isLoading } = useFetchWineHistoryQuery(wineTask.wine);

  if (isLoading) {
    return <div><PlaceholderBlock times={1}/></div>
  } else if (error) {
    return <ErrorMsgBox />
  }

  const events = [...data];
  // sort the tasks by date (should already be sorted by the backend)
  events.sort((a, b) => (a.date < b.date) ? 1 : -1);

  // get the first task
  const firstOp = events.find(event => event.type !== 'lab');
  const firstOpId = firstOp ? firstOp._id : null;
  
  // if the current task is the most recent task, it can be undone
  let canUndo = false;
  if (firstOpId && firstOpId === wineTask._id) {canUndo = true};  

  // Transform event.date to a string object like '2021-09-01'
  const dateString = new Date(wineTask.date).toISOString().split('T')[0];


  const handleDelete = () => {
    deleteTask(wineTask._id)
    navigate('/worksheets')
  }



  return (<div>
    <PageTitle>{t('ws-Task')} {wineTask.seqNumber}</PageTitle>

    <div>{t('ws-print-User-by')}: {wineTask.userName}</div>
    <div className='mb-4'>{t('ws-print-Date-by')}: {dateString}</div>
    


    <WineTask noLinks>{wineTask}</WineTask>

    <div className='d-none d-print-block'>
      <div className="mt-5">{t('ws-print-User-done')}: .................................................</div>
      <div className="mt-5">{t('ws-print-Date-done')}: ...................................</div>
    </div>


    <div className='mt-5 d-print-none' >
      <Button className='me-2' onClick={() => window.print()}>{t('ws-print-task')}</Button>
      <Button 
        variant={canUndo ? "danger" : "outline-secondary"}
        disabled={!canUndo}  
        onClick={handleDelete}
        >{t('action-undo')}</Button>
    </div>



  </div>);

}

export default WorksheetDetails;