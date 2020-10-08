import React from "react";
import useForm from "../../hooks/useForm";
import {
  searchOutline,
} from "ionicons/icons";
import { IonPage, IonContent,IonCard ,IonCardContent,
   IonItem ,IonChip,IonAvatar,IonLabel,IonList,IonToolbar,
    IonInput, IonFabButton  ,IonIcon} from "@ionic/react";
import firebase from "../../database/firebase"
import Admin from "../../Admin";
const INITIAL_STATE = {
  Position: "",
  
};
const Serach = () => {
  const {values, handleChange } = useForm(
    INITIAL_STATE,
    search
  );
  const [links, setLinks] = React.useState([]);
  
  function  search() {
   firebase.db.collection("posts").where("Position", "==",values.Position ).onSnapshot(handleSnapShot);}
   function handleSnapShot(snapshot) {
    const links = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setLinks(links);
  }
  return (
    <>
    <IonPage> 
   
    <IonToolbar
        style={{
          background: "#f0652f",
        }}
        color="primary">
            <IonItem >         
         <IonInput placeholder='search in your area position'  name="Position"  type="text" 
         value={values.Position} onIonChange={handleChange}  color="primary"></IonInput>     
        <IonFabButton  onClick={search}> <IonIcon icon={searchOutline} /> 
        
        </IonFabButton> </IonItem >
      </IonToolbar>  
            
       

      <IonContent fullscreen>
     
      {links.map((link,browser)=> {
        return (
        
          <IonCard   key={link?.id} routerLink={`/link/${link?.id}`}onClick={browser} button>
      

          <IonCardContent class="ion-no-padding" >
          <IonList lines="none">  
          <IonItem >  
          
  <IonChip>
    <IonAvatar>
      <img
       src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" alt= "{link?.posteBy?.name}"/>
    </IonAvatar>
    <IonLabel>{link&& link?.posteBy?.name}</IonLabel>
  </IonChip>
 
            </IonItem> 
       
  <IonItem >
             <p>{link && link?.title}
               </p>
               </IonItem>
          <img  src= {link&& link?.avatar?.avatar}
         width="100%" height="50%" alt= "{link?.posteBy?.name}"/>

           
               </IonList>
          </IonCardContent>
  </IonCard>
       
      
       );})}
  
       
        
         
      </IonContent>
      <Admin />
    </IonPage>
     </>
  );
};
export default Serach;
/*   <IonToolbar
        style={{
          background: "#f0652f",
        }}
        color="primary">
            <IonItem >         
         <IonInput placeholder='search in your area position'  name="Position"  type="text" 
         value={values.Position} onIonChange={handleChange}  color="primary"></IonInput>     
        <IonFabButton  onClick={search}> <IonIcon icon={searchOutline} /> 

        </IonFabButton> </IonItem >
      </IonToolbar>   */