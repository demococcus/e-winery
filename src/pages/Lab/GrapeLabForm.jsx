import { useTranslation } from 'react-i18next';
import { useNavigate, useParams  } from 'react-router-dom';
import * as formik from 'formik';
import * as yup from 'yup';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useAddGrapeLabMutation } from "../../store";
import ErrorMsgBox from '../_shared/ErrorMsgBox';
import PageTitle from '../_shared/PageTitle';
import { getCurrentDate } from '../../utils';


function GrapeLabForm() {

  const { t } = useTranslation();
  const { id } = useParams();
  const { Formik } = formik; 
  const navigate = useNavigate();
  const [AddLab, results] = useAddGrapeLabMutation();

  const handleSubmit = async (values, { setSubmitting }) => {

   
    // send the request to the server
    const submitResult = await AddLab(values);
    
    // verify if the result succeeds
    if (submitResult.error) {
      return;
    }

    setSubmitting(false);

    // navigate to the home page when ready
    navigate(`/grape/${id}`)
  };

  const schema = yup.object().shape({


    sugars: yup
    .number(t('val-number'))
    .min(0, `${t('val-min')} 0`)
    .max(400, `${t('val-max')} 400`),

    pH: yup
    .number(t('val-number'))
    .min(2, `${t('val-min')} 1`)
    .max(4, `${t('val-max')} 4`),

    tAcids: yup
    .number(t('val-number'))
    .min(4, `${t('val-min')} 4`)
    .max(12, `${t('val-max')} 12`),


  });

  const initialFormValues = {
    date: getCurrentDate(),    
    grape: id,
    sugars: '',
    pH: '',
    tAcids: '',

  };

 

  return (<>
    <PageTitle>{t('add-lab-title')}</PageTitle>

    <div className='mt-4'>

    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={initialFormValues}
      
    >
      {({ handleSubmit, handleChange, values, touched, errors  }) => (
        <Form noValidate onSubmit={handleSubmit}>

          <Row className="mb-3">


            <Form.Group as={Col} md="3" controlId="sugars">
              <Form.Label>{t("lab-sugars")}</Form.Label>
              <Form.Control
                type="number"
                // placeholder={t("lab-sugars")}
                
                name="sugars"
                value={values.sugars}
                onChange={handleChange}
                // isValid={touched.sugars && !errors.sugars}
                isInvalid={touched.sugars && !!errors.sugars}
              />
              <Form.Control.Feedback type="invalid">{errors.sugars}</Form.Control.Feedback>
            </Form.Group>

          </Row>



          <Row className="mb-3">

            <Form.Group as={Col} md="3" controlId="pH">
              <Form.Label>{t("lab-pH")}</Form.Label>
              <Form.Control
                type="text"
                // placeholder={t("lab-pH")}
                name="pH"
                value={values.pH}
                onChange={handleChange}
                // isValid={touched.pH && !errors.pH}
                isInvalid={touched.pH && !!errors.pH}

              />
              <Form.Control.Feedback type="invalid">{errors.pH}</Form.Control.Feedback>            
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="tAcids">
              <Form.Label>{t("lab-tAcids")}</Form.Label>
              <Form.Control
                type="number"
                // placeholder={t("lab-tAcids")}
                name="tAcids"
                value={values.tAcids}
                onChange={handleChange}
                // isValid={touched.tAcids && !errors.tAcids}
                isInvalid={touched.tAcids && !!errors.tAcids}
              />
              <Form.Control.Feedback type="invalid">{errors.tAcids}</Form.Control.Feedback>
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

    </div>


  </>
  );

}

export default GrapeLabForm;