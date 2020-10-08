import React from 'react'
import firebase from "../database/firebase";
import NavHeader from "../components/Header/NavHeader";
import { toast } from "../helpers/toast";

import {
    IonPage,
    IonGrid,
    IonCard,
    IonItem,IonButton,IonList
  } from "@ionic/react";
import { Toast } from '@capacitor/core';




const Complaintprocessing = (props) => {
  
    const [reclame, setReclamation] = React.useState([]);
    const [Ad, setAd] = React.useState([]);
    const [users, setUser] = React.useState([]);
    const id = props.match.params.id;

    React.useEffect(() => {
      if(id){
        firebase.db.collection("User_reclamation").doc(id).get().then((doc) => {
          setReclamation({ ...doc.data(), id: doc.id });
        });}
   
      
    
    },[id],);
    var fieldName = "etat";
    var obj = {};
    obj[fieldName] = "done";
    
    async function Send() {
     
       await firebase.db.collection('notification').add({
          text:'WARNNIN!!,you have a claim about your ad please change your content or we will deletet it !',
          createdAt: new Date().getTime(),
          avatar:reclame && reclame.reclamerAt?.avatar
       })
          
      }
      async function handleDeleteLink() {
        let document =  await firebase.db.collection('posts')
.doc(reclame && reclame.reclamerAt?.annonce_id);


try {
      
  await document.delete()
      .then(() => {
    return firebase.db.collection("User_reclamation").doc(id).update(obj)
        })
        toast("doc deleted succesfuly!!");
    props.history.push("/");
  }





     catch(err)  {
            console.error("Error deleting document", err);
          }
        props.history.push("/");
      }

    
      async function userDelete() {

       // db.collection("users").document(firebase.auth.getInstance().currentUser.idd).delete()
//.addOnSuccessListener { firebase.auth.getInstance().currentUser.delete()}
        let document =  await firebase.db.collection('users')
.doc(reclame && reclame.reclamerAt?.ownerId);
firebase.auth.currentUser.uid(reclame && reclame.reclamerAt?.ownerId).delete();


try {
  await document.delete()
      .then(() => {
    return firebase.db.collection("User_reclamation").doc(id).update(obj)
        })
        toast("users deleted succesfuly!!");
    props.history.push("/");
  }





     catch(err)  {
            console.error("Error deleting document", err);
          }
        props.history.push("/");
      }
     
    

  
  

  
  



    return (
        <IonPage >
      <NavHeader 
       />

        
{reclame && (
    <>   
  <IonItem> 
    <IonButton onClick={userDelete}> delete user</IonButton>
    <IonButton onClick={handleDeleteLink}> delete Ad</IonButton>
    <IonButton onClick={Send}> User warning </IonButton>
  </IonItem>
<IonCard   >
<IonList lines="none" >
<IonItem >user ID:  
{reclame && reclame.reclamerAt?.ownerId}  </IonItem>
<IonItem >user Name: 
{reclame && reclame.reclamerAt?.name}  </IonItem>
<IonItem >Ad id: 
{reclame && reclame.reclamerAt?.annonce_id}  </IonItem>
<IonItem >Ad description: 
{reclame && reclame.reclamerAt?.description}  </IonItem></IonList>
<img src={reclame && reclame.reclamerAt?.avatar}  alt="..." />  
 
  </IonCard>    
          
  </> 
)}

    
           
        </IonPage >
    )
}

export default Complaintprocessing

