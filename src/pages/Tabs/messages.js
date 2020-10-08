import React ,{useState,useEffect} from "react";
import {

} from "ionicons/icons";
import { IonPage, IonContent,IonList,IonListHeader, IonItem, 
  IonRow,
  IonCol,
  IonButton,
  IonGrid,
  } from "@ionic/react";
//import LargeHeader from "../../components/Header/LargeHeader";
import firebase from "../../database/firebase";
import LargeHeader from "../../components/Header/SmallHeader";
import UserContext from "../../contexts/UserContext";



 



function Messages(props) {
  const[messages,setMassages]=useState([]);
  const[message,setMassage]=useState([]);
  const { user } = React.useContext(UserContext);
  
  

useEffect(() => {

if(user){
     firebase.db.collection('MESSAGE_THREADS').where("user1id",'==', user && user.uid).onSnapshot(querySnapshot => {
      const message = querySnapshot.docs.map(doc => {
        const firebaseData = doc.data()
        const data = {
          id: doc.id,
          text: doc.data().latestMessage.text,
          ...firebaseData
        }

        if (!firebaseData.system) {
          data.user = {
            ...firebaseData.user,
            
          }
        }

        return data
      })

      setMassage(message)
    })}
  },[user])

  useEffect(() => {

    if(user){
  firebase.db.collection('MESSAGE_THREADS').where("user2id",'==', user&&user.uid).onSnapshot(querySnapshot => {
  const messages = querySnapshot.docs.map(doc => {
    const firebaseData = doc.data()

    const data = {
      id: doc.id,
      text: doc.data().latestMessage.text,
      ...firebaseData
    }

    if (!firebaseData.system) {
      data.user = {
        ...firebaseData.user,    
      }
    }

    return data
  })

  setMassages(messages)
})}
},[user])











  
  return  (
    <>
    
    <IonPage>
      <LargeHeader title="Messages list" />
      <IonContent fullscreen>
      {user ? (
           <>
      <IonListHeader>
          Recent Conversations
        </IonListHeader>
        {messages.map((messages) => (
        <IonList key={messages.id} >
        <IonItem    routerLink={`/screen/${messages?.id}`} button>
            <p >{messages.text} </p>
      
         </IonItem>
    
         </IonList>

))}
 {message.map((messages) => (
        <IonList key={messages.id} >
        <IonItem    routerLink={`/screen/${messages?.id}`} button>
            <p >{messages.text} </p>
      
         </IonItem>
    
         </IonList>

))}
      </>
) : (

   
 
  <IonGrid>
            <IonRow>
              <IonCol>
                <IonButton
                  expand="block"
                  routerLink={"/register"}
                  color="primary"
                >
                  Sign UP 
                </IonButton>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonButton expand="block" routerLink={"/login"} color="primary">
                  Log In
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid> 
        )}
      </IonContent>
    </IonPage>

    </>
  )
}
export default Messages;
