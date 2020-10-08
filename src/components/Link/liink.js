// eslint-disable-next-line no-unused-vars
import React,{useState} from "react";
import firebase from "../../database/firebase";
import UserContext from "../../contexts/UserContext";
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,IonIcon,IonFab,IonFabButton,

 IonHeader,IonToolbar,IonButtons,IonBackButton,IonTitle, IonInput
} from "@ionic/react";
import * as firebas from 'firebase/app'


import {
  chatbubbleEllipsesSharp,sendSharp,trashOutline,createOutline,repeatOutline
} from "ionicons/icons";

import LinkItem from "../Link/LinkItem";
import useForm from "../../hooks/useForm";
const INITIAL_STATE = {
 text:""
  
};
const UserLink = (props) => {
  const { user } = React.useContext(UserContext);
  const [post, setLink] = React.useState(null);
  const id = props.match.params.id;
  const linkRef = firebase.db.collection("posts").doc(id);
 
const {date,setDate} =React.useState([]);
  const [comment, setInput] = React.useState("");
  
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


 async function setExpierd(){
  var fieldName = "etat";
  var obj = {};
  obj[fieldName] = "New";


  var field = "created";
  var object = {};
  object[field] =firebas.firestore.FieldValue.serverTimestamp();
  

  var docRef=   firebase.db.collection("posts").doc(id);
 docRef.update(obj)
  return docRef.update(object)
  .then(function() {
      console.log("Document successfully updated!");
  })
  .catch(function(error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
  });
};






React.useEffect(() => {
    var x = setInterval(function() {
   
    // Get today's date and time
    var now = new Date().getTime();
    var test= new Date(post?.created.toDate()).setDate(new Date(post?.created.toDate()).getDate() + 30);

    // Find the distance between now and the count down date
    var distance = test - now;
  
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
   // Display the result in the element with id="demo"
   if( document.getElementById("demo")!==null){
  
   document.getElementById("demo").innerHTML =
   days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";
  
    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("demo").innerHTML = "EXPIRED";

    
    }
  
   
      
      var fieldName = "etat";
      var obj = {};
      obj[fieldName] = "EXPIRED";
      var docRef=   firebase.db.collection("posts").doc(id)
      
   
       if(!obj){
        docRef.update(obj)
        .then(function() {
            console.log("Document successfully updated!");
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
   
       }
  
      
      }
      
     
      
    
  }, 1000);



  


},)

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
            <IonButton  routerLink={`/edit/${post?.id}`}>
              <IonIcon color="success" icon={createOutline} />
            </IonButton>

            {post?.etat ==="EXPIRED" && (
            <IonButton  onClick={setExpierd} >
              <IonIcon color="success" icon={repeatOutline} />
            </IonButton>)}
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
   <div > Deadline:</div>     

<div >

<div >
            <p id="demo" />
      </div></div>


          <div>
           <IonGrid> 

           <form className='chatscreen-inpute' >
        
        <input type="text"  value={comment} 
        onChange={(e)=>setInput(e.target.value)} 
className="input" placeholder="type new message..."  /> 
       <IonIcon onClick={Send}   className='inputButton' slot="icon-only" icon={sendSharp}  />

      </form> 


             
              
       
     
          



 {comments.map((comment) => ( 
   


<p   key={comment.id} className="chatscreen-text"        >  
<span className="usernam"> {comment?.user.name}</span>
 
            {comment?.text}</p>
         
            




            
              ))}
              </IonGrid> </div>

               
      </IonContent>
      
    </IonPage>
  );
};

export default UserLink;

































