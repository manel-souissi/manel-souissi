export default function validateSignUp(values) {
  let errors = {};

  //name errors
  if (!values.name) {
    errors.name = "A username is required.";
  }
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

  
  if (!values.cin) {
    errors.cin = "A password is required.";
  } else if (values.password.lenght < 8) {
    errors.cin = "Your CIN  number must be at least 8 caracteres";
  }

  return errors;
}
