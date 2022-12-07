import { TextField, Typography, Box } from "@mui/material";

const ContactInfoForm = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
}) => {
  return (
    <Box
      display="grid"
      gap="15px"
      gridTemplateColumns="repeat(4, 1fr)"
      m="30px 0px"
    >
      <Typography sx={{ gridColumn: "span 4", mb: "6px" }} variant="h3">
        Contact Information
      </Typography>

      <TextField
        fullWidth
        type="email"
        label="Email"
        value={values.email}
        name="email"
        error={!!touched.email && !!errors.email}
        helperText={touched.email && errors.email}
        onChange={handleChange}
        onBlur={handleBlur}
        sx={{ gridColumn: "span 4" }}
      />

      <TextField
        fullWidth
        type="text"
        label="Phone Number"
        value={values.phoneNumber}
        name="phoneNumber"
        error={!!touched.phoneNumber && !!errors.phoneNumber}
        helperText={touched.phoneNumber && errors.phoneNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        sx={{ gridColumn: "span 4" }}
      />
    </Box>
  );
};

export default ContactInfoForm;
