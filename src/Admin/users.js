import React,{useEffect,useState} from 'react';
import firebase from "../database/firebase";
import { IonPage, IonContent,IonHeader,IonButtons,IonBackButton,IonLabel,IonList,IonItem,IonToolbar, IonTitle, IonIcon } from "@ionic/react";
import { personCircleOutline } from 'ionicons/icons';
const Users = () => {
    const [users,setUsers]=useState([]);

 
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
           <IonIcon icon={personCircleOutline} slot="start">
          

           </IonIcon>
           <IonLabel>  <p>UserName</p>
                      <strong> {users.name}</strong>
                    
                    </IonLabel>
           </IonItem>
           </IonList> 
           
          ))}  
           </IonContent>
           </IonPage>
           </>
        
    )
}

export default Users;

