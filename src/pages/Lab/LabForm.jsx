import { useTranslation } from 'react-i18next';
import { useNavigate, useParams  } from 'react-router-dom';
import * as formik from 'formik';
import * as yup from 'yup';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useAddWineLabMutation } from "../../store";
import ErrorMsgBox from '../_shared/ErrorMsgBox';
import PageTitle from '../_shared/PageTitle';
import { getCurrentDate } from '../../utils';
import { useFetchWineByIdQuery } from '../../store';
import VesselLabel from '../_shared/VesselLabel';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PlaceholderBlock from '../_shared/PlaceholderBlock';


function LabForm() {

  const { t } = useTranslation();
  const { id } = useParams();
  const { Formik } = formik; 
  const navigate = useNavigate();
  const [AddLab, results] = useAddWineLabMutation();

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
    const submitResult = await AddLab(values);
    
    // verify if the result succeeds
    if (submitResult.error) {
      return;
    }

    setSubmitting(false);

    // navigate to the home page when ready
    navigate(`/wine/${id}`)
  };

  const schema = yup.object().shape({

    alcohol: yup
      .number(t('val-number'))
      .typeError(t('val-number'))
      .min(0, `${t('val-min')} 0`)
      .max(17, `${t('val-max')} 17`),

    sugars: yup
      .number(t('val-number'))
      .typeError(t('val-number'))
      .min(0, `${t('val-min')} 0`)
      .max(400, `${t('val-max')} 400`),

      SO2: yup
      .number(t('val-number'))
      .typeError(t('val-number'))
      .min(0, `${t('val-min')} 0`)
      .max(100, `${t('val-max')} 100`),

      tSO2: yup
      .number(t('val-number'))
      .typeError(t('val-number'))
      .min(0, `${t('val-min')} 0`)
      .max(400, `${t('val-max')} 10`),

      corrSO2: yup
      .number(t('val-number'))
      .typeError(t('val-number'))
      .min(0, `${t('val-min')} 0`)
      .max(400, `${t('val-max')} 400`),

      vAcids: yup
      .number(t('val-number'))
      .typeError(t('val-number'))
      .min(0, `${t('val-min')} 0`)
      .max(2, `${t('val-max')} 2`),

      pH: yup
      .number(t('val-number'))
      .typeError(t('val-number'))
      .min(2, `${t('val-min')} 1`)
      .max(4, `${t('val-max')} 4`),

      tAcids: yup
      .number(t('val-number'))
      .typeError(t('val-number'))
      .min(4, `${t('val-min')} 4`)
      .max(12, `${t('val-max')} 12`),

      density: yup
      .number(t('val-number'))
      .typeError(t('val-number'))
      .min(0.980, `${t('val-min')} 0.980`)
      .max(1.200, `${t('val-max')} 1.200`),

      mAcid: yup
      .number(t('val-number'))
      .typeError(t('val-number'))
      .min(0, `${t('val-min')} 0`)
      .max(10, `${t('val-max')} 10`),

      // cold: yup
      // .number(t('val-string'))
      // .oneOf(["", "yes", "no"]),

      // hot: yup
      // .number(t('val-string'))
      // .oneOf(["", "yes", "no"]),

      date: yup
      .date()
      .required(t("val-required")) 
      .typeError(t("val-invalid-date")),

  });

  const initialFormValues = {
    date: getCurrentDate(),    
    wine: id,
    alcohol: '',
    sugars: '',
    SO2: '',
    tSO2: '',
    corrSO2: '',
    vAcids: '',
    pH: '',
    tAcids: '',
    density: '',
    mAcid: '',
    hot: '',
    cold: '',

  };
 

  return (<>
    <PageTitle>{t('add-lab-title')}</PageTitle>

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

            <Form.Group as={Col} md="3" controlId="alcohol">
              <Form.Label>{t("lab-alcohol")}</Form.Label>
              <Form.Control
                style={{ backgroundColor: '#AAF2FF' }}
                type="number"
                // placeholder={t("lab-alcohol")}
                name="alcohol"
                value={values.alcohol}
                onChange={handleChange}
                // isValid={touched.alcohol && !errors.alcohol}
                isInvalid={touched.alcohol && !!errors.alcohol}

              />
              <Form.Control.Feedback type="invalid">{errors.alcohol}</Form.Control.Feedback>            
            </Form.Group>

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

            <Form.Group as={Col} md="3" controlId="SO2">
              <Form.Label>{t("lab-SO2")}</Form.Label>
              <Form.Control
                type="number"
                style={{ backgroundColor: '#FFFFC8' }}
                // placeholder={t("lab-SO2")}
                name="SO2"
                value={values.SO2}
                onChange={handleChange}
                // isValid={touched.SO2 && !errors.SO2}
                isInvalid={touched.SO2 && !!errors.SO2}

              />
              <Form.Control.Feedback type="invalid">{errors.SO2}</Form.Control.Feedback>            
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="tSO2">
              <Form.Label>{t("lab-tSO2")}</Form.Label>
              <Form.Control
                type="number"
                // placeholder={t("lab-tSO2")}
                name="tSO2"
                value={values.tSO2}
                onChange={handleChange}
                // isValid={touched.tSO2 && !errors.tSO2}
                isInvalid={touched.tSO2 && !!errors.tSO2}
              />
              <Form.Control.Feedback type="invalid">{errors.tSO2}</Form.Control.Feedback>
            </Form.Group>

          </Row>

          <Row className="mb-3">

          <Form.Group as={Col} md="3" controlId="corrSO2">
              <Form.Label>{t("lab-corr-SO2")}</Form.Label>
              <Form.Control
                type="number"
                name="corrSO2"
                value={values.corrSO2}
                onChange={handleChange}
                // isValid={touched.SO2 && !errors.corrSO2}
                isInvalid={touched.corrSO2 && !!errors.corrSO2}

              />
              <Form.Control.Feedback type="invalid">{errors.SO2}</Form.Control.Feedback>            
            </Form.Group>


            <Form.Group as={Col} md="3" controlId="vAcids">
              <Form.Label>{t("lab-vAcids")}</Form.Label>
              <Form.Control
                type="number"
                style={{ backgroundColor: '#FFDCFF' }}
                // placeholder={t("lab-vAcids")}
                name="vAcids"
                value={values.vAcids}
                onChange={handleChange}
                // isValid={touched.vAcids && !errors.vAcids}
                isInvalid={touched.vAcids && !!errors.vAcids}

              />
              <Form.Control.Feedback type="invalid">{errors.vAcids}</Form.Control.Feedback>            
            </Form.Group>
          </Row>

          <Row className="mb-3">

            <Form.Group as={Col} md="3" controlId="pH">
              <Form.Label>{t("lab-pH")}</Form.Label>
              <Form.Control
                type="number"
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


          <Row className="mb-3">

            <Form.Group as={Col} md="3" controlId="density">
              <Form.Label>{t("lab-density")}</Form.Label>
              <Form.Control
                type="number"
                // placeholder={t("lab-density")}
                name="density"
                value={values.density}
                onChange={handleChange}
                // isValid={touched.density && !errors.density}
                isInvalid={touched.density && !!errors.density}

              />
              <Form.Control.Feedback type="invalid">{errors.density}</Form.Control.Feedback>            
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="mAcid">
              <Form.Label>{t("lab-mAcid")}</Form.Label>
              <Form.Control
                type="number"
                // placeholder={t("lab-mAcid")}
                name="mAcid"
                value={values.mAcid}
                onChange={handleChange}
                // isValid={touched.mAcid && !errors.mAcid}
                isInvalid={touched.mAcid && !!errors.mAcid}
              />
              <Form.Control.Feedback type="invalid">{errors.mAcid}</Form.Control.Feedback>
            </Form.Group>

          </Row>

          <Row className="mb-3">

            <Form.Group as={Col} md="3" controlId="cold">
              <Form.Label>{t("lab-cold")}</Form.Label>
              <Form.Control
                as="select"
                name="cold"
                value={values.cold}
                onChange={handleChange}
              >
                <option value=""></option>
                <option value="yes">{t("lab-test-yes")}</option>
                <option value="no">{t("lab-test-no")}</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="hot">
              <Form.Label>{t("lab-hot")}</Form.Label>
              <Form.Control
                as="select"
                name="hot"
                value={values.hot}
                onChange={handleChange}
              >
                <option value=""></option>
                <option value="yes">{t("lab-test-yes")}</option>
                <option value="no">{t("lab-test-no")}</option>
              </Form.Control>
            </Form.Group>

          </Row>

          <Row className="mb-4">

            <Form.Group as={Col} md="3" controlId="density">
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

export default LabForm;