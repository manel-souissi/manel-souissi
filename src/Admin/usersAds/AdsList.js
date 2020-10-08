






import React from "react";
import firebase from "../../database/firebase";

import {
  IonCard  ,
 IonIcon, IonPage, IonContent,IonHeader,IonButtons,IonBackButton,IonToolbar, IonTitle } from "@ionic/react";


import '../../components/Link/card.css';
import { locateOutline} from "ionicons/icons";

const AdsList = (props) => {

 const [post, setPosts] = React.useState([]);
 


 
   React.useEffect(() => {
 
    const unsubscribe= firebase.db.collection("posts").orderBy("created", "desc").onSnapshot(handleSnapShot);
    
  
    
    
    return () => unsubscribe();
}, [])
  
function handleSnapShot(snapshot) {
  const post = snapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  setPosts(post);
  }


 

  return (

    <IonPage>
    <IonHeader>
    <IonToolbar color="secondary">
    <IonTitle> Posts  </IonTitle>
               <IonButtons slot="start">
                 <IonBackButton  color="tertiary" defaultHref="/adminDasboard" />
               </IonButtons> </IonToolbar></IonHeader>
               <IonContent fullscreen>
               
    <> 
      
         
      {post.map((post) => (
      
      <IonCard  className="ioncard" routerLink={`/Ad/${post?.id}`}
        key={post?.id} >
   {post?.avatar?.avatar !=="" && (  

   <img className="imag"  src= {post && post?.avatar?.avatar}
         alt=" "/>)}
  
      <div className="tex" > <p className="borde" > <IonIcon
               icon={locateOutline}
                 
                />       <strong >
                {post?.Position}</strong></p></div> 
      

   
    </IonCard> 
       
      
      ))}
      
    </>
    </IonContent>
           </IonPage>
  );
};
export default AdsList;
