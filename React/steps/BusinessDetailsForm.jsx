import React, { useEffect } from "react";
import { withFormik, Field, Form, ErrorMessage, useFormikContext } from "formik";
import { PropTypes } from "prop-types";
import businessProfileSchema from "schemas/businessProfileSchema";

const BusinessDetailsForm = (props) => {
  const { state, handleSubmit, isSubmitting, cantBack, handleChange, onBack, lookUps } = props;
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    if (state) {
      setFieldValue("name", state.name);
      setFieldValue("ein", state.ein);
      setFieldValue("businessTypeId", state.businessTypeId);
      setFieldValue("industryTypeId", state.industryTypeId);
    }
  }, [state]);

  const mapOptions = (type) => (
    <option key={type.id} value={type.id}>
      {type.name}
    </option>
  );

  return (
    <Form className="p-1 formik-form" onSubmit={handleSubmit}>
      <div className="row justify-content-center">
        <div className="col-12 col-md-12">
          <div className="form-group my-5 pb-3">
            <label htmlFor="name">Business Name: </label>
            <Field className="form-control" type="text" name="name" id="name" onChange={handleChange} />
            <ErrorMessage name="name" component="div" className="formik-has-error position-absolute" />
          </div>

          <div className="form-group my-5 pb-3">
            <label>EIN: </label>
            <Field className="form-control" type="text" name="ein" id="ein" onChange={handleChange} />
            <ErrorMessage name="ein" component="div" className="formik-has-error position-absolute" />
          </div>

          <div className="form-group my-5 pb-3">
            <label>Business Type: </label>
            <Field as="select" className="form-control" name="businessTypeId" id="businessTypeId" onChange={handleChange}>
              <option value="">Select...</option>
              {lookUps.businessTypes.map(mapOptions)}
            </Field>
            <ErrorMessage name="businessTypeId" component="div" className="formik-has-error position-absolute" />
          </div>

          <div className="form-group my-5 pb-3">
            <label>Industry Type: </label>
            <Field as="select" className="form-control" name="industryTypeId" id="industryTypeId" onChange={handleChange}>
              <option value={0}>Select...</option>
              {lookUps.industryTypes.map(mapOptions)}
            </Field>
            <ErrorMessage name="industryTypeId" component="div" className="formik-has-error position-absolute" />
          </div>

          <div className="button-group text-center mt-3">
            <button type="button" className="btn btn-secondary mx-2" onClick={onBack} disabled={isSubmitting || cantBack}>
              BACK
            </button>
            <button type="submit" className="btn btn-primary mx-2" disabled={isSubmitting}>
              NEXT
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
};

BusinessDetailsForm.propTypes = {
  values: PropTypes.shape({
    name: PropTypes.string.isRequired,
    ein: PropTypes.number,
    businessTypeId: PropTypes.number.isRequired,
    industryTypeId: PropTypes.number.isRequired,
  }).isRequired,
  onNext: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.func.isRequired,
  cantBack: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  state: PropTypes.shape({
    name: PropTypes.string.isRequired,
    ein: PropTypes.number,
    businessTypeId: PropTypes.number.isRequired,
    industryTypeId: PropTypes.number.isRequired,
  }).isRequired,
  lookUps: PropTypes.arrayOf({
    businessTypes: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    industryTypes: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }),
};

export default withFormik({
  mapPropsToValues: (props) => ({
    name: props.state.name,
    ein: props.state.ein,
    businessTypeId: props.state.businessTypeId,
    industryTypeId: props.state.industryTypeId,
  }),
  validationSchema: businessProfileSchema.businessDetails,
  handleSubmit: (values, { props }) => {
    props.onNext(values);
  },
})(BusinessDetailsForm);
