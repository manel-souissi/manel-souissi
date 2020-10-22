import React from 'react'
import { IonPage, IonContent, IonCard, IonButton,  IonLabel, IonIcon } from '@ionic/react'
import UserContext from "../../contexts/UserContext";
import { checkmarkDone, skull, chatbubbleEllipses } from "ionicons/icons";
import firebase from "../../database/firebase";

const Order = (props) => {

    const { user } = React.useContext(UserContext);
    
   const [notificat, setNotificat] = React.useState(null);


   
 
   const id = props.match.params.id;
   const linkRef = firebase.db.collection("notification").doc(id);
   React.useEffect(() => {
    if(id){
        firebase.db.collection("notification").doc(id).get().then((doc) => {
            setNotificat({ ...doc.data(), id: doc.id });
      });}
 
    
  
  },[id],);
    
  
    
 


    async function handleButtonPress() {
     
      // create new thread using firebase & firestore
let document =  await firebase.db.collection('MESSAGE_THREADS').doc(user.uid+notificat?.keySnder).get();
if (!user) {
  props.history.push("/login");
} else {
if(user.uid===notificat?.keySnder){
props.history.push("/Messages")
     }

else{
 




  if (document && document.exists) {
    props.history.push(`/screen/${user.uid+notificat?.keySnder}`)
    }
  
  else {
    await firebase.db.collection('MESSAGE_THREADS').doc(user.uid+notificat?.keySnder).set(
   
    {
      
  
      user2id:notificat?.keySnder,
      user2name:notificat?.name
    ,
    user1id:user.uid,
    user1name:user.displayName,
      latestMessage: {
        text: `${user.displayName} created. Welcome!`,
        createdAt: new Date().getTime()
      }
    })
  
//navigation.navigate('ChatRoom')
props.history.push(`/screen/${user.uid+notificat?.keySnder}`)
}
}}
}
  
 async function classer(){
    var field = "etat";
        var objc = {};
        objc[field] ="classer";


        let document =  await firebase.db.collection('posts').doc(notificat && notificat?.key);
        let doc= await linkRef;


        document.update(objc)
        .then(function() {
          return doc.delete();
         
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error clasification document: ", error);
        });

        props.history.push("/home");   
        
      }

   




      function refuser() {
        firebase.db.collection("notification").doc(id)
          .delete()
          .then(() => {
            console.log(`Document with ID ${notificat.id} deleted`);
          })
          .catch((err) => {
            console.error("Error deleting document", err);
          });
        props.history.push("/");
      }
      
    return (
        <IonPage>
         <IonContent>
         {notificat && ( 
      
            <IonCard   id={notificat?.id}>
               <img src={notificat?.avatar} alt=''></img>
               <IonLabel>
               <p>   requested by:</p></IonLabel>
               <IonLabel>
                 
               <p> {notificat?.name}</p></IonLabel>
            
            

              <IonButton color="primary"  onClick={handleButtonPress}>
              <IonIcon slot="start" icon={chatbubbleEllipses} />
              
         

       
      </IonButton>
              <IonButton color="success"  onClick={classer}>
              <IonIcon slot="start" icon={checkmarkDone} />
              
         

        Accepet
      </IonButton>
      <IonButton color="danger"  onClick={refuser}>
      <IonIcon slot="end" icon={skull}></IonIcon>
        
       Refuse
      </IonButton>
               </IonCard>)}
             
             </IonContent>   
        </IonPage>
            
        
    )
}

export default Order;
