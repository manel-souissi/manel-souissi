export default function validateLogin(values) {
  let errors = {};
  //email errors
  if (!values.email) {
    errors.email = "Your email is required.";
  }
  
  //password errors
  if (!values.password) {
    errors.password = "A password is required.";
  } else if (values.password.lenght < 6) {
    errors.password = "Your password must be at least 6 caracteres";
  }
  return errors;
}
