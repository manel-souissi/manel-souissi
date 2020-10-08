import React from 'react'
import firebase from "../../database/firebase";
import {
    IonCard ,
   
   
  } from "@ionic/react";

  import UserContext from "../../contexts/UserContext";

function UserAds() {
    const { user } = React.useContext(UserContext);
    const [post, setPosts] = React.useState([]);

    React.useEffect(() => {

        const unsubscribe= firebase.db.collection("posts").where("key",'==',user&&user.uid).onSnapshot(handleSnapShot);
        return () => unsubscribe();
    }, )

    function handleSnapShot(snapshot) {
        const post = snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setPosts(post);
        }
      
    return (
        <IonCard>
            {post.map((post) => (
      
      <IonCard  className="ioncard" routerLink={`/UserLink/${post?.id}`}
        key={post?.id} >
   

   <img className="imag"  src= {post && post?.avatar?.avatar}
         alt=" {post?.posteBy?.name}"/>
  
      <div className="tex" > <p className="borde" >       <strong >
                {post?.etat}</strong></p></div> 
      

   
    </IonCard> 
       
      
      ))} 
        </IonCard>
    )
}

export default UserAds
