import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Scan from './pages/Scan';
import LogIn from './pages/LogIn';
import Products from './pages/Products';

/* Authentication API */
import * as firebase from 'firebase';
import { environment } from './environment/environment';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
firebase.initializeApp(environment.firebaseConfig);

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/scan" component={Scan} exact={true} />
          <Route path="/login" component={LogIn} exact={true} />
          <Route path="/products" component={Products} exact={true} />
          <Route path="/logout" render={() => <Redirect to="/login" />} exact={true} />
          <Route path="/" render={() => <Redirect to="/login" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="top" color="primary">
          <IonTabButton tab="Scan" href="/scan">
            <IonLabel>Scan</IonLabel>
          </IonTabButton>
          <IonTabButton tab="LogOut" href="/login">
            <IonLabel>Logout</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
