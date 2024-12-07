import { useTranslation } from 'react-i18next';
import { useNavigate  } from 'react-router-dom';
import * as formik from 'formik';
import * as yup from 'yup';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useAddAdditiveMutation } from "../../store";
import ErrorMsgBox from '../_shared/ErrorMsgBox';
import PageTitle from '../_shared/PageTitle';



function AdditiveForm() {

  const { t } = useTranslation();
  const { Formik } = formik; 

  const navigate = useNavigate();

  const [addAdditive, results] = useAddAdditiveMutation();


  const handleSubmit = async (values, { setSubmitting }) => {

    // create a new vessel
    const newAdditive = {
      ...values,
    };

    // send the request to the server
    const submitResult = await addAdditive(newAdditive);
    
    // verify if the result succeeds
    if (submitResult.error) {
      return;
    }

    setSubmitting(false);

    // navigate to the home page when ready
    navigate(`/additives`)

  };

  const unitsArray = ["u-kg", "u-g", "u-mg", "u-l", "u-ml", "u-gal", "u-oz", "u-ppm", "u-lb"];
  const dropdownOptions = unitsArray.map((unit) => <option key={unit} value={unit}>{t(`${unit}-both`)}</option>);

  const schema = yup.object().shape({

    label: yup
      .string(t('val-string'))
      .required(t('val-required'))
      .min(3, `${t('val-min-len')} 3 ${t('val-characters')}`)
      .max(30, `${t('val-max-len')} 30 ${t('val-characters')}`),

    unit: yup
      .string(t('val-string'))
      .required(t('val-required'))
      .notOneOf([''], 'Unit must not be empty'),


    // terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
  });

 

  return (<>
    <PageTitle>{t('additive-add-title')}</PageTitle>

    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{
        label: '',
        unit: '',
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting  }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">

            <Form.Group as={Col} md="3" controlId="validationLabel">
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

            <Form.Group as={Col} md="3" controlId="validationNumber">
              <Form.Label>{t("additive-unit")}</Form.Label>
              <Form.Control
                name="unit"
                as="select"
                // placeholder={t("additive-unit")}
                value={values.unit}
                onChange={handleChange}
                isValid={touched.unit && !errors.unit}
                isInvalid={touched.unit && !!errors.unit}
              >
                <option value="">{t("additive-select-unit")}</option>
                {dropdownOptions}
              </Form.Control>
              <Form.Control.Feedback type="invalid">{errors.unit}</Form.Control.Feedback>

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

export default AdditiveForm;