
import React from 'react';
import firebase from '../../database/firebase';
import UserContext from "../../contexts/UserContext";

import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonRow,
  IonCol,
  IonButton,IonSelect,IonSelectOption ,
} from "@ionic/react";
import SmallHeader from "../../components/Header/SmallHeader";
import LargeHeader from "../../components/Header/LargeHeader";




const  Edite = (props) => {
 
React.useEffect ( () => {
  firebase.db
  .collection('posts').onSnapshot(snapshot=> {
    setLink(snapshot.docs.map(doc=>doc.data().link)) 
  })
 
}
,[]);

  
  const { user } = React.useContext(UserContext);
  
  

  const [link, setLink] = React.useState(null);
const [input, setInput] = React.useState(link && link.title);
const [desc, setDesc] = React.useState("" )
const [ty, setTY] = React.useState(" ");
const [Pri, setPri] = React.useState("" );
const [Pos, setPos] = React.useState("");
const [cat, setCat] = React.useState("" );

const [fileUrl, setFileUrl] = React.useState('');

  const onFileChange = async (e) => {
  const file =  e.target.files[0];
  const storageRef = firebase.app.storage().ref();
  const fileRef = storageRef.child(file.name);
  await fileRef.put(file);
  setFileUrl(await fileRef.getDownloadURL());
}




 
  
 
function Edit(){
  if (!user) {
    props.history.push("/login");
  } else {
    firebase.db.collection("posts").doc(props.match.params.id).set({
      title:input,
      description:desc, 
      avatar:{avatar:fileUrl},
      Type:ty,
  Price:  Pri,
  Position:Pos,
  category:cat,
 
    },{merge:true},);
    props.history.push("/");
  };}
     


 









 
    return (

<IonPage>
      <SmallHeader title="edit annonce" />
      <IonContent fullscreen>
        <LargeHeader title="update" />
        <IonItem lines="full">
          
          <input type="file" 
         onChange={onFileChange} />  </IonItem>
      <IonItem lines="full">
      <IonLabel position="floating"> title </IonLabel>
      <IonInput
        type="text"
        name="title"
        value={input}
           onIonChange={event=>setInput(event.target.value)} 
        placeholder="title"
       
        
        required
      ></IonInput>
    </IonItem>
   
    <IonItem lines="full">
      <IonLabel position="floating"> description </IonLabel>
      <IonInput
        type="text"
        name="description "
      value={desc}
         onIonChange={event=>setDesc(event.target.value)} 
        placeholder={desc}
        required
      ></IonInput>
    </IonItem>
    <IonItem lines="full">
      <IonLabel position="floating"> PriCE </IonLabel>
      <IonInput
        type="text"
        name="description "
      value={Pri}
         onIonChange={event=>setPri(event.target.value)} 
        placeholder={Pri}
        required
      ></IonInput>
    </IonItem>
    <IonItem lines="full">
      <IonLabel position="floating">Position </IonLabel>
      <IonInput
        type="text"
        name="description "
      value={Pos}
         onIonChange={event=>setPos(event.target.value)} 
        placeholder={Pos}
        required
      ></IonInput>
    </IonItem>
    <IonItem lines="full">
      <IonLabel position="floating"> Type </IonLabel>
      <IonInput
        type="text"
        name="description "
      value={ty}
         onIonChange={event=>setTY(event.target.value)} 
        placeholder={ty}
        required
      ></IonInput>
    </IonItem>
    <IonItem lines="full">
      <IonLabel position="floating">category </IonLabel>
      <IonInput
        type="text"
        name="description "
      value={cat}
         onIonChange={event=>setCat(event.target.value)} 
        placeholder=""
        required
      ></IonInput>
    </IonItem>

   <IonRow>
   <IonCol>
     <IonButton
       type="submit" onClick={Edit} 
     >
       Submit
     </IonButton>
   </IonCol>
 </IonRow>
</IonContent>
</IonPage>
             
        
             
    );
  }


export default Edite;
