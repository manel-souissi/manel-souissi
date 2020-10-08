
import React from "react";
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonRow,
  IonCol,
  IonButton,IonSelect,IonSelectOption ,IonHeader,IonTitle, IonToolbar
} from "@ionic/react";
import SmallHeader from "../../components/Header/SmallHeader";
import LargeHeader from "../../components/Header/LargeHeader";
import UserContext from "../../contexts/UserContext";
import firebase from "../../database";

import * as firebas from 'firebase/app'
import validateCreateLink from "../../validators/validateCreateLink";
import useForm from "../../hooks/useForm";
const INITIAL_STATE = {
  title: "",
  description: "",
  Type: "",

  Position: "",
  category:"",
  avatar:"",
  url: "",
};

const Submitt = (props) => {
  const [cat, setCat] =  React.useState('');
const [categories, setCategorie] = React.useState([]);
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

React.useEffect(() => {
  let isMounted = true;
 
   effectAsyncFun( () => isMounted );
  return () => { isMounted = false; };
}, [])

  async function handleCreateLink() {
    if (!user) {
      props.history.push("/login");
    } else {
      const { 
        
        title,
      description,
      
      
      Position,
     
     } = values;


  
      navigator.geolocation.getCurrentPosition((pos)=>{
      firebase.db.collection("posts").add({
        cordination:{lat:pos?.coords?.latitude,
          lng:pos?.coords?.longitude},
        title,
        description,
        Type:"give away",
        avatar:{avatar:fileUrl},
        Position,
        category:cat,
      etat:"NEW",
      userid: user.uid,
        posteBy: {
          id: user.uid,
          name: user.displayName,
        },
      
        created: firebas.firestore.FieldValue.serverTimestamp(),
      });},
      ()=> null
      );
      props.history.push("/");
      
    } 
    
  }
 
function effectAsyncFun(){ firebase.db.collection("categories").onSnapshot(snapshot => (
  setCategorie(
    snapshot.docs.map(doc => 
        ({
          id: doc.id,
          title: doc.data().title,
          
        })
    )
)
))

}
  
   
    
       
     
      
   
  return (
    <IonPage>
      <SmallHeader title="create new annonce" />
      <IonToolbar>
      <IonHeader><IonTitle  vertical="center" >Give away</IonTitle>
        </IonHeader></IonToolbar>
      <IonContent fullscreen>


       
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
       






















        


        <IonItem lines="full">
          <IonLabel position="floating"> Position </IonLabel>
          <IonInput
            name="Position"
            value={values.Position}
            type="text"
            onIonChange={handleChange}
            required
          ></IonInput>
        </IonItem>


        <IonItem>
            <IonLabel>categorie</IonLabel>
            <IonSelect value={cat} okText="Okay" cancelText="Dismiss" onIonChange={e => setCat(e.detail.value)}>
            {categories.map((categorie) => (  
              <IonSelectOption  key={categorie.id} value={categorie.title}>{categorie.title}</IonSelectOption>
              ))} 
                   </IonSelect>
          </IonItem>












        <IonItem lines="full">
          <IonLabel position="floating"> Description </IonLabel>
          <IonInput
            name="description"
            value={values.description}
            type="text"
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
              onClick={handleCreateLink}
            >
              Publish
            </IonButton>
          </IonCol><IonCol>
            <IonButton
              type="submit"
              color="primary"
              expand="block"
              routerLink="/"
            >
              Cancel
            </IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};
export default Submitt;
