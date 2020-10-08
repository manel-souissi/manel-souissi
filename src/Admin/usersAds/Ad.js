import React from "react";
import firebase from "../../database/firebase";
import UserContext from "../../contexts/UserContext";
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,IonIcon,IonItem,IonToolbar,IonFab,IonFabButton,

  IonButtons,
  IonBackButton,
  IonHeader,IonInput,IonTitle
} from "@ionic/react";

import {
  chatbubbleEllipsesSharp,sendSharp,trashOutline
} from "ionicons/icons";

import LinkItem from "../../components/Link/LinkItem";

const Ad = (props) => {
  const { user } = React.useContext(UserContext);
  const [post, setLink] = React.useState(null);
  const id = props.match.params.id;
  const linkRef = firebase.db.collection("posts").doc(id);
 

  const [input, setInput] = React.useState();
  const [comments, setComments] = React.useState([]);

  

  
    

  React.useEffect(() => {
    return () =>{  getLink();}
 
    
  
  },);

  function getLink() {
    linkRef.get().then((doc) => {
      setLink({ ...doc.data(), id: doc.id });
    });
  }




  React.useEffect(() => {
    return () =>{ 
   
    Comment ();
   
    }
  
   
    
  }, )

  function Comment(){   if (id){
    firebase.db.collection("posts").doc(id).collection("comments").onSnapshot(snapshot => (
    setComments(
      snapshot.docs.map(doc => 
          ({
            id: doc.id,
            text: doc.data().text,
            name: doc.data().user.name
          })
      )
  )
  ))
        }
  }


  async function Send() {

  
      if (!user) {
        props.history.push("/login");
      } else {
        if(id){
      linkRef.collection('comments').add({
        text:input,
        createdAt: new Date().getTime(),
        user: {
          id:user.uid,
        name:user.displayName,
          
        }
      });

   
      
  }
  setInput("")}}

 

  function handleAddVote() {
    if (!user) {
      props.history.push("/login");
    } else {
      linkRef.get().then((doc) => {
        if (doc.exists) {
          const previousVote = doc.data().votes;
          const vote = { votedBy: { id: user.uid, name: user.displayName } };
          const updatedVotes = { ...previousVote, vote };
          const voteCount = updatedVotes.lenght+1;
          linkRef.update({ votes: updatedVotes,voteCount, });
          setLink((prevState) => ({
            ...prevState,
            votes: updatedVotes,
            voteCount: voteCount+1,
          }));
        }
      });
    }
  }
   
 
   


 
    
 
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
    props.history.push("/Messages")
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
props.history.push("/Messages")
}
}}
}
    
  


 
function handleDeleteLink() {
    linkRef
      .delete()
      .then(() => {
        console.log(`Document with ID ${post.id} deleted`);
      })
      .catch((err) => {
        console.error("Error deleting document", err);
      });
    props.history.push("/");
  }


 
  return (
    <IonPage >
      <IonHeader>
   {post && ( <IonToolbar color="secondary">
        <IonButtons slot="start">
          <IonBackButton  color="tertiary" defaultHref="/" />
        </IonButtons>
       
          <IonButtons slot="end">
            <IonButton onClick={handleDeleteLink}>
              <IonIcon color="danger" icon={trashOutline} />
            </IonButton>
        
          </IonButtons>
         
          
        <IonTitle>{post.title}</IonTitle>
      </IonToolbar>)}
    </IonHeader>
     
         
      
        
      
      <IonContent>
        
        {post && (
          <>
            <IonGrid>
              
              <IonRow>
                <IonCol class="ion-text-center">
                 
                 
       
                 
          
       
                
    
                
          <LinkItem post={post} />
          <IonButton 
                    onClick={() => handleAddVote()}
                    size="small"
                  >Vote</IonButton>
                  
               
                  <IonButton  routerLink={`/reclamer/${post.id}`} color="secondary"> edit
          </IonButton>    
       
















                  <div className='chatscreen-inpute' >
        
                  <IonInput  value={input} onIonChange={event=>setInput(event.target.value)} 
      className='chatscreen-inputfiled' placeholder="type new message..."  /> 
                 <IonIcon onClick={Send}   className='inputButton' slot="icon-only" icon={sendSharp}  />
   
                </div> 
   
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
   
   <IonItem lines="none"  key={comment.id} className='chatscreen-message'>


<p className="chatscreen-text"        >  
           <span className="username"> {comment?.name}</span>
            {comment?.text}</p>
         
       




              </IonItem>
              ))}
              </IonGrid> </div>
      </IonContent>
    </IonPage>
  );
};

export default Ad;
