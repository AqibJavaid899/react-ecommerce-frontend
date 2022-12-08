import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { loadStripe } from "@stripe/stripe-js";

import ShippingForm from "./ShippingForm";
import ContactInfoForm from "./ContactInfoForm";
import { shades } from "../../theme";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;

  const cart = useSelector((state) => state.cart.cart);

  const proceedToStripeCheckout = async (values) => {
    const stripe = await stripePromise;

    // Request Body for POST Order API Call
    const requestBody = {
      userName: [
        values.billingAddress.firstName,
        values.billingAddress.lastName,
      ].join(" "),
      email: values.email,
      products: cart.map(({ id, count }) => ({ id, count })),
    };

    // Calling the POST Order API Call
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/orders`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      },
    );

    // Fetching the session object from the API response and calling the RedirectToCheckout method
    const session = await response.json();
    await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  };

  const handleFormSubmit = (values, actions) => {
    setActiveStep((prevState) => prevState + 1);

    // Copy the Billing Address Form data into the Shipping Address Form data
    if (isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue("shippingAddress", {
        ...values.billingAddress,
        isSameAddress: true,
      });
    }
    // Proceed to make payment when the (Place Order) button is clicked
    if (isSecondStep) {
      proceedToStripeCheckout(values);
    }

    actions.setTouched({});
  };

  return (
    <Box width="80%" m="100px auto">
      {/* Setting up Stepper */}
      <Stepper activeStep={activeStep} sx={{ m: "20px 0px" }}>
        <Step>
          <StepLabel>Billing</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>

      {/* Formik Setup */}
      <Box>
        <Formik
          initialValues={initialValues}
          validationSchema={checkoutSchema[activeStep]}
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit} autoComplete="off">
              {/* If ActiveStep value is (1) then display the Billing/Shipping Address Form */}
              {isFirstStep && (
                <ShippingForm
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              {/* If ActiveStep value is (2) then display the Contact Info Form */}
              {isSecondStep && (
                <ContactInfoForm
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                />
              )}
              <Box display="flex" justifyContent="space-between" gap="40px">
                {isSecondStep && (
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    sx={{
                      backgroundColor: shades.primary[200],
                      color: "white",
                      boxShadow: "none",
                      p: "15px 40px",
                      borderRadius: "0px",
                      "&:hover": {
                        opacity: 0.9,
                        backgroundColor: shades.primary[200],
                        boxShadow: "none",
                      },
                    }}
                    onClick={() => setActiveStep((prevState) => prevState - 1)}
                  >
                    BACK
                  </Button>
                )}
                <Button
                  fullWidth
                  type="submit"
                  color="primary"
                  variant="contained"
                  sx={{
                    backgroundColor: shades.primary[400],
                    color: "white",
                    boxShadow: "none",
                    p: "15px 40px",
                    borderRadius: "0px",
                    "&:hover": {
                      opacity: 0.9,
                      backgroundColor: shades.primary[400],
                      boxShadow: "none",
                    },
                  }}
                >
                  {isFirstStep ? "NEXT" : "PLACE ORDER"}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

const initialValues = {
  billingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  shippingAddress: {
    isSameAddress: true,
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  email: "",
  phoneNumber: "",
};

const checkoutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required("required"),
      lastName: yup.string().required("required"),
      country: yup.string().required("required"),
      street1: yup.string().required("required"),
      street2: yup.string(),
      city: yup.string().required("required"),
      state: yup.string().required("required"),
      zipCode: yup.string().required("required"),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      firstName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      lastName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      country: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      street1: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      street2: yup.string(),
      city: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      state: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      zipCode: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
    }),
  }),
  yup.object().shape({
    email: yup.string().required("required"),
    phoneNumber: yup.string().required("required"),
  }),
];

export default Checkout;
