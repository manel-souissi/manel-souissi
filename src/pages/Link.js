import React from "react";
import firebase from "../database/firebase";
import UserContext from "../contexts/UserContext";
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,IonIcon,IonToolbar,IonFab,IonFabButton,

  IonButtons,
  IonBackButton,
  IonHeader,
  IonTitle,
} from "@ionic/react";
import * as firebas from 'firebase/app'

import {
  chatbubbleEllipsesSharp,sendSharp, ellipsisVerticalSharp
} from "ionicons/icons";

import LinkItem from "../components/Link/LinkItem";

const Link = (props) => {
  const { user } = React.useContext(UserContext);
  const [post, setLink] = React.useState(null);
  const id = props.match.params.id;
  const linkRef = firebase.db.collection("posts").doc(id);
 

  const [comment, setInput] = React.useState("");
  const [comments, setComments] = React.useState([]);

  

  
    

  React.useEffect(() => {
      getLink();
 
     
  
  },);

  function getLink() {
    linkRef.get().then((doc) => {
      setLink({ ...doc.data(), id: doc.id });
    });
  }




  
   
    React.useEffect(() => {
      if (id){
      const unsubscribe =
      firebase.db.collection("posts").doc(id).collection('comments').orderBy('createdAt', 'desc')
      .onSnapshot(eSnapShot);
      
    
     
      return () => unsubscribe();
    
    }
    }, [id])
    
    function eSnapShot(snapshot) {
      const comments = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setComments(comments);
    }
    
  async function Send() {

  
      if (!user) {
        props.history.push("/login");
      } else {
        if(id){
      linkRef.collection('comments').add({
        text:comment,
        createdAt: firebas.firestore.FieldValue.serverTimestamp(),
        user: {
          id:user.uid,
        name:user.displayName,
          
        }
      });

   
      
  }
  setInput("")}}

 
 
    async function handleButtonPress() {
     
      // create new thread using firebase & firestore
let document =  await firebase.db.collection('MESSAGE_THREADS').doc(user.uid+post?.posteBy?.id).get();
if (!user) {
  props.history.push("/login");
} else {
if(user.uid===post?.posteBy?.id){
props.history.push("/Messages")
     }

else{
 




  if (document && document.exists) {
    props.history.push(`/screen/${user.uid+post?.posteBy?.id}`)
    }
  
  else {
    await firebase.db.collection('MESSAGE_THREADS').doc(user.uid+post?.posteBy?.id).set(
   
    {
      
  
      user2id:post?.posteBy?.id,
      user2name:post?.posteBy?.name
    ,
    user1id:user.uid,
    user1name:user.displayName,
      latestMessage: {
        text: `${user.displayName} created. Welcome!`,
        createdAt: new Date().getTime()
      }
    })
  
//navigation.navigate('ChatRoom')
props.history.push(`/screen/${user.uid+post?.posteBy?.id}`)
}
}}
}
   async function order(){
      await firebase.db.collection('notification').add({
        text:`${user.displayName} is waiting for your reply`,
        createdAt: new Date().getTime(),
        avatar:post && post?.avatar?.avatar,
        key:post &&post?.id,
        name:user.displayName,
        from:"Orders",
        keySnder:user.uid,
        reciver:post?.posteBy?.id
     })
    }
  




 
  return (
    <IonPage >
      <IonHeader>
      {post && (   <IonToolbar color="secondary">
    <IonTitle>  {post?.title}</IonTitle>
        <IonButtons slot="start">
          <IonBackButton   color="tertiary" defaultHref="/" />
          
        </IonButtons>
        <IonButtons  slot="end" >
        <IonButton routerLink={`/reclamer/${post.id}`} >
              <IonIcon color="tertiary" icon={ellipsisVerticalSharp} />
            </IonButton>  </IonButtons>
          
        
      </IonToolbar>)}
      
    </IonHeader>
        
      <IonContent >
        
        {post && (
          <>
            <IonGrid key={post.id}>
              
              <IonRow>
                <IonCol class="ion-text-center">
           
                
          <LinkItem post={post} />
          <IonButton expand="block"
                  onClick={order}
                  color="primary"
                  fill="outline"> send Order</IonButton>
                     
       

                  <form className='chatscreen-inpute' >
        
                  <input type="text"  value={comment} 
                  onChange={(e)=>setInput(e.target.value)} 
      className="input" placeholder="type new message..."  /> 
                 <IonIcon onClick={Send}   className='inputButton' slot="icon-only" icon={sendSharp}  />
   
                </form> 
   
          </IonCol>
              </IonRow>
              
            
            </IonGrid>

            <IonFab vertical="center" horizontal="end" slot="fixed">
          <IonFabButton onClick={handleButtonPress}>
            <IonIcon icon={chatbubbleEllipsesSharp} />
          </IonFabButton>
        </IonFab>  
          </>
        )}
          <div>
           <IonGrid>  
        
            
 {comments.map((comment) => ( 
   
   <p   key={comment.id} className="chatscreen-text">  
<span className="usernam"> {comment?.user.name}</span>
<br/> {comment?.text}<br/>
<span className="time">
  
  
  {new Date(comment&&comment?.createdAt?.toDate()).toUTCString()}</span>
           </p>
              ))}
              </IonGrid> </div>
      </IonContent>
    </IonPage>
  );
};

export default Link;
