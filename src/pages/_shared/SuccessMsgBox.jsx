import { Alert } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import { memo } from "react";


function SuccessMsgBox({children}) {

  const { t } = useTranslation();

  const content = children ? children : t('msg-box-success-text');
  
  return (
    <Alert key='success' variant='success' className="my-3">
      <Alert.Heading>{t('msg-box-success')}</Alert.Heading>
      <p>{content}</p>
  </Alert>
  );

} 

export default memo(SuccessMsgBox);