import { Alert } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import { memo } from "react";

function ErrorMsgBox({children}) {

  const { t } = useTranslation();

  const content = children ? children : t('msg-box-error-text');
  
  return (
    <Alert key='danger' variant='danger' className="my-3">
      <Alert.Heading>{t('msg-box-error')}</Alert.Heading>
      {content}
    </Alert>
  );

} 

export default memo(ErrorMsgBox);