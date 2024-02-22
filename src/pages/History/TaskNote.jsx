import { useTranslation } from "react-i18next";

function TaskNote({children}) {
  const { t } = useTranslation();

  return children !== null ? <div style={{ fontStyle: 'italic' }} className="mt-2">{t("op-note")} {children}</div> : null;

} 

export default TaskNote;