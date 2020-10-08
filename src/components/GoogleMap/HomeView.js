
import React from 'react';
import { GoogleMap,InfoWindow, withScriptjs,withGoogleMap,Marker } from "react-google-maps";
import {
  IonPage, IonContent,IonSlide, IonSlides,IonCard
} from '@ionic/react';

import './style.css';
import firebase from "../../database/firebase";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import UserContext from "../../contexts/UserContext";
import SmallHeader from "../../components/Header/SmallHeader";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";



function Map(){
  const [post, setPosts] = React.useState([]);
  const { user } = React.useContext(UserContext);

  const [postt, setSelectedPosts] = React.useState(null);
  const [location, setLocation] = React.useState([]);
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
React.useEffect(() => {

  
 if (user){ 
   firebase.db.collection("location").where("key",'==',user&&user.uid).onSnapshot(SnapShot);
  
 }
  
  
}, [user])
React.useEffect(() => {
 
  const unsubscribe= firebase.db.collection("posts").orderBy("created", "desc").onSnapshot(handleSnapShot);
  

  
  
  return () => unsubscribe();
}, [])


function SnapShot(snapshot) {
  const location = snapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  setLocation(location);
  }

function handleSnapShot(snapshot) {
const post = snapshot.docs.map((doc) => {
  return { id: doc.id, ...doc.data() };
});
setPosts(post);
}
const mapRef= React.useRef();
const onMapLoad = React.useCallback((map)=> {
  mapRef.current= map;
},[]);





  const panTo=React.useCallback(({lat,lng})=>{
    mapRef.current.panTo({lat,lng});
    mapRef.current.setZoom(14);
  },[]);
//   

  return(
    <GoogleMap  
    defaultZoom={8}
    defaultCenter={{ lat: 33.9459648, lng:  9.7232673 }}

     onLoad={onMapLoad}
   >
   <Search  panTo={panTo}  />
   <Locate  />



   <br></br>

   <br></br>







   {location.map((location) => (
   <Marker  key={location?.cordination}
   
   
   position={{
    lat:location?.cordination?.lat,
    lng:location?.cordination?.lng
    
   }} 
   
 
   />

  
))}

        
{post.map((post) => (
   <Marker  key={post?.id}
   
   
   position={{
    lat:parseFloat( post?.cordination?.lat),
    lng:parseFloat(post?.cordination?.lng)
   }} 
   
   onClick={()=>{
     setSelectedPosts(post)
   }}

  icon= {{
    url:"https://cdn0.iconfinder.com/data/icons/election-8/64/17_mouth_publicity_announcement_branding_promotion_-512.png",
    scaledSize:new window.google.maps.Size(60,60)
  }}
   />

  
))}

{postt&&(
  <InfoWindow   position={{
    lat:parseFloat( postt?.cordination?.lat),
    lng:parseFloat(postt?.cordination?.lng)
   }} 
   onCloseClick={()=>{
    setSelectedPosts(null);
  }}>
    <div>
   deatails:
   <IonSlides   options={slideOpts} className="slide">
      <IonSlide >
      <IonCard>
      <h2>  {postt.Type} </h2>
   <p>  {postt.description} </p>
   <img   src={postt?.avatar?.avatar}   alt=""  style={{ width: `30vw` ,height:'20vh' }}  /> 
        </IonCard>          
      </IonSlide>
      </IonSlides>
      </div>
  </InfoWindow>
)}
  </GoogleMap>
  )
 
}


const WarpedMap = withScriptjs(withGoogleMap(Map));
export default function HomeView ()


 {
 
  return (
    <>
      <IonPage id='main'>
      <SmallHeader title="map" />

        <IonContent>

        <div style={{ width: `100vw` ,height:'100vh' }}  >
        <WarpedMap  googleMapURL=
        {`https://maps.googleapis.com/maps/api/js?v=3
        .exp&libraries=geometry,drawing,places&key=${'AIzaSyCDK03qE0WZCdoFdT6lmWAs-mSnMZUUx8A'}`}
        
        
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
       mapElement={<div style={{ height: `100%` }} />}
        
        />
        </div>
        </IonContent>
      </IonPage>
    </>
  )
}


function Locate(){
   const { user } = React.useContext(UserContext);
  return<button  className="locate"
   onClick={()=>{
     
    navigator.geolocation.getCurrentPosition((pos)=>{
      firebase.db.collection("location").doc(user.uid).set({
        cordination:{lat:pos?.coords?.latitude,
        lng:pos?.coords?.longitude},
        key:user.uid
      })
   
    
    },
    ()=> null
    );
   
  }}
  >
    <img  className="imageee"
  src="https://image.shutterstock.com/z/stock-vector-vintage-compass-icon-178389554.jpg" alt="locate me"/> </button>
}



function Search( {panTo}){
  const{
    ready,
    value,
    suggestions: {status, data},
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions:{
      location:{lat:()=> -34.397, 
        lng:()=> 150.644 }, 
    radius:200*1000,
  },

  });


  
  return (
    <div className="search">
        <Combobox onSelect={ async(address)=>{
          setValue(address, false);
          clearSuggestions();
          try{
            const results=await getGeocode({address});
            const{lat,lng}=await getLatLng(results[0]);
            console.log(lat,lng);
            panTo({lat,lng});
          }
          catch(error){
             console.log("error!");}
  }} >
     <ComboboxInput
      value={value} onChange={(e)=>{
       setValue(e.target.value);
     }}
     disabled={!ready}
     placeholder="Enter an address..."
     />
       <ComboboxPopover>
       <ComboboxList>
         {status === "OK" && data.map(({id, description})=>(
           <ComboboxOption key={id}  
            value={description}/>
           
        
         

          ))}</ComboboxList>
       </ComboboxPopover>
  </Combobox>
    </div> 

  );
}