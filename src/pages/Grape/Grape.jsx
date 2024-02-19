import { useTranslation } from 'react-i18next';
import PageTitle from "../_shared/PageTitle";
import UnderConstruction from "../_shared/UnderConstruction";

function Grape()  {

  const { t } = useTranslation();

  return(
    <div>
      <PageTitle>{t("grape-title")}</PageTitle>
      <UnderConstruction />
    </div>
  );
}

export default Grape;