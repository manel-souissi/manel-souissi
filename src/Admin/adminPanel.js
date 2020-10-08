import React from 'react'
import {
    IonPage,
    IonContent,IonCardContent,IonCard,
    IonItem,
    IonLabel,
    IonInput,
    IonRow,
    IonCol,
    IonButton ,IonGrid,IonIcon,IonCardHeader,IonCardSubtitle,IonCardTitle
  } from "@ionic/react";
  import {peopleSharp} from 'ionicons/icons';
  import './file.css';
import SmalHeader from  "../components/Header/SmallHeader";

const AdminDasboard = () => {
    return (
        



        <IonPage>
        <SmalHeader title=" Admin dashborad"  />
        <IonContent fullscreen className='content'>
         
          <IonGrid className='img'>
          <img src='https://blogsimages.adobe.com/connectsupport/files/2018/04/Administration-Banner-Design.jpg' alt='admin'></img>
          </IonGrid>
          <br/> 
          
          <br/>
          <IonGrid>
         
          <br/>
          <IonRow color="secondary">

          <IonCol >     <IonCard className="card"
        routerLink={`/users`}button  >

      
              
            <IonCardHeader>
           
            <IonCardTitle className='text'> users </IonCardTitle>
          </IonCardHeader>

          <IonCardContent  class="ion-no-padding" className="logo">
          
       < IonIcon  icon={peopleSharp}   ></IonIcon>
   

      </IonCardContent>
            
            
           </IonCard></IonCol>    
           
           <IonCol >     <IonCard className="card"
        routerLink={`/categories`}button  >

<IonCardHeader>
           
           <IonCardTitle className='text'>   categories </IonCardTitle>
         </IonCardHeader>

         <IonCardContent  class="ion-no-padding" className="logo">
         
      < IonIcon  icon={peopleSharp}   ></IonIcon>
  

     </IonCardContent>
              
          
           </IonCard></IonCol> </IonRow>
          <IonRow>

          <IonCol >     <IonCard className="card"
        routerLink={`/NewReclamtion`}button  >


<IonCardHeader>
           
           <IonCardTitle className='text'>   
              Reclamtions </IonCardTitle>
         </IonCardHeader>

         <IonCardContent  class="ion-no-padding" className="logo">
         
      < IonIcon  icon={peopleSharp}   ></IonIcon>
  

     </IonCardContent>
              
           
           </IonCard></IonCol>     <IonCol >     <IonCard className="card"
        routerLink={`/AdsList`}button  >

      
<IonCardHeader>
           
           <IonCardTitle className='text'>     posts  </IonCardTitle>
         </IonCardHeader>

         <IonCardContent  class="ion-no-padding" className="logo">
         
      < IonIcon  icon={peopleSharp}  ></IonIcon>
  

     </IonCardContent>  
          
           </IonCard></IonCol>     </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    )
}

export default  AdminDasboard ;

