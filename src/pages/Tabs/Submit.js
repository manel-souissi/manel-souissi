
import React from "react";
import { Plugins, CameraResultType } from '@capacitor/core';

import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonRow,
  IonCol,
  IonButton,IonSelect,IonSelectOption ,IonHeader,IonTitle, IonToolbar,IonImg, IonText, IonCard, IonCardContent
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
  Price: "0",
  Position: "",
  category:"",
  avatar:"",
  url: "",
  photo: '',
  
};

const Submit = (props) => {
  const [cat, setCat] =  React.useState('athor');
const [categories, setCategorie] = React.useState([]);
  const { user } = React.useContext(UserContext);
  const { Camera } = Plugins;
  const {values, handleChange } = useForm(
    INITIAL_STATE,
    validateCreateLink,
    handleCreateLink
  );
 // const [fileUrl, setFileUrl] = React.useState(null);
  const { Geolocation } = Plugins;

 /* const onFileChange = async (e) => {
  const file =  e.target.files[0];
  const storageRef = firebase.app.storage().ref();
  const fileRef = storageRef.child(file.name);
  await fileRef.put(file);
  setFileUrl(await fileRef.getDownloadURL());
}*/
const [imageUrl,setImage] =  React.useState(null);
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
      
      Price,
 
     
     } = values;

     
  
      //navigator.geolocation
      Geolocation.getCurrentPosition((pos)=>{
        firebase.db.collection("posts").add({
          cordination:{lat:pos?.coords?.latitude,
            lng:pos?.coords?.longitude},
          title,
          description,
          
          Price,

          Type:"Sell",
          avatar:{avatar:imageUrl},
       
          category:cat,
        etat:"NEW",
        key: user.uid,
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
  
   
async function takePicture() {
  const image = await Camera.getPhoto({
  quality: 90,
  allowEditing: false,
  resultType: CameraResultType.Uri
  });
  var imageUrl = image.webPath;
  // Can be set to the src of an image now  
 setImage(imageUrl)

  }
       
     
  const [users,setUsers]=React.useState([]);
  


  React.useEffect(() => {
    User();
  },);

  async function User() {
   
    if(user){
      let document =  await firebase.db.collection('users').doc(user.uid)
      document.get().then((doc) => {

        setUsers({ ...doc.data(),
           id: doc.id});
    }
   
    );
  }}    
   
  return (
    <IonPage>
      <SmallHeader title="create new annonce" />
      <IonToolbar>
      <IonHeader><IonTitle  vertical="center" >exchange/sell</IonTitle>
        </IonHeader></IonToolbar>
      <IonContent fullscreen>









      {users?.blocked === false && (
         <> 
       <>  
      {imageUrl!==null && (
      <IonImg style={{ 'border': '1px solid light', 'minHeight': '100px' }} src={imageUrl} alt="...." ></IonImg>)}
        <IonButton color="Medium" fill="outline" shape="round" onClick={takePicture}>take Picture</IonButton>
       
        </> 


       
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
          <IonLabel position="floating">  Prix (en dt) </IonLabel>
          <IonInput
            name="Price"
            value={values.Price}
            type="number"
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
        </>  )}
        <>{users?.blocked === true && (
          <IonCardContent><IonText color="danger">
          <h5 > <p>Sorry !!</p> </h5>
          <h4 > <p>you are not allowad to create post any more.</p > </h4>
        </IonText></IonCardContent> 
         
       )} </>
      </IonContent>
    </IonPage>
  );
};
export default Submit;
/*
        <IonItem lines="full">
          
          <input type="file" onChange={onFileChange} />  </IonItem> */