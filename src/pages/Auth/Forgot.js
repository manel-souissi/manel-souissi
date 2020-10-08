import React from "react";
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonCol,
  IonButton,
  IonLoading,
} from "@ionic/react";
import NavHeader from "../../components/Header/NavHeader";
import useForm from "../../hooks/useForm";
import validatePasswordReset from "../../validators/validatePasswordReset";
import firebase from "../../database";
import { toast } from "../../helpers/toast";

const INITIAL_STATE = {
  email: "",
};

const Forgot = () => {
  const { handleChange, handleSubmit, values, isSubmitting } = useForm(
    INITIAL_STATE,
    validatePasswordReset,
    handleResetPassword
  );

  const [busy, setBusy] = React.useState(false);

  async function handleResetPassword() {
    setBusy(true);
    const { email } = values;
    try {
      await firebase.resetPassword(email);
      toast("Check Your email to reset your password");
    } catch (err) {
      console.error("Password reset Error", err);
      toast(err.message);
    }
  }

  return (
    <IonPage>
      <NavHeader title="Password Reset" />
      <IonLoading message={"Please wait..."} isOpen={busy} />
      <IonContent>
        <IonItem lines="full">
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            name="email"
            type="text"
            value={values.email}
            onIonChange={handleChange}
            required
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonCol>
            <IonButton
              type="submit"
              color="primary"
              expand="block"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              Get Reset Link
            </IonButton>
          </IonCol>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Forgot;
