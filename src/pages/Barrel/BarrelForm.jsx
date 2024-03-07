import { useTranslation } from 'react-i18next';
import { useNavigate  } from 'react-router-dom';
import * as formik from 'formik';
import * as yup from 'yup';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useAddVesselMutation } from "../../store";
import ErrorMsgBox from '../_shared/ErrorMsgBox';
import PageTitle from '../_shared/PageTitle';


function BarrelForm() {
  
  const { t } = useTranslation();
  const { Formik } = formik; 
  const navigate = useNavigate();
  const [addVessel, results] = useAddVesselMutation();

  const handleSubmit = async (values, { setSubmitting }) => {

    // create a new vessel
    const newVessel = {
      ...values,
      type: "barrel",
    };

    // send the request to the server
    const submitResult = await addVessel(newVessel);
    
    // verify if the result succeeds
    if (submitResult.error) {
      return;
    }

    setSubmitting(false);

    // navigate to the home page when ready
    navigate(`/barrels`)

  };

  const schema = yup.object().shape({

    label: yup
      .string(t('val-string'))
      .required(t('val-required'))
      .min(3, `${t('val-min-len')} 3 ${t('val-characters')}`)
      .max(30, `${t('val-max-len')} 30 ${t('val-characters')}`),

    number: yup
      .number(t('val-number'))
      .integer(t('val-integer'))
      .required(t('val-required'))
      .min(1, `${t('val-min')} 1`)
      .max(100, `${t('val-max')} 100`),

    capacity: yup
      .number(t('val-number'))
      .required(t('val-required'))
      .min(1, `${t('val-min')} 1`)
      .max(1000, `${t('val-max')} 1000`),

    // terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
  });
 

  return (<>
    <PageTitle>{t('barrel-add-title')}</PageTitle>


    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{
        label: '',
        number: '',
        capacity: 225,

      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting  }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">

            <Form.Group as={Col} md="6" controlId="validationLabel">
              <Form.Label>{t("vessel-form-label")}</Form.Label>
              <Form.Control
                type="text"
                // placeholder={t("vessel-form-label")}
                name="label"
                value={values.label}
                onChange={handleChange}
                isValid={touched.label && !errors.label}
                isInvalid={touched.label && !!errors.label}

              />
              <Form.Control.Feedback type="invalid">{errors.label}</Form.Control.Feedback>
            </Form.Group>

          </Row>

          <Row className="mb-3">

            <Form.Group as={Col} md="3" controlId="validationNumber">
              <Form.Label>{t("vessel-form-number")}</Form.Label>
              <Form.Control
                type="number"
                // placeholder={t("vessel-form-number")}
                name="number"
                value={values.number}
                onChange={handleChange}
                isValid={touched.number && !errors.number}
                isInvalid={touched.number && !!errors.number}
              />
              <Form.Control.Feedback type="invalid">{errors.number}</Form.Control.Feedback>

            </Form.Group>

            <Form.Group as={Col} md="3" controlId="validationCapacity">
              <Form.Label>{t("barrel-form-capacity")}</Form.Label>
              <Form.Control
                type="number"
                // placeholder={t("barrel-form-capacity")}
                name="capacity"
                value={values.capacity}
                onChange={handleChange}
                isInvalid={touched.capacity && !!errors.capacity}
                isValid={touched.capacity && !errors.capacity}
              />
              <Form.Control.Feedback type="invalid">{errors.capacity}</Form.Control.Feedback>
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
    
  </>);

};

export default BarrelForm;