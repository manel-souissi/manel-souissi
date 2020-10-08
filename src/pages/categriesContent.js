import React from "react";
import {
  add
} from "ionicons/icons";
import { IonPage, IonContent,IonFabButton,IonFab ,IonIcon, IonRow,
 IonSelect,IonSelectOption,
  IonGrid } from "@ionic/react";
  import './tabs.css'
import SmallHeader from "../../components/Header/SmallHeader";
import LargeHeader from "../../components/Header/LargeHeader";
import LinkList from "../../components/Link/LinkList";

function CategriesContent(props) {
    const [gender, setGender] =React.useState();
    return (
      <IonPage>
        <SmallHeader title="Ads list" />
        <IonContent fullscreen>
          <LargeHeader title="Ads" />
          <IonGrid> <IonRow>
             
                 <IonSelect className='ion-select'
                 value={gender} placeholder="Select One" onIonChange={e => setGender(e.detail.value)}>
                <IonSelectOption value="female">Female</IonSelectOption>
                <IonSelectOption value="male">Male</IonSelectOption>
              </IonSelect>
        
               
                 <IonSelect value={gender} placeholder="Select One" onIonChange={e => setGender(e.detail.value)}>
                <IonSelectOption value="female">Female</IonSelectOption>
                <IonSelectOption value="male">Male</IonSelectOption>
              </IonSelect>
              
                 <IonSelect value={gender} placeholder="Select One" onIonChange={e => setGender(e.detail.value)}>
                <IonSelectOption value="female">Female</IonSelectOption>
                <IonSelectOption value="male">Male</IonSelectOption>
              </IonSelect>
                       
          </IonRow>
         </IonGrid>
          <IonFab vertical="center" horizontal="end" slot="fixed">
            <IonFabButton routerLink="/submit">
              <IonIcon icon={add} />
            </IonFabButton>
          </IonFab>   
          <IonGrid>
               <LinkList location={props.location} /> </IonGrid>
        </IonContent>
      </IonPage>
    );
  };

export default CategriesContent;

