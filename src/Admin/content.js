import React from "react";
import {
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonBadge,
  IonLabel,
  IonText,
  IonIcon,
 
} from "@ionic/react";
import {
  linkOutline,
  
} from "ionicons/icons";
;
const Content = ({ users,user}) => {
  return (
    <IonCard >


        
    <IonCardContent class="ion-no-padding">

      <IonList lines="none">
      
      
        <IonItem >

          <IonBadge
            style={{
              verticalAlign: "middle",
            }}
            slot="start"
          >
        
          </IonBadge> 
          <IonLabel>
          
            <p
              style={{
                alignItems: "center",
                fontSize: "0.8rem",
                fontWeight: "normal",
              }}

            >
   
  
            
            
            
            <IonText style={{ verticalAlign: "middle" }} >
              <strong style={{ fontSize: "1rem" }}>
             </strong>
              </IonText >

              <IonText style={{ verticalAlign: "middle" }} >
              <strong style={{ fontSize: "1rem" }}>
                {users?.displayName}</strong>
              </IonText >
              
             
              <IonText style={{ verticalAlign: "middle" }} >
              <strong style={{ fontSize: "1rem" }}>CIN number:
                {users?.cin}</strong>
              </IonText >
              
            </p>

            
    
            <div className="ion-padding-vertical ion-text-wrap">
              <strong style={{ fontSize: "1rem" }}> email:
                {users && users?.email}</strong>
            </div>
            <div className="ion-padding-vertical ion-text-wrap">
              <strong style={{ fontSize: "1rem" }}> name:
                {users?.name}</strong>
            </div>
            <div className="ion-padding-vertical ion-text-wrap">
              <strong style={{ fontSize: "1rem" }}> role:
                {users?.role}</strong>
                
            </div>
            

          </IonLabel>
        </IonItem>
      </IonList>
    </IonCardContent>
  </IonCard>
  );
};

export default Content;
