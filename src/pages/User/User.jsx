import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";

import PageTitle from "../_shared/PageTitle";
import { useTranslation } from "react-i18next";


function User() {

  const navigate = useNavigate();
  const { t } = useTranslation();

  // get the auth state from the store
  const userInfo = useSelector((state) => state.auth.userInfo);
  
  // details about the user and log-out button
  const userDetails = (<>
    <div>{t('user-name')}: {userInfo?.name}</div>
    <div>{t('user-email')}: {userInfo?.email}</div>
    <div>{t('user-role')}: {t(`role-${userInfo?.role}`)}</div>
    <div>{t('user-company')}: {userInfo?.company?.name}</div>
    <div>{t('user-language')}: {t(`lang-${userInfo?.language}`)}</div>


    <Button 
      className="me-2 mt-4" 
      variant="primary"
      onClick={() => {
        navigate('/logout');
      }}
    >{t('user-logout')}</Button>

  </>);


  return (<>
    <PageTitle>{t("user-title")}</PageTitle>
    
    {userInfo && userDetails}    
  </>);
}

export default User;
