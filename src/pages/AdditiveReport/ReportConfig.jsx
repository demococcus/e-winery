import { useTranslation } from 'react-i18next';
import { useNavigate  } from 'react-router-dom';
import * as formik from 'formik';
import * as yup from 'yup';

import { useState } from 'react'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useAddAdditiveMutation } from "../../store";
import ErrorMsgBox from '../_shared/ErrorMsgBox';
import PageTitle from '../_shared/PageTitle';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PlaceholderBlock from '../_shared/PlaceholderBlock';
import { getCurrentDate, getFirstDayOfCurrentMonth } from '../../utils';
import List from './List';



function ReportConfig() {

  const { t } = useTranslation();
  const { Formik } = formik; 
  const [searchParams, setSearchParams] = useState(null);



  const handleSubmit = (values) => {

    // console.log('values', values)
    setSearchParams(values)


  };


  const schema = yup.object().shape({


    accounting: yup
      .string(t('val-string'))
      .required(t('val-required'))
      .min(3, `${t('val-min-len')} 3 ${t('val-characters')}`)
      .max(30, `${t('val-max-len')} 30 ${t('val-characters')}`),

    dateFrom: yup
      .date()
      .required(t("val-required")) 
      .typeError(t("val-invalid-date")),

    dateTo: yup
      .date()
      .required(t("val-required")) 
      .typeError(t("val-invalid-date")),

  });

  const controlBar = (

    <Formik      
      validationSchema={schema}
      onSubmit={handleSubmit}

      initialValues={{
        accounting: '',
        dateFrom: getFirstDayOfCurrentMonth(false),    
        dateTo: getCurrentDate(false),    
      }}
    >
      {({ handleSubmit, handleChange, values, setFieldValue, touched, errors, isSubmitting  }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">

            <Form.Group as={Col} md="3" controlId="validationAccounting">
              <Form.Label>{t("additive-acc")}</Form.Label>
              <Form.Control
                type="text"
                // placeholder={t("vessel-form-label")}
                name="accounting"
                value={values.accounting}
                onChange={handleChange}
                // isValid={touched.accounting && !errors.accounting}
                isInvalid={(touched.accounting && !!errors.accounting)}

              />
              <Form.Control.Feedback type="invalid">{errors.accounting}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="density">
              <Form.Label>{t("additive-date-from")}</Form.Label>

              <div>
              <DatePicker
                name="dateFrom"
                selected={values.dateFrom}
                dateFormat="yyyy-MM-dd"
                onChange={(date) => setFieldValue("dateFrom", date)}
                className={`form-control`}
              />
              </div>
              <Form.Control.Feedback type="invalid">{errors.dateFrom}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="density">
              <Form.Label>{t("additive-date-to")}</Form.Label>

              <div>
              <DatePicker
                name="dateTo"
                selected={values.dateTo}
                dateFormat="yyyy-MM-dd"
                onChange={(date) => setFieldValue("dateTo", date)}
                className={`form-control`}
              />
              </div>
              <Form.Control.Feedback type="invalid">{errors.dateTo}</Form.Control.Feedback>
            </Form.Group>

            
          </Row>

          <Button 
          className='mb-4'
            type="submit" 
            variant="primary" 
          >{t("form-submit")}</Button>

        </Form>
      )}
    </Formik>

  );



  
 

  return (<>
    <PageTitle>{t("additive-report")}</PageTitle>

    <div className="d-print-none">{controlBar}</div>

 
    {searchParams != null && <List searchParams={searchParams}/>}    

  </>
  );

};

export default ReportConfig;