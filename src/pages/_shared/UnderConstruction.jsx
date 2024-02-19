import { Alert } from "react-bootstrap";
import { useTranslation } from 'react-i18next';

function UnderConstruction()  {

  const { t } = useTranslation();
  
  return (
    <Alert variant="info">
      <Alert.Heading>{t("under-construction")}</Alert.Heading>
      <p>{t("under-construction-details")}</p>
    </Alert>
  );
}

export default UnderConstruction;