import React from "react";
import { withFormik, Field, Form, ErrorMessage } from "formik";
import { PropTypes } from "prop-types";
import businessProfileSchema from "schemas/businessProfileSchema";

const BusinessDetailsForm = (props) => {
  const { values, handleSubmit, isSubmitting, cantBack, handleChange, onBack } = props;

  return (
    <Form className="p-1 formik-form" onSubmit={handleSubmit}>
      <div className="row justify-content-center">
        <div className="col-12 col-md-12">
          <div className="form-group my-5 pb-3 position-relative">
            <label>Projected Annual Business Income</label>
            <Field
              className="form-control"
              type="number"
              name="projectedAnnualBusinessIncome"
              id="projectedAnnualBusinessIncome"
              value={values.projectedAnnualBusinessIncome}
              onChange={handleChange}
            ></Field>
            <ErrorMessage name="projectedAnnualBusinessIncome" component="div" className="formik-has-error position-absolute"></ErrorMessage>
          </div>

          <div className="form-group my-5 pb-3 position-relative">
            <label>Annual Business Income</label>
            <Field className="form-control" type="number" name="annualBusinessIncome" id="annualBusinessIncome" value={values.annualBusinessIncome} onChange={handleChange}></Field>
            <ErrorMessage name="annualBusinessIncome" component="div" className="formik-has-error position-absolute"></ErrorMessage>
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
    projectedAnnualBusinessIncome: PropTypes.number,
    annualBusinessIncome: PropTypes.number.isRequired,
  }).isRequired,
  onNext: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.func.isRequired,
  cantBack: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  state: PropTypes.shape({
    projectedAnnualBusinessIncome: PropTypes.number,
    annualBusinessIncome: PropTypes.number,
  }).isRequired,
};

export default withFormik({
  mapPropsToValues: (props) => ({
    projectedAnnualBusinessIncome: props.state.projectedAnnualBusinessIncome,
    annualBusinessIncome: props.state.annualBusinessIncome,
  }),
  validationSchema: businessProfileSchema.businessFinances,
  handleSubmit: (values, { props }) => {
    props.onNext(values);
  },
})(BusinessDetailsForm);
