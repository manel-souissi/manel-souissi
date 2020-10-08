export default function validateCreateLink(values) {
  let errors = {};
  //description errors
  if (!values.description) {
    errors.description = "A description is required.";
  } else if (values.description.lenght < 10) {
    errors.description = "A description is invalid.";
  }
 


 
  return errors;
}
