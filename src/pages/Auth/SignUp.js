import React from "react";
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonRow,
  IonCol,
  IonButton,
  IonLoading,
} from "@ionic/react";
import NavHeader from "../../components/Header/NavHeader";
import { toast } from "../../helpers/toast";
import useForm from "../../hooks/useForm";
import validateSignup from "../../validators/validateSignup";
import firebase from "../../database/firebase";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
};

const Signup = (props) => {
  const { handleSubmit, handleChange, values, isSubmitting } = useForm(
    INITIAL_STATE,
    validateSignup,
    authenticateUser
  );
  
  const [busy, setBusy] = React.useState(false);
  async function authenticateUser() {
    setBusy(true);
    const { name,cin, email, password} = values;
  
    try {
      
    await firebase.register(name,cin,email,password)
        .then(() => {
      return firebase.db.collection('users').doc(firebase.auth.currentUser.uid)
        .set({
            name:values.name,
            cin:values.cin,
            email:values.email,
            role:"member",
          blocked:false,
          key:firebase.auth.currentUser.uid

        })
          })
      toast("You have signed up successfully!");
      props.history.push("/");
    }
     
    catch (err) {
      console.error("Authentication Error", err);
      toast(err.message);
    }
    
    setBusy(false);
    
   }





   
  return (
    <IonPage>
      <NavHeader title="Sign Up" />
      <IonLoading message={"Please wait..."} isOpen={busy} />
      <IonContent>
        <IonItem lines="full">
          <IonLabel position="floating">Username</IonLabel>
          <IonInput
            name="name"
            type="text"
            value={values.name}
            onIonChange={handleChange}
            required
          ></IonInput> </IonItem>
          
          <IonItem lines="full">
          <IonLabel position="floating">Cin number</IonLabel>
          <IonInput
            name="cin"
            type="number"
            value={values.cin}
            onIonChange={handleChange}
            required
          ></IonInput>
          
        </IonItem>





      
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
        <IonItem lines="full">
          <IonLabel position="floating">Password</IonLabel>
          <IonInput
            name="password"
            type="password"
            value={values.password}
            onIonChange={handleChange}
            required
          ></IonInput>
        </IonItem>
        <IonRow>
          <IonCol>
            <IonButton
              type="submit"
              color="primary"
              expand="block"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              Sign Up
            </IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Signup;
