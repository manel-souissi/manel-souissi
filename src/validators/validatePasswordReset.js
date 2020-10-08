export default function validatePasswordReset(values) {
  let errors = {};

  //email errors
  if (!values.email) {
    errors.email = "Your email is required.";
  } 
  
  return errors;
}
