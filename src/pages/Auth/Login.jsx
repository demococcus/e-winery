import { useTranslation } from 'react-i18next';
import { useNavigate  } from 'react-router-dom';
import * as formik from 'formik';
import * as yup from 'yup';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { setUserInfo, setUserToken, useLoginUserMutation } from "../../store";
import ErrorMsgBox from '../_shared/ErrorMsgBox';
import PageTitle from '../_shared/PageTitle';
import { useDispatch } from 'react-redux';


function Login() {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { Formik } = formik; 
  const navigate = useNavigate();
  const [submitLoginData, results] = useLoginUserMutation();

  const handleSubmit = async (values, { setSubmitting }) => {
   
    // send the request to the server
    const submitResult = await submitLoginData(values);
    
    // verify if the result succeeds
    if (submitResult.error) {
      console.log('Login attempt failed:', submitResult.error);
      return;
    }

    const user = submitResult.data.user;
    const token = submitResult.data.token;

    // Save the token and the user in the state  (and in the local storage)
    dispatch(setUserInfo(user));
    dispatch(setUserToken(token));

    setSubmitting(false);

    // navigate to the user page
    navigate(`/wines`) 
    
  };

  const schema = yup.object().shape({

    email: yup
      .string(t('login-email-prompt'))
      .email(t('login-email-prompt'))
      .required(t('login-email-prompt'))
      .min(8, `${t('val-min-len')} 8 ${t('val-characters')}`)
      .max(50, `${t('val-max-len')} 50 ${t('val-characters')}`),

    password: yup
      .string(t('val-string'))
      .required(t('login-password-prompt'))
      .min(8, `${t('val-min-len')} 8 ${t('val-characters')}`)
      .max(30, `${t('val-max-len')} 30 ${t('val-characters')}`),

  });

 

  return (<>
    <PageTitle>{t('login-title')}</PageTitle>

    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{
        email: '',
        password: '',

      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting  }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">

            <Form.Group as={Col} md="5" controlId="validationLabel">
              <Form.Control
                type="email"
                placeholder={t("login-email")}
                name="email"
                value={values.email}
                onChange={handleChange}
                isValid={touched.email && !errors.email}
                isInvalid={touched.email && !!errors.email}

              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>

            <Row className="mb-3">

            </Row>


            <Form.Group as={Col} md="5" controlId="validationCapacity">
              <Form.Control
                type="password"
                placeholder={t("login-password")}
                name="password"
                value={values.password}
                onChange={handleChange}
                isInvalid={touched.password && !!errors.password}
                isValid={touched.password && !errors.password}
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>

          </Row>


          <Button 
            type="submit" 
            variant="primary" 
            disabled={results.isLoading}
          >
            {results.isLoading ? (
              <>
                <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                <span className='ms-2'>{t("form-wait")}</span>
              </>
            ) : (
              t("form-submit")
            )}
          </Button>



          <Row className="mb-3">
            <Col md="8">
            {results.isError && <ErrorMsgBox />} 
          </Col>
      </Row>


        </Form>
      )}
    </Formik>


  </>
  );

};

export default Login;