import React from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  
} from "@ionic/react";



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





import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Tabs/home";
import Search from "./pages/Tabs/Search";
import Profile from "./pages/Tabs/Profile";
import Messages from "./pages/Tabs/messages";
import Submit from "./pages/Tabs/Submit";
import Submitt from "./pages/Tabs/Submit2";
import Ad from "./Admin/usersAds/Ad";
import AdsList from "./Admin/usersAds/AdsList";

import Trending from "./pages/Tabs/Trending";
import Link from "./pages/Link";
import UserLink from "../src/components/Link/liink";
import Timer from "../src/components/Link//Timer";

import Users from "../src/Admin/users";
import SignUp from "./pages/Auth/SignUp";
import EditProfile from "./pages/Auth/EditProfile";
import Edite from "./components/Link/Editead";
import Forgot from "./pages/Auth/Forgot";
import Login from "./pages/Auth/Login";
import MsgScreen from "../src/components/message/msgScreen"
import useAuth from "./hooks/useAuth";
import UserContext from "./contexts/UserContext";
 import Userpofile from "../src/Admin/userpofile";
 import Categories from "../src/Admin/Categories";
 import Reclamer from "../src/reclamation/reclamer";
 import Complaintprocessing from "../src/reclamation/Complaintprocessing";

  import NewReclamtion from "../src/reclamation/newReclamtion";
  import AdminDasboard from "../src/Admin/adminPanel";
  import Posts from "../src/components/Link/LinkList";
  import Categorie from "../src/pages/Tabs/categories";
  import HomeView from "../src/components/GoogleMap/HomeView";
import Admin from "./Admin";

const App = () => {
  const [user, setUser] = useAuth();

  return (
    <IonApp>
      <IonReactRouter>
        <UserContext.Provider value={{ user, setUser }}>
        
            <IonRouterOutlet>
              <Route
                path="/"
                render={() => <Redirect to="/home" />}
                exact={true}
              />  
                           <Route path="/Admin" component={Admin} />
                           <Route path="/AdminDasboard" component={AdminDasboard} />
                           <Route path="/Timer" component={Timer} />

              <Route path="/home" component={Home} />
              <Route path="/Ad/:id" component={Ad} />
              <Route path="/AdsList" component={AdsList} />

              <Route path="/users" component={Users} />
              <Route path="/Messages" component={Messages} />
              <Route path="/categories" component={Categories} />
              <Route path="/screen/:id" component={MsgScreen} />
              <Route path="/processing/:id" component={Complaintprocessing} />

               <Route path="/userpofile/:id" component={Userpofile} />
              <Route path="/trending" component={Trending} />
              <Route path="/submit" component={Submit} />
              <Route path="/giveAway" component={Submitt} />
              <Route path="/search" component={Search} />
              <Route path="/profile" component={Profile} />
              <Route path="/edit-profile/" component={EditProfile} />
              <Route path='/edit/:id' component={Edite} />
              <Route path="/register" component={SignUp} />
              <Route path="/login" component={Login} />
              <Route path="/forgot" component={Forgot} />
              <Route path="/reclamer/:id" component={Reclamer} />
              <Route path="/HomeView" component={HomeView} />

               <Route path="/NewReclamtion" component={NewReclamtion} />
              <Route path="/Link/:id" component={Link} />

              <Route path="/UserLink/:id" component={UserLink} />

              <Route path="/categorie/:id" component={Posts} />

              <Route path="/categorie" component={Categorie} />

              <Route component={() => <Redirect to="/home" />} />
            </IonRouterOutlet>
           
        </UserContext.Provider>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
