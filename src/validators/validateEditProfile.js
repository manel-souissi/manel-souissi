export default function validateEditProfile(values) {
  let errors = {};

  //name errors
  if (!values.name) {
    errors.name = "A username is required.";
  }
  //email errors
  if (!values.email) {
    errors.email = "Your email is required.";
  } ;
  
  // current password errors
  if (!values.currentPassword) {
    errors.currentPassword = "A current password is required.";
  } else if (values.currentPassword.lenght < 6) {
    errors.currentPassword =
      "Your current password must be at least 6 caracteres";
  }

  //new password errors
  if (values.newPassword.lenght < 6) {
    errors.password = "Your new password must be at least 6 caracteres";
  }

  return errors;
}
