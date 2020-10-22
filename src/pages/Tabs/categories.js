import React from "react";
import {
  add,locateOutline
} from "ionicons/icons";
import { IonPage, IonContent,IonFabButton,IonFab ,IonIcon,IonCard ,IonLabel,
IonHeader, IonTitle, IonToolbar, IonSegment, IonSegmentButton,IonFabList,IonButton
} from "@ionic/react";
  import './tabs.css';
  import firebase from "../../database/firebase";
import SmallHeader from "../../components/Header/SmallHeader";

const Categories = () => {
  const [cat, setCat] =  React.useState('all');

  const [post, setPosts] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  React.useEffect(() => {
   
   const unsubscribe = firebase.db.collection("categories").onSnapshot(handleSnapShot);

function handleSnapShot(snapshot) {
  const categories = snapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  setCategories(categories);
}
    return () => unsubscribe();
    },[])

    React.useEffect(() => {
  if(cat==="all"){
    firebase.db.collection("posts").onSnapshot(handleSnapShot);
  
  }else{
    firebase.db.collection("posts").where("category", "==",cat ).onSnapshot(handleSnapShot);
  }
     

},)
  
function handleSnapShot(snapshot) {
  const post = snapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  setPosts(post);
  }
 
 
  return (
    <IonPage>
           <SmallHeader title="Categories" />
           <IonToolbar>
       
           <IonHeader><IonTitle  vertical="center" >categorys</IonTitle>
        </IonHeader></IonToolbar>
       
            
        <IonToolbar>
  
    
     <IonSegment  scrollable  value={cat} onIonChange={e => setCat(e.detail.value)} 
     color="warning">
       <IonSegmentButton value="all">
          <IonLabel>All</IonLabel>
          </IonSegmentButton>
     {categories.map((categorie) => (   
         <IonSegmentButton key={categorie?.id} value={categorie?.title}>
           
          <IonLabel>{categorie.title}</IonLabel>
          </IonSegmentButton>  ))} 

          
               </IonSegment>
    
    
               </IonToolbar>
   
   <IonContent>
        
           
                     
   <IonFab vertical="bottom" horizontal="bottom" slot="fixed">
          <IonFabButton>
            <IonIcon icon={add} />
          </IonFabButton>
       
        
          <IonFabList side="top">
            <IonButton  shape="round"   routerLink="/submit">
          exchange/sell</IonButton>
          </IonFabList>
          
          <IonFabList side="end">
            <IonButton  shape="round"  routerLink="/giveAway"> giveaway</IonButton>
          </IonFabList>  
         </IonFab>















           
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
  
      </IonContent>
     
    </IonPage>
  );
};
export default Categories;
