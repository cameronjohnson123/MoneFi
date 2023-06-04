import * as Yup from "yup";

const businessProfileSchema = {};

businessProfileSchema.businessDetails = () => {
  return Yup.object().shape({
    name: Yup.string().required("Business name required"),
    ein: Yup.number()
      .nullable()
      .typeError("EIN must consist of numbers and be exactly 9 digits")
      .test("nineDigits", "EIN must have exactly 9 digits", (number) => !number || String(number).length === 9),
    businessTypeId: Yup.number().typeError("Please select a business type").required("Please select a business type").min(1, "Please select a business type"),
    industryTypeId: Yup.number().typeError("Please select an industry type").required("Please select an industry type").min(1, "Please select an industry type"),
  });
};

businessProfileSchema.businessFinances = () => {
  return Yup.object().shape({
    projectedAnnualBusinessIncome: Yup.number().nullable().min(-1000000, "Minimum value is -1,000,000").max(10000000, "Maximum value is 10,000,000").typeError("Please enter a valid number"),
    annualBusinessIncome: Yup.number()
      .min(-1000000, "Minimum value is -1,000,000")
      .max(10000000, "Maximum value is 10,000,000")
      .typeError("Please enter a valid number")
      .required("This field is required"),
  });
};

businessProfileSchema.businessAdditionalDetails = () => {
  return Yup.object({
    locationId: Yup.number().nullable(),
    businessStageId: Yup.number().typeError("Please select a business stage").required("Please select a business stage"),
    logo: Yup.string().required("Please enter a valid logo URL"),
    statusId: Yup.number().required("Please choose a status").min(1, "Please choose a status"),
  });
};

export default businessProfileSchema;
