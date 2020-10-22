import React from "react";
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonRow,
  IonCol,
  IonButton,
  IonGrid,
  IonIcon,IonFab,IonFabButton,IonFabList,IonHeader,IonToolbar,IonButtons,IonBackButton, IonTitle
} from "@ionic/react";
import {
  arrowBackOutline} from "ionicons/icons";
import firebase from "../../database";
import { toast } from "../../helpers/toast";
import UserContext from "../../contexts/UserContext";
import { personCircleOutline, mailOutline } from "ionicons/icons";
import UserAds from "../../components/Link/userAds";
const Profile = (props) => {
  const { user } = React.useContext(UserContext);
  const [users,setUsers]=React.useState([]);
  


  
  async function handleLogoutUser() {
    try {
      await firebase.logout();
      props.history.push("/");
      toast("You have logged out sucessflly");
    } catch (err) {
      console.error("Logout Error", err);
      toast(err.message);
    }
  }


  React.useEffect(() => {
    User();
  },);

  async function User() {
   
    if(user){
      let document =  await firebase.db.collection('users').doc(user.uid)
      document.get().then((doc) => {

        setUsers({ ...doc.data(),
           id: doc.id});
    }
   
    );
  }}

  return (
    <IonPage>
  
      <IonContent fullscreen>
        

        {users && (

          <>
           {users?.role ==="member" && (
              <IonHeader>
              <IonToolbar color="secondary">
              <IonTitle> Profile</IonTitle>  
                <IonButtons slot="start">
                  <IonBackButton  color="tertiary" defaultHref="/" />
                </IonButtons>
                
                  
                
              </IonToolbar>
              
            </IonHeader>
                
           )}
        {users?.role ==="Admin" && (


<>

<IonToolbar color="secondary">
<IonTitle> Profile</IonTitle>  </IonToolbar> 

<IonFab vertical="top" horizontal="bottom" slot="fixed">
          <IonFabButton  fill="outline" > 
            <IonIcon icon={arrowBackOutline} />
          </IonFabButton>
       
        
          <IonFabList side="bottom">
            <IonButton  shape="round" routerLink={"/adminDasboard"}>
            Admin Dashbord</IonButton>
          </IonFabList>
          
          <IonFabList side="end">
            <IonButton  shape="round"  routerLink={"/home"}> home</IonButton>
          </IonFabList>
        </IonFab>  
        </> 

)}    </>)}

        {user ? (
          <>
            <IonCard>
              <IonCardContent>
                <IonList lines="none">
                  <IonItem>
                    <IonIcon icon={personCircleOutline} slot="start"></IonIcon>
                    <IonLabel>
                      <strong>{user.displayName}</strong>
                      <p>UserName</p>
                    </IonLabel>
                  </IonItem>
                 
                  <IonItem>
                    <IonIcon icon={mailOutline} slot="start"></IonIcon>
                    <IonLabel>
                      <strong>{user.email}</strong>
                      <p>Email</p>
                    </IonLabel>
                  </IonItem>


               
                </IonList>
              </IonCardContent>
            </IonCard>
            <IonRow>
              <IonCol>
                <IonButton
                  expand="block"
                  routerLink={"/edit-profile"}
                  color="primary"
                  fill="outline"
                >
                  Edit Profile
                </IonButton>
              </IonCol>
            </IonRow>
            
            <IonRow></IonRow>
            <IonRow>
              <IonCol>
                <IonButton
                  expand="block"
                  onClick={handleLogoutUser}
                  color="primary"
                  fill="outline"
                >
                  Log Out
                </IonButton>
              </IonCol>
            </IonRow>

            <UserAds location={props.location} />
  
          </>
        ) : (
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonButton
                  expand="block"
                  routerLink={"/register"}
                  color="primary"
                >
                  Sign UP
                </IonButton>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonButton expand="block" routerLink={"/login"} color="primary">
                  Log In
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        )}
      </IonContent>
      
    </IonPage>
  );
};
export default Profile;
