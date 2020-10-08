import React from "react";
import {
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonHeader,
  IonButton,
  IonIcon,
} from "@ionic/react";
const NavHeader = ({ title, option, icon, action }) => {
  return (
    <IonHeader>
      <IonToolbar color="secondary">
        <IonButtons slot="start">
          <IonBackButton  color="tertiary" defaultHref="/AdminDasboard" />
        </IonButtons>
        {option && (
          <IonButtons slot="primary">
            <IonButton onClick={action}>
              <IonIcon slot="icon-only" icon={icon} />
            </IonButton>
          </IonButtons>
        )}
        <IonTitle>{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default NavHeader;
