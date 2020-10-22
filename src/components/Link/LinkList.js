import React from "react";
import firebase from "../../database/firebase";

import {
  IonCard  ,
 
 IonIcon, 
} from "@ionic/react";
import './card.css';
import { locateOutline} from "ionicons/icons";


const Posts = (props) => {
 const [post, setPosts] = React.useState([]);
 


 
   React.useEffect(() => {
 
    const unsubscribe= firebase.db.collection("posts").where("etat",'==',"NEW").onSnapshot(handleSnapShot);
    
  
    
    
    return () => unsubscribe();
}, [])
  
function handleSnapShot(snapshot) {
  const post = snapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  setPosts(post);
  }


 

  return (
    <> 
      
         
      {post.map((post) => (
      
      <IonCard  className="ioncard" routerLink={`/link/${post?.id}`}
        key={post?.id} >
   {post && post?.avatar?.avatar !=="" && (  

   <img className="imag"  src= {post && post?.avatar?.avatar}
         alt=" "/>)}
  
      <div className="tex" > <p className="borde" > <IonIcon
               icon={locateOutline}
                 
                />       <strong >
                {post?.Type}</strong></p></div> 
      

   
    </IonCard> 
       
      
      ))}
      
    </>
   
  );
};
export default Posts;
