import React from "react";
import { IonPage, IonContent ,IonSegment, IonSegmentButton,IonLabel,IonToolbar, IonIcon,IonItem,IonItemSliding,IonItemOptions,IonItemOption,IonThumbnail, IonList,   } from "@ionic/react";
import SmallHeader from "../../components/Header/SmallHeader";
import LargeHeader from "../../components/Header/LargeHeader";
import firebase from "../../database/firebase";
import UserContext from "../../contexts/UserContext";

const Trending = (props) => {

  const { user } = React.useContext(UserContext);

  const [note, setNote] =  React.useState('Orders');
  const [notifications, setNotifications] = React.useState([]);
 


  React.useEffect(() => {
   
    const unsubscribe = firebase.db.collection("notification").where("from","==",note ).where("reciver",'==',user&&user?.uid).onSnapshot(handleSnapShot);
 

     return () => unsubscribe();
     },[note])
 
     function handleSnapShot(snapshot) {
      const notifications = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setNotifications(notifications);
    }


  

  return (
    <IonPage >
      <SmallHeader title="Notifications" />
      <IonContent fullscreen>
        <LargeHeader title="Notifications" />
        <IonToolbar translucent>
        <IonSegment  scrollable  color="warning" value={note} onIonChange={e => setNote(e.detail.value)} >
       
          <IonSegmentButton value="Orders">
          <IonLabel>Orders</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="app">
          <IonLabel>App Notifications</IonLabel>
         
          </IonSegmentButton>
     

          
               </IonSegment> </IonToolbar>

               
               <> 
               {notifications.map((notifaction) => (   
              <>
                {notifaction?.from ==="app" && (
                  <>   
                  <IonItem key={notifaction?.id} id={notifaction?.id}> 
               
              <IonThumbnail slot="start">
               <img src={notifaction?.avatar} alt=''></img></IonThumbnail>
               <IonLabel>
               <p> {notifaction?.text}</p></IonLabel>
               </IonItem>
               </> )} </>
             
))}  </>
   <> 
               {notifications.map((notifaction) => (   
                <>
                {notifaction?.from ==="Orders" && (
                 <IonList  key={notifaction?.id}>
            <IonItem    routerLink={`/order/${notifaction?.id}`} >
              <IonThumbnail slot="end">
               <img src={notifaction?.avatar} alt=''></img></IonThumbnail>
               <IonLabel>
               <p> {notifaction?.text}</p></IonLabel>

              </IonItem> 
             </IonList> 
              )}</>
))}  </>
 
   

 
      </IonContent>
    </IonPage>
  );
};
export default Trending;