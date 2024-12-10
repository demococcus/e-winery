import { useTranslation } from 'react-i18next';
import { useNavigate, useParams  } from 'react-router-dom';
import * as formik from 'formik';
import * as yup from 'yup';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ErrorMsgBox from '../_shared/ErrorMsgBox';
import PageTitle from '../_shared/PageTitle';
import { getCurrentDate } from '../../utils';

import PlaceholderBlock from '../_shared/PlaceholderBlock';
import { useReceiveAdditiveMutation } from '../../store';
import { useFetchAdditiveByIdQuery } from '../../store';


function AdditiveReceiveForm() {

  const { t } = useTranslation();
  const { id } = useParams();


  const { Formik } = formik; 
  const navigate = useNavigate();
  const [receiveAdditive, results] = useReceiveAdditiveMutation();

  // fetch the data
  const { data:additive, error, isLoading } = useFetchAdditiveByIdQuery(id);

  if (isLoading) {
    return <div><PlaceholderBlock times={1}/></div>
  } else if (error) {
    return <ErrorMsgBox />
  }

  const handleSubmit = async (values, { setSubmitting }) => {

  
    // send the request to the server
    const submitResult = await receiveAdditive(values);
    
    // verify if the result succeeds
    if (submitResult.error) {
      return;
    }

    setSubmitting(false);

    // navigate to the home page when ready
    navigate(`/additive/${id}`)
  };

  const schema = yup.object().shape({

    quantity: yup
      .number(t('val-number'))
      .required(t('val-required'))
      .typeError(t('val-number'))
      .min(0, `${t('val-min')} 0`)
      .max(1000, `${t('val-max')} 1000`),    

    supplier: yup
      .string(t('val-string'))
      .required(t('val-required'))
      .min(3, `${t('val-min-len')} 3 ${t('val-characters')}`)
      .max(60, `${t('val-max-len')} 60 ${t('val-characters')}`),

  });

  const initialFormValues = {
    // date: getCurrentDate(),    
    id: id,
    quantity: '',
    supplier: '',
  };

 

  return (<>
    <PageTitle>{t('additive-receive-title')}</PageTitle>

    <div>{additive.label}</div>

    <div className='mt-4'>

    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={initialFormValues}
      
    >
      {({ handleSubmit, handleChange, values, touched, errors  }) => (
        <Form noValidate onSubmit={handleSubmit}>

          <Row className="mb-3">

            <Form.Group as={Col} md="3" controlId="quantity">
              <Form.Label>{t("additive-quantity")}</Form.Label>
              <Form.Control
                type="number"
                // placeholder={t("lab-alcohol")}
                name="quantity"
                value={values.quantity}
                onChange={handleChange}
                // isValid={touched.alcohol && !errors.alcohol}
                isInvalid={touched.quantity && !!errors.quantity}

              />
              <Form.Control.Feedback type="invalid">{errors.quantity}</Form.Control.Feedback>            
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="supplier">
              <Form.Label>{t("additive-supplier")}</Form.Label>
              <Form.Control
                type="string"
                // placeholder={t("something")}
                name="supplier"
                value={values.supplier}
                onChange={handleChange}
                // isValid={touched.supplier && !errors.supplier}
                isInvalid={touched.supplier && !!errors.supplier}

              />
              <Form.Control.Feedback type="invalid">{errors.quantity}</Form.Control.Feedback>            
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

export default AdditiveReceiveForm;