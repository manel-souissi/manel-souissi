
import React from "react";
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonRow,
  IonCol,
  IonButton ,IonGrid,IonCard, IonCardContent
} from "@ionic/react";


import NavHeader from  "../components/Header/NavHeader";
import firebase from "../database/firebase";
import useForm from "../hooks/useForm";
const INITIAL_STATE = {
    reclamtion: "",
  
  

};
const NewReclamtion = (props) => {
  const [reclame, setReclamation] = React.useState([]);
    const {values, handleChange } = useForm(
        INITIAL_STATE,
        create
      );

      
      React.useEffect(() => {  
      
   const unsubscribe =firebase.db.collection('User_reclamation').where("etat",'==',"").onSnapshot(handleSnapShot);
        
      
       
           return () => unsubscribe();
              
               },[]);
    
      function handleSnapShot(snapshot) {
        const reclame = snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setReclamation(reclame);
      }
    function create(){
        const { 
        
            reclamtion
         
          
          
         } = values;
    
    
          const newReclamtiont = {
            reclamtion};
          
        const fieldName=reclamtion;
        firebase.db.collection('reclamation').doc(fieldName).set(newReclamtiont);
        setReclamation('');
        }
    
    return (
        <IonPage>

<NavHeader
        title="users claims "
      
        />        <IonContent fullscreen>
         
      
          <IonGrid>
          <IonRow>

          <IonCol>

          <IonItem lines="full">
            
            
            <IonLabel position="floating"> new type of reclamtion </IonLabel>
            <IonInput
              name="reclamtion"
              value={values.reclamtion}
              type="text"  onIonChange={handleChange}
              required
            ></IonInput>
          </IonItem></IonCol>
            <IonCol>

              <IonButton
                type="submit"
                color="primary"
                fill="outline" shape="round"
                onClick={create}
              >
                add
              </IonButton>
            </IonCol>
            
          </IonRow>
          </IonGrid>
          <br/>
          <IonCard>
          <IonGrid>
         
          <br/>
          <IonLabel position="floating"> user's claims table: </IonLabel> <br/>
          <IonRow color="secondary">
            
        
          <table >
          <tbody>
          <tr className="row1">
    
    


    <th>Claim by</th>
    <th>Claim</th>
    <th> Action</th>
  </tr>
  {reclame.map((reclame) => ( 
  <tr key={reclame?.id}>
  
    <td> {reclame?.reclamerBy?.name}</td>
    <td>{reclame?.reclamtion}</td>
    <td>
       <IonButton size="small" routerLink={`/processing/${reclame?.id}`}>      
    complaint processing
    </IonButton>
</td>
  </tr>
 ))}
</tbody>
</table> 
</IonRow>
          </IonGrid></IonCard>
        </IonContent>
      </IonPage>
    )
}

export default NewReclamtion
