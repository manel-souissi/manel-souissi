import React,{useEffect,useState} from "react";
import firebase from "../../database/firebase";
import UserContext from "../../contexts/UserContext";
import {
  IonPage,
  IonContent,
 IonIcon,IonInput,IonToolbar,IonButtons,IonBackButton
} from "@ionic/react";
import './screen.css';
import {
  sendSharp,
} from "ionicons/icons";



const MsgScreen = (props) => {
  const { user } = React.useContext(UserContext);
  const [messages, setMassages] = useState([]);
  const [input,setInput]= useState('');
  const id = props.match.params.id;
  const Ref = firebase.db.collection("MESSAGE_THREADS").doc(id);

 useEffect(() => {
  if (id){
  const unsubscribe =
  firebase.db.collection("MESSAGE_THREADS").doc(id).collection('MESSAGES').orderBy('createdAt', 'asc')
  .onSnapshot(handleSnapShot);
  

 
  return () => unsubscribe();

}
}, [id])
function handleSnapShot(snapshot) {
  const messages = snapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  setMassages(messages);
}

 
  async function Send() {
    if (id){
  Ref.collection('MESSAGES').add({
        text:input,
        createdAt: new Date().getTime(),
        user: {
          id: user.uid,
        name: user.displayName,
          
        }
      });

    await Ref
      .set(
        {
          latestMessage: {
            text:input,
            createdAt: new Date().getTime()
          }
        },
        { merge: true }
      );
      }
      setInput("")
  }

 
   

  
  
  








 




  return (
    <>
    
    <IonPage  >
    <IonToolbar color="secondary">
        <IonButtons slot="start">
          <IonBackButton  color="tertiary" defaultHref="/home" />
        </IonButtons> </IonToolbar>
          
     
      <IonContent >
     
      {messages.map((message) => (
        
        
          <div className='chatscreen-message'  key={message.id}>
<p className={`chatscreen-text ${message?.user?.name===user?.displayName &&"chatscreen-textUser"}`}         >  
           <span className="username"> {message?.user?.name}</span>
            {message.text}</p>
        
           </div>
       
  
    // <div className='chatscreen-message' >
     //<p className='chatscreen-text' key={message.id}>  {message.text}</p>
  
    //</div>  
    
  
            
              
      
      ))} 
            
    <div className='chatscreen-input' >
          < form  > 
          
          <IonInput name="message" value={input} onIonChange={event=>setInput(event.target.value)} 
      className='chatscreen-inputfiled' placeholder="type new message..."  /> 
      <IonIcon onClick={Send}   className='inputButton' slot="icon-only" icon={sendSharp}  />
        
                 </form> 
                </div> 
                
                

               
      </IonContent>
    
  
    </IonPage>
          
      
          </>
  );
};

export default MsgScreen;;
