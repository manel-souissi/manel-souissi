import React from 'react'
import firebase from "../database/firebase";
import NavHeader from "../components/Header/NavHeader";
import { toast } from "../helpers/toast";

import {
    IonPage,
    IonCard,
    IonItem,IonButton,IonList
  } from "@ionic/react";




const Complaintprocessing = (props) => {
  
    const [reclame, setReclamation] = React.useState([]);
    
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
      var field = "etat";
        var objc = {};
        objc[field] = "done";
       await firebase.db.collection('notification').add({
          text:'WARNNIN!!,you have a claim about your ad please change your content or we will deletet it !',
          createdAt: new Date().getTime(),
          avatar:reclame && reclame.reclamerAt?.avatar,
          key:reclame && reclame.reclamerAt?.ownerId,
         
       })
       .then(function() {
        return firebase.db.collection("User_reclamation").doc(id).update(objc);
       
      })
      .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error blocing document: ", error);
      });

      props.history.push("/NewReclamtion");  
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

    
     
    

  
     async function bloc(){
     
        let document =  await firebase.db.collection('users')
.doc(reclame && reclame.reclamerAt?.ownerId);
      
      
        var fieldName = "blocked";
        var obj = {};
        obj[fieldName] = true;
        
        var field = "etat";
        var objc = {};
        objc[field] = "done";
        
         document.update(obj)
        .then(function() {
          return firebase.db.collection("User_reclamation").doc(id).update(objc);
         
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error blocing document: ", error);
        });

        props.history.push("/NewReclamtion");   
        
      }
  
   


  
  



    return (
        <IonPage >
      <NavHeader 
       />

        
{reclame && (
    <>   
  <IonItem> 
    <IonButton onClick={bloc}> bloc user</IonButton>
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

