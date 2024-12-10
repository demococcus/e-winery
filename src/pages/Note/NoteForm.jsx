import { useTranslation } from 'react-i18next';
import { useNavigate, useParams  } from 'react-router-dom';
import * as formik from 'formik';
import * as yup from 'yup';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useAddWineNoteMutation } from "../../store";
import ErrorMsgBox from '../_shared/ErrorMsgBox';
import PageTitle from '../_shared/PageTitle';
import { getCurrentDate } from '../../utils';
import { useFetchWineByIdQuery } from '../../store';
import VesselLabel from '../_shared/VesselLabel';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PlaceholderBlock from '../_shared/PlaceholderBlock';


function NoteForm() {

  const { t } = useTranslation();
  const { id } = useParams();
  const { Formik } = formik; 
  const navigate = useNavigate();
  const [addNote, results] = useAddWineNoteMutation();

  // fetch the data
  const { data:wine, error, isLoading } = useFetchWineByIdQuery(id);

  if (isLoading) {
    return <div><PlaceholderBlock times={1}/></div>
  } else if (error) {
    return <ErrorMsgBox />
  }

    // console.log(wine)

  const handleSubmit = async (values, { setSubmitting }) => {

   
    // send the request to the server
    const submitResult = await addNote(values);
    
    // verify if the result succeeds
    if (submitResult.error) {
      return;
    }

    setSubmitting(false);

    // navigate to the home page when ready
    navigate(`/wine/${id}`)
  };

  const schema = yup.object().shape({

  note: yup
    .string(t('val-string'))
    .required(t('val-required'))
    .min(5, `${t('val-min-len')} 5 ${t('val-characters')}`)
    .max(120, `${t('val-max-len')} 120 ${t('val-characters')}`),

    date: yup
      .date()
      .required(t("val-required")) 
      .typeError(t("val-invalid-date")),

  });

  const initialFormValues = {
    date: getCurrentDate(false),    
    wine: id,
    note: '',
  };
 

  return (<>
    <PageTitle>{t('note-page-titile')}</PageTitle>

    <div><VesselLabel>{wine.vessel?.label}</VesselLabel> {wine.lot}</div>

    <div className='mt-4'>

    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={initialFormValues}
      
    >
      {({ handleSubmit, handleChange, setFieldValue, values, touched, errors  }) => (
        <Form noValidate onSubmit={handleSubmit}>

          <Row className="mb-3">

            <Form.Group as={Col} md="6" controlId="note">
              <Form.Label>{t("note-note")}</Form.Label>
              <Form.Control
                type="string"
                // placeholder={t("lab-alcohol")}
                name="note"
                value={values.note}
                onChange={handleChange}
                isInvalid={touched.note && !!errors.note}

              />
              <Form.Control.Feedback type="invalid">{errors.note}</Form.Control.Feedback>            
            </Form.Group>

          </Row>

          <Row className="mb-4">

            <Form.Group as={Col} md="3" controlId="date">
              <Form.Label>{t("lab-date")}</Form.Label>

              <div>
              <DatePicker
                selected={values.date}
                dateFormat="yyyy-MM-dd"
                onChange={(date) => setFieldValue("date", date)} // Update Formik's state
                // TODO - validation
                className={`form-control ${
                  touched.date && errors.date ? "is-invalid" : ""
                }`}
              />
              </div>
              <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
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

export default NoteForm;