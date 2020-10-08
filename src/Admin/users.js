import React,{useEffect,useState} from 'react';
import firebase from "../database/firebase";
import { IonPage, IonContent,IonHeader,IonButtons,IonBackButton,IonList,IonItem,IonToolbar, IonTitle } from "@ionic/react";
const Users = () => {
    const [users,setUsers]=useState([]);

   /* React.useEffect(() => {
      const unsubscribe = getLinks();
      return () => unsubscribe();
    },);*/
    useEffect(() => {
      let isMounted = true;
     
      getLinks( () => isMounted );
      return () => { isMounted = false; };
  }, )
  
    function getLinks() {
     
      return firebase.db
        .collection("users").onSnapshot(handleSnapShot);
    }
    function handleSnapShot(snapshot) {
      const users = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setUsers(users);
    }
    return (
      <> 
     <IonPage>
     <IonHeader>
     <IonToolbar color="secondary">
     <IonTitle> Users </IonTitle>
                <IonButtons slot="start">
                  <IonBackButton  color="tertiary" defaultHref="/adminDasboard" />
                </IonButtons> </IonToolbar></IonHeader>
                
      <IonContent fullscreen>
      
         {users.map((users) => (
       <IonList key={users?.id}>
           <IonItem   routerLink={`/userpofile/${users?.id}`}> 
            {users.name}</IonItem>
           </IonList> 
           
          ))}  
           </IonContent>
           </IonPage>
           </>
        
    )
}

export default Users;

