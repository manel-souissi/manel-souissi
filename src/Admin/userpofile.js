import React,{useState} from 'react';
import firebase from "../database/firebase";

import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,IonHeader,IonToolbar,IonTitle, IonButtons,IonBackButton,
  IonButton,IonIcon} from "@ionic/react";
import UserContext from "../contexts/UserContext";
import {
  trashSharp,
} from "ionicons/icons";


import Content from "../Admin/content";

const Uerprofile = (props) => {
 
  const { user } = React.useContext(UserContext);
  const id = props.match.params.id;
  const Ref = firebase.db.collection("users").doc(id);

  const [users,setUsers]=useState([]);

  React.useEffect(() => {
    getLink();
  },);

  function getLink() {
    if(id){
      Ref.get().then((doc) => {

        setUsers({ ...doc.data(),
           id: doc.id});
    }
   
    );
  }}

 
   

    function handleButtonPress() {
     
        // create new thread using firebase & firestore
        
        firebase.db.collection('MESSAGE_THREADS').add(
          {
          
            name:user.displayName,
            latestMessage: {
              text: `${user.displayName} created. Welcome!`,
              createdAt: new Date().getTime()
            }
          })
         .then(docRef => {
    docRef.collection('MESSAGES').add({
      text: `${user.displayName} created. Welcome!`,
      createdAt: new Date().getTime(),
     
      
    })
    //navigation.navigate('ChatRoom')
    props.history.push("/Messages")
  })
      
    }
  
    function Admin(){
     
       
      
      
      var fieldName = "role";
      var obj = {};
      obj[fieldName] = "Admin";
      
      var docRef=   firebase.db.collection("users").doc(id);
      
      return docRef.update(obj)
      .then(function() {
          console.log("Document successfully updated!");
      })
      .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });

    }
    function Member(){
     
       
      
      
      var fieldName = "role";
      var obj = {};
      obj[fieldName] = "member";
      
      var docRef=   firebase.db.collection("users").doc(id);
      
      return docRef.update(obj)
      .then(function() {
          console.log("Document successfully updated!");
      })
      .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });

    }


   function bloc(){
     
       
      
      
      var fieldName = "blocked";
      var obj = {};
      obj[fieldName] = "true";
      
      var docRef=   firebase.db.collection("users").doc(id);
      
      return docRef.update(obj)
      .then(function() {
          console.log("Document successfully updated!");
      })
      .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });

    }



function Unblocked(){
     
       
      
      
      var fieldName = "blocked";
      var obj = {};
      obj[fieldName] = "false";
      
      var docRef=   firebase.db.collection("users").doc(id);
      
      return docRef.update(obj)
      .then(function() {
          console.log("Document successfully updated!");
      })
      .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });

    }
























 


 
 
 
  return (
    <IonPage>
    <IonHeader>
     <IonToolbar color="secondary">
     <IonTitle> Users </IonTitle>
                <IonButtons slot="start">
                  <IonBackButton  color="tertiary" defaultHref="/users" />
                </IonButtons> </IonToolbar></IonHeader>
          
        
         
      
        
      
      <IonContent>
        {users && (
          <>
            <IonGrid>
              <IonRow>
                <IonCol class="ion-text-center">
                  <Content users={users} />
                  </IonCol></IonRow>
                  <IonRow> <IonCol>
                  <IonButton onClick={handleButtonPress}>
      <IonIcon slot="icon-only" icon={trashSharp}  />
    </IonButton>
    
    <IonCol>        
    {users.role ==="member" && (
          <IonButton  
       type="submit" onClick={Admin} 
     >
     set to Admin 
     </IonButton>)}

     {users.role ==="Admin" && (
          <IonButton  
       type="submit" onClick={Member} 
     >
     set to Member
     </IonButton>)}
     {users.blocked ==="false" && (
       <IonButton  
       type="submit" onClick={bloc} 
     >
     bloc user
     </IonButton>
          )}
           {users.blocked ==="true" && (
<IonButton  
       type="submit" onClick={Unblocked} 
     >
     Unblocked user
     </IonButton>
          )}     </IonCol>
                </IonCol>
              </IonRow>
            </IonGrid>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Uerprofile;
