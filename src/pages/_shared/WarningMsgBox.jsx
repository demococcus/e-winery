import { Alert } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import { memo } from "react";

function WarningMsgBox({children}) {

  const { t } = useTranslation();

  const content = children ? children : t('msg-box-error-text');
  
  return (
    <Alert key='warning' variant='warning' className="my-3">
      <Alert.Heading>{t('msg-box-warning')}</Alert.Heading>
      {content}
    </Alert>
  );

} 

export default memo(WarningMsgBox);