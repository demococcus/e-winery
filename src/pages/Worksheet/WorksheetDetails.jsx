import { useTranslation } from 'react-i18next';
import WineTask from "../History/WineTask";
import PageTitle from '../_shared/PageTitle';
import './WorksheetDetails.css';

import { Button } from 'react-bootstrap';

function WorksheetDetails({ wineTask, canDelete=false }) {

    const { t } = useTranslation();

    const handlePrint = () => {
        window.print();
    };


    // console.log(wineTask)


  // Transform event.date to a string object like '2021-09-01'
  const dateString = new Date(wineTask.date).toISOString().split('T')[0];

  return (<div>
    <PageTitle>{t('ws-Task')} {wineTask.seqNumber}</PageTitle>

    <div>{t('ws-print-User-by')}: {wineTask.userName}</div>
    <div className='mb-4'>{t('ws-print-Date-by')}: {dateString}</div>
    
    <WineTask>{wineTask}</WineTask>

    <div className="mt-5">{t('ws-print-User-done')}: .................................................</div>
    <div className="mt-5">{t('ws-print-Date-done')}: ...................................</div>

    <Button className='mt-5 print-hide' onClick={handlePrint}>{t('ws-print-task')}</Button>

  </div>);

}

export default WorksheetDetails;