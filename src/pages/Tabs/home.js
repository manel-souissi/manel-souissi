import React from "react";
import {
  add} from "ionicons/icons";
import { IonPage, IonContent,IonFabButton,IonFab ,IonIcon, IonSlide, IonSlides ,IonFabList,IonButton
 } from "@ionic/react";
  import './tabs.css';
import SmallHeader from "../../components/Header/SmallHeader";
import LargeHeader from "../../components/Header/LargeHeader";
import LinkList from "../../components/Link/LinkList";
import UserContext from "../../contexts/UserContext";

const Home = (props) => {
  
  const { user } = React.useContext(UserContext);

  const slideOpts = {

    spaceBetween: 10,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

  };
  return (
    <IonPage>
      <SmallHeader title="home" />
      <IonContent fullscreen>
        <LargeHeader title="HOME" />

        <>
        {user ? (
       <>

        <IonFab vertical="bottom" horizontal="bottom" slot="fixed">
          <IonFabButton>
            <IonIcon icon={add} />
          </IonFabButton>
       
        
          <IonFabList side="top">
            <IonButton  shape="round"   routerLink="/submit">
          exchange/sell</IonButton>
          </IonFabList>
          
          <IonFabList side="end">
            <IonButton  shape="round"  routerLink="/giveAway"> giveaway</IonButton>
          </IonFabList>
        </IonFab>   </>
        ) : (


<IonFab vertical="bottom" horizontal="bottom" slot="fixed" >
<IonFabButton  routerLink={"/login"}>
  <IonIcon icon={add} />
</IonFabButton></IonFab >
)}
</>



        <IonSlides   options={slideOpts} className="slide">
      <IonSlide >
      <img  className="ig" src=  "https://www.moneymagpie.com/wp-content/uploads/2012/06/MoneyMagpie_Items-For-Sale-Sell-Your-Stuff-Sign-e1491387817897.jpg" alt="img"/>
          
      </IonSlide>
      <IonSlide >
      <img  className="ig" src=  "https://www.shape.com.sg/sites/default/files/article/2017/02/Where%20To%20Donate%20Your%20Pre-Loved%20Stuff.jpg" alt="img"/>
      
      </IonSlide>
      <IonSlide >
      <img  className="ig" src= 
        "https://image.freepik.com/free-vector/exchange-logo_640639.jpg" alt="img"/>
      </IonSlide>
    </IonSlides>
  
   
      
     
       
           
      
        <LinkList location={props.location} />
      
      </IonContent>
    </IonPage>
  );
};
export default Home;
