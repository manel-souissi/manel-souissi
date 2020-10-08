import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel, IonPage,IonRouterOutlet } from '@ionic/react';

import {
  homeOutline,
  gridOutline,
  chatbubbleOutline,
  mapOutline,
  personCircleOutline,
  
} from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";





const Admin = () => {
  

  return (
   
   
     <IonTabs>  <IonRouterOutlet>
             
            </IonRouterOutlet>
         <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/home">
                <IonIcon icon={homeOutline} />
                <IonLabel>home</IonLabel>
              </IonTabButton>
              
             
              

              <IonTabButton tab="messages" href="/Messages">
                <IonIcon icon={chatbubbleOutline} />
                <IonLabel>Messages</IonLabel>
              </IonTabButton>
              
              <IonTabButton tab="categories" href="/categorie">
                <IonIcon icon={gridOutline} />
                <IonLabel>categories</IonLabel>
              </IonTabButton>

              
              <IonTabButton tab="map" href="/HomeView">
                <IonIcon icon={mapOutline} />
                <IonLabel>Serach</IonLabel>
              </IonTabButton>
              <IonTabButton tab="profile" href="/profile">
                <IonIcon icon={personCircleOutline} />
                <IonLabel>Profile</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
   
  );
};

export default Admin;
