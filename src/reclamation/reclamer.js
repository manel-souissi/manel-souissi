/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import firebase from "../database/firebase";
import UserContext from "../contexts/UserContext";
import {
  IonPage,IonHeader,IonToolbar,IonTitle,IonContent,IonList,IonRadioGroup,IonListHeader,IonLabel,IonItem,
  IonRadio,IonItemDivider,IonButton, IonRow,
  IonCol,
} from "@ionic/react";
const Reclamer = (props) => {
    const [Reclame, setReclamation] = React.useState([]);

    const [recl, setReclame] = React.useState([]);
    const id = props.match.params.id;
    const [post, setLink] = React.useState(null);

    const linkRef = firebase.db.collection("posts").doc(id);
    const { user } = React.useContext(UserContext);
 


    

  
   
    React.useEffect(() => {
      if (id){
      const unsubscribe =
      firebase.db.collection("reclamation").onSnapshot(eSnapShot);
      
    
     
      return () => unsubscribe();
    
    }
    }, [id])
    
    function eSnapShot(snapshot) {
      const recl = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setReclamation(recl);
    }
    




    React.useEffect(() => {
      return () =>{  getLink();
      }
   
      
    
    },);
    function getLink() {
      linkRef.get().then((doc) => {
        setLink({ ...doc.data(), id: doc.id });
      });
    }
    
    

 
    function reclamer(){
  


      if (!user) {
          props.history.push("/login");
        } else {
         
          if(id){
           
    
          
          const newReclamtion = {
           
            
           
           
          reclamerBy: {
              id: user.uid,
              name: user.displayName  },
              reclamerAt: {
              annonce_id:post?.id,
              ownerId:post?.posteBy?.id,
              name:post?.posteBy?.name,
              avatar:post?.avatar?.avatar,
              description:post?.description,
            
            },
            reclamtion:recl,
            etat:"",
            createdAt: Date.now(),
          };
    
          firebase.db.collection("User_reclamation").add(newReclamtion);
          props.history.push("/home"); }
  
    
        }
  

          
         
      }
     
   

     
     return (
       <IonPage>
         <IonHeader>
           <IonToolbar>
             <IonTitle>Submit a complaint</IonTitle>
           </IonToolbar>
         </IonHeader>
         <IonContent>
         <div> 
         
           <IonList >
           
             <IonRadioGroup  value={recl} onIonChange={e => setReclame(e.detail.value)}>
               <IonListHeader>
                 <IonLabel> select your complaint: </IonLabel>
               </IonListHeader>
               {Reclame.map((reclamer) => ( 
               <IonItem lines="none"   key={reclamer?.id}>
                 <IonLabel   className="content"> {reclamer.reclamtion}</IonLabel>
                 
                     <IonRadio  slot="start" value={reclamer.reclamtion}/>
                 
               </IonItem>))}
             </IonRadioGroup>
             <IonItemDivider>Your Selection</IonItemDivider>
           
           </IonList>  
           <IonItem>{recl ?? '(none selected'}</IonItem>
           </div>
           <IonRow>
           <IonCol>   <IonButton  shape="round" fill="outline"   routerLink={"/home"} >    Cancel
    </IonButton></IonCol>   <IonCol><IonButton shape="round" fill="outline"    onClick={reclamer}>  Send  your complaint
    </IonButton></IonCol>


           </IonRow>
           
      
           

         </IonContent>
       </IonPage>
    )
}

export default Reclamer;
