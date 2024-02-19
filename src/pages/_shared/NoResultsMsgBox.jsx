import { Alert } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import { memo } from "react";

function NoResultsMsgBox({children}) {

  const { t } = useTranslation();

  const content = children ? children : t('msg-box-no-results-text');
  
  return (
    <Alert key='secondary' variant='secondary' className="my-3">
      <Alert.Heading>{t('msg-box-no-results')}</Alert.Heading>
      {content}
    </Alert>
  );

} 

export default memo(NoResultsMsgBox);