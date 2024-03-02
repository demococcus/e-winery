import { useDispatch } from "react-redux";
import PageTitle from "../_shared/PageTitle";

import { resetUserInfoAndToken, useLogoutUserQuery } from "../../store";
import SuccessMsgBox from "../_shared/SuccessMsgBox";
import { Col, Row } from "react-bootstrap";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";



function LogOut() {

  const dispatch = useDispatch(); 
  const { error, isLoading } = useLogoutUserQuery(null);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(resetUserInfoAndToken(null));
  }, [dispatch]);


  if (isLoading || error) {
    // console.log("isLoading");
  } else {
    // console.log("dispatching resetUserInfoAndToken");  
  }

  return(<>
    <PageTitle>{t("logout-title")}</PageTitle>
    <Row className="mb-3">
        <Col md="6">
          <SuccessMsgBox>
            {t("logout-msg")}
          </SuccessMsgBox>
        </Col>
      </Row>  
  </>);

}

export default LogOut;

