import * as yup from "yup";

export const registrationSchema = yup.object().shape({
  name: yup.string().required("Full Name is required"),
  phone: yup
    .string()
    .test(
      "is-phone-required",
      "Phone Number is required and must be 10 digits",
      function (value) {
        const { verificationMethod } = this.parent;
        if (verificationMethod === "phone") {
          return !!value && /^[0-9]{10}$/.test(value);
        }
        return true;
      }
    ),
  email: yup
    .string()
    .test(
      "is-email-required",
      "Email is required and must be valid",
      function (value) {
        const { verificationMethod } = this.parent;
        if (verificationMethod === "email") {
          return !!value && /^[^@]+@[^@]+\.[^@]+$/.test(value);
        }
        return true;
      }
    ),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  verificationMethod: yup
    .string()
    .required("Please select a registration method")
    .oneOf(["email", "phone"], "Invalid registration method"),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});
