import { useDispatch } from "react-redux";
import PageTitle from "../_shared/PageTitle";

import { resetUserInfoAndToken, useLogoutUserQuery } from "../../store";
import SuccessMsgBox from "../_shared/SuccessMsgBox";
import { Col, Row } from "react-bootstrap";
import { useEffect } from "react";



function LogOut() {

  const dispatch = useDispatch(); 
  const { error, isLoading } = useLogoutUserQuery(null);

  useEffect(() => {
    dispatch(resetUserInfoAndToken(null));
  }, [dispatch]);


  if (isLoading || error) {
    // console.log("isLoading");
  } else if (error) {
    // console.log("error", error);
  } else {
    // console.log("dispatching resetUserInfoAndToken");  
  }

  return(<>
    <PageTitle>See you later</PageTitle>
    <Row className="mb-3">
        <Col md="6">
          <SuccessMsgBox>
            You have been logged out.
          </SuccessMsgBox>
        </Col>
      </Row>  
  </>);

};

export default LogOut;

