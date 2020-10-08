import React from "react";
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonCol,
  IonButton,
  IonRow,
  IonRouterLink,
  IonLoading,IonIcon,
} from "@ionic/react";
import './LogIn.css';
import NavHeader from "../../components/Header/NavHeader";
import useForm from "../../hooks/useForm";
import { toast } from "../../helpers/toast";
import validateLogin from "../../validators/validateLogin";
import firebase from "../../database";
import{personCircleOutline} from 'ionicons/icons';
import UserContext from "../../contexts/UserContext";

const INITIAL_STATE = {
  email: "",
  password: "",
};

const Login = (props) => {
  const { handleSubmit, handleChange, values, isSubmitting } = useForm(
    INITIAL_STATE,
    validateLogin,
    auhtenticateUser
  );
  const { user } = React.useContext(UserContext);

  const [busy, setBusy] = React.useState(false);

  async function auhtenticateUser() {
    setBusy(true);
    const { email, password } = values;
    try {
       await firebase.db.collection('users').where("email",'==',values.email)
      .where("role",'==',"Admin").get()
     
        .then((querySnapshot) => {
          if(!querySnapshot.empty){
           
              firebase.login(email, password);
              if(user){ 
                toast("you have logged in succesfully!");
              props.history.push("/AdminDasboard");
            }
            else{
              toast("your email or password wrong!,Please try again  ");
             }
          

          }

          
    else{
     
         firebase.login(email, password);
         if(user){
            toast("you have logged in succesfully!");
         props.history.push("/");}
         else{
          toast("your email or password wrong!,Please try again  ");
         }
       
     
      
    }})}
    catch(err){console.error("Authentication Error", err);
    toast(err.message);}
    
   
    setBusy(false);
  }
  return (
    <IonPage>
      <NavHeader title="Log In" />
      <IonLoading message={"Please wait.."} isOpen={busy} />
      <IonContent className="logincontent">
      <div className="padding">
   
    <div className="logo">
       <br/> <IonIcon  icon={personCircleOutline}  color= "light" ></IonIcon>
    </div>
    <IonItem className="itemlogin" lines="none"> 
          <IonLabel position="floating" color= "light">Email</IonLabel>
          <IonInput
         color= "light" 
            name="email"
            type="text"
            value={values.email}
            onIonChange={handleChange}
            required
          ></IonInput>
        </IonItem>
        <IonItem className="itemlogin" lines="none"> 
          <IonLabel   color= "light" position="floating">Password</IonLabel>
          <IonInput
          color= "light" 
            name="password"
            type="password"
            value={values.password}
            onIonChange={handleChange}
            required
          ></IonInput>
        </IonItem>
        <IonItem className="itemlogin" lines="none"> 
          <IonCol>
            <IonButton color="Medium" fill="outline" shape="round" expand="block" 
              type="submit"
             
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              Log In
            </IonButton>
          </IonCol>
        </IonItem>
        <IonRow>
          <IonCol class="ion-text-center ion-padding-vertical">
            <IonRouterLink routerLink={"/forgot"}>
              Forgot Password?
            </IonRouterLink>
          </IonCol>
        </IonRow></div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
