
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
} from "@ionic/react";
import SmallHeader from "../components/Header/SmallHeader";
import LargeHeader from "../components/Header/LargeHeader";
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
  const [fileUrl, setFileUrl] = React.useState(null);

  const onFileChange = async (e) => {
  const file =  e.target.files[0];
  const storageRef = firebase.app.storage().ref();
  const fileRef = storageRef.child(file.name);
  await fileRef.put(file);
  setFileUrl(await fileRef.getDownloadURL());
}


  function handleCreateLink() {
    
    if (!user) {
      props.history.push("/login");
    } else {
      const { 
        
        title,
     
      
      
     } = values;


      const newPost = {
        title,
      
        avatar:{avatar:fileUrl},
        
       
       
        created: Date.now(),
      };
     const fieldName=title;
      firebase.db.collection("categories").doc(fieldName).set(newPost);
      props.history.push("/");
    } 
  }
  return (
    <IonPage>
      <SmallHeader title="create new annonce" />
      <IonContent fullscreen>
        <LargeHeader title="annonce" />
        <IonItem lines="full">
          
          <input type="file" onChange={onFileChange} />  </IonItem>
      <IonItem lines="full">
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
