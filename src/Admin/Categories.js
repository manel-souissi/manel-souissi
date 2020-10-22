
import React from "react";
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonRow,
  IonCol,
  IonButton,IonHeader,IonButtons,IonBackButton,IonToolbar, IonTitle
} from "@ionic/react";

import UserContext from "../contexts/UserContext";
import firebase from "../database";
import validateCreateLink from "../validators/validateCreateLink";
import useForm from "../hooks/useForm";
const INITIAL_STATE = {
  title: "",
  
  avatar:""

};

const Categories = (props) => {
  
  const { user } = React.useContext(UserContext);
  const {values, handleChange } = useForm(
    INITIAL_STATE,
    validateCreateLink,
    handleCreateLink
  );
  


  function handleCreateLink() {
    
    if (!user) {
      props.history.push("/login");
    } else {
      const { 
        
        title,
     
      
      
     } = values;


      const newPost = {
        title,
    
        
       
       
        created: Date.now(),
      };
     const fieldName=title;
      firebase.db.collection("categories").doc(fieldName).set(newPost);
      props.history.push("/");
    } 
  }
  return (
    <IonPage>
      <IonHeader>
     <IonToolbar color="secondary">
     <IonTitle>Add new Categorie  </IonTitle>
                <IonButtons slot="start">
                  <IonBackButton  color="tertiary" defaultHref="/adminDasboard" />
                </IonButtons> </IonToolbar></IonHeader>
                <IonContent fullscreen>
        <IonItem>
          <IonLabel position="floating"> title </IonLabel>
          <IonInput
            name="title"
            value={values.title}
            type="text"  onIonChange={handleChange}
            required
          ></IonInput>
        </IonItem>
      
        <IonRow>
          <IonCol>
            <IonButton
              type="submit"
              color="primary"
              expand="block"
              onClick={handleCreateLink}
            >
              Submit
            </IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};
export default Categories;
