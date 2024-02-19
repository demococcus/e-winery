import { Alert } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import PageTitle from "./PageTitle";

function NotFound()  {

  const { t } = useTranslation();
  
  return (
    <>
    <PageTitle>{t("not-found-title")}</PageTitle>
    <Alert variant="info">
      <Alert.Heading>{t("not-found")}</Alert.Heading>
      <p>{t("not-found-details")}</p>
    </Alert>
    </>
  );
}

export default NotFound;