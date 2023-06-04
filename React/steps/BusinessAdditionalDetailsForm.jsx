import React from "react";
import { withFormik, Field, Form, ErrorMessage } from "formik";
import { PropTypes } from "prop-types";
import businessProfileSchema from "schemas/businessProfileSchema";

const BusinessDetailsForm = (props) => {
  const { values, handleSubmit, isSubmitting, cantBack, handleChange, onBack, lookUps } = props;

  const mapOptions = (type) => (
    <option key={type.id} value={type.id}>
      {type.name}
    </option>
  );

  return (
    <Form className="p-1 formik-form" onSubmit={handleSubmit}>
      <div className="row justify-content-center">
        <div className="col-12 col-md-12">
          <div className="form-group my-5 pb-3 position-relative">
            <label>Location: </label>
            <Field className="form-control" type="number" name="locationId" id="locationId" value={values.locationId} onChange={handleChange} />
            <ErrorMessage name="locationId" component="div" className="formik-has-error position-absolute" />
          </div>

          <div className="form-group my-5 pb-3 position-relative">
            <label>Business Stage: </label>
            <Field as="select" className="form-control" name="businessStageId" id="businessStageId" value={values.businessStageId} onChange={handleChange}>
              <option value="">Select...</option>
              {lookUps.businessStages.map(mapOptions)}
            </Field>
            <ErrorMessage name="businessStageId" component="div" className="formik-has-error position-absolute" />
          </div>

          <div className="form-group my-5 pb-3 position-relative">
            <label>Logo URL: </label>
            <Field className="form-control" type="text" name="logo" id="logo" value={values.logo} onChange={handleChange} />
            <ErrorMessage name="logo" component="div" className="formik-has-error position-absolute" />
          </div>

          <div className="form-group my-5 pb-3 position-relative">
            <label>Status: </label>
            <Field as="select" className="form-control" name="statusId" id="statusId" value={values.statusId} onChange={handleChange}>
              <option value="">Select...</option>
              {lookUps.statusTypes.map(mapOptions)}
            </Field>
            <ErrorMessage name="statusId" component="div" className="formik-has-error position-absolute" />
          </div>

          <div className="form-group d-flex mt-3 my-5">
            <div className="form-check">
              <Field type="checkbox" name="orgAdmin" id="orgAdmin" className="form-check-input" />
            </div>
            <label className="form-check-label" htmlFor="orgAdmin">
              Add yourself as an OrgAdmin for this Business.
            </label>
          </div>

          <div className="button-group text-center mt-3">
            <button type="button" className="btn btn-secondary mx-2" onClick={onBack} disabled={isSubmitting || cantBack}>
              BACK
            </button>
            <button type="submit" className="btn btn-primary mx-2" disabled={isSubmitting}>
              FINISH
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
};

BusinessDetailsForm.propTypes = {
  values: PropTypes.shape({
    locationId: PropTypes.number,
    businessStageId: PropTypes.number.isRequired,
    logo: PropTypes.string.isRequired,
    statusId: PropTypes.number.isRequired,
  }).isRequired,
  onNext: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.func.isRequired,
  cantBack: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  state: PropTypes.shape({
    locationId: PropTypes.number,
    businessStageId: PropTypes.number.isRequired,
    logo: PropTypes.string.isRequired,
  }).isRequired,
  lookUps: PropTypes.arrayOf({
    businessStages: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    statusTypes: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }),
};

export default withFormik({
  mapPropsToValues: (props) => ({
    locationId: props.state.locationId,
    businessStageId: props.state.businessStageId,
    logo: props.state.logo,
    statusId: props.state.statusId,
  }),
  validationSchema: businessProfileSchema.businessAdditionalDetails,
  handleSubmit: (values, { props }) => {
    props.onNext(values);
  },
})(BusinessDetailsForm);
