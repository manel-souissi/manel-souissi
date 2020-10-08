import React from "react";
import { IonHeader, IonToolbar, IonTitle } from "@ionic/react";
import Admin from "../../Admin";

const SmalHeader = ({ title }) => {
  return (
    <IonHeader>
      <IonToolbar
        style={{
          background: "#ffffff",
        }}
        color="#1e2023"
      >
        <IonTitle  size="large">{title}</IonTitle>
        <Admin/>
      </IonToolbar>
    </IonHeader>
  );
};

export default SmalHeader;
