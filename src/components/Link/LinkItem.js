import React from "react";
import {
  IonCard,
  IonText,
  IonIcon,
} from "@ionic/react";
import {
  personCircleOutline,
  timeOutline,
} from "ionicons/icons";
const LinkItem = ({ post}) => {
  return (
    <>
    <div className="ion-padding-vertical ion-text-wrap">
    {post?.avatar?.avatar !=="" && (   <img  src= {post?.avatar?.avatar }
  width="300px" height="300px" alt= ""/> )}</div>
    <div >


        
     

      
        
      

          
              
            

              
           

   
    {post?.Type !=="" && (   <IonCard  className="link"  style={{
            float: "left"
        }} >
              <div className="ion-padding-vertical ion-text-wrap">
            
              <>
                  <p  className="content"> Type:</p>
                <strong style={{ fontSize: "1rem" }}>
                  {post?.Type}</strong>     </>
              </div>
              </IonCard>)}

             

              {post?.category !=="" && ( 
              <IonCard  className="link"  style={{
            float: "left"
        }} >
              <div className="ion-padding-vertical ion-text-wrap">
           
              <>
                  <p  className="content"> Category:</p>
                <strong style={{ fontSize: "1rem" }}>
                  {post?.category}</strong>     </>   
              </div></IonCard>
)}
        

        {post?.Price !=="" && (  <IonCard  style={{
            float: "left"
        }} className="link" >
              <div className="ion-padding-vertical ion-text-wrap">
             
                  <>
                  <p  className="content"> Price:</p>
                <strong style={{ fontSize: "1rem" }}>
                  {post?.Price} dt</strong>     </>
                 
              </div></IonCard> )}
              <div className="ion-padding-vertical ion-text-wrap"></div>
              <div className="ion-padding-vertical ion-text-wrap"></div>
              <div className="ion-padding-vertical ion-text-wrap"></div>
              <div className="ion-padding-vertical ion-text-wrap"></div>
              <div className="ion-padding-vertical ion-text-wrap"></div>
              <div className="ion-padding-vertical ion-text-wrap"></div>
              <div className="ion-padding-vertical ion-text-wrap"></div>
              <div className="ion-padding-vertical ion-text-wrap"></div>
              {" "}
            
              {post?.description !=="" && ( 

                    <div className="desc">


              <p
                style={{
                  alignItems: "start",
                  fontSize: "0.8 rem",
                  fontWeight: "normal",
                }}
                
              > 
                 Description:
              </p>
              <p
                style={{
                  alignItems: "start",
                  fontSize: "0.8 rem",
                  fontWeight: "normal",
                }}
              > 
              <strong style={{ fontSize: "1rem" }}>
                  {post?.description}</strong>
              </p>   
               </div> )}




              <div className="ion-padding-vertical ion-text-wrap"></div>
              <p
                style={{
                  alignItems: "center",
                  fontSize: "0.8 rem",
                  fontWeight: "normal",
                }}
              >
              
                <IonIcon
                  icon={personCircleOutline}
                  style={{
                    verticalAlign: "middle",
                  }}
                />{" "}
                <IonText
                  style={{
                    alignItems: "middle",
                  }}
                >
                  {post?.posteBy?.name}
                </IonText>
                {" "}
                <IonIcon
                  icon={timeOutline}
                  style={{
                    verticalAlign: "middle",
                  }}
                />{" "}
                <IonText
                  style={{
                    verticalAlign: "middle",
                  }}
                >
                  {new Date(post?.created?.toDate()).toUTCString()}
                </IonText>
            
              </p>

          
    
     
    </div>{" "}
    </>
  );
};

export default LinkItem;



   /* {post?.comments?.lenght > 0 && (
                  <>
                    {" |"}
                    <IonIcon
                      Icon={chatbubbleEllipsesOutline}
                      style={{ verticalAlign: "middle" }}
                    />{" "}
                    <IonText
                      style={{
                        verticalAlign: "middle",
                      }}
                    >
                      {post?.comments?.lenght}
                    tt</IonText>
                  </>
                )}{" "}*/