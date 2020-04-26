import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonAvatar,
  IonIcon,
  IonItem
} from '@ionic/react';

import { IonReactRouter } from '@ionic/react-router';
import Scan from './pages/Scan';
import LogIn from './pages/LogIn';

import { useAuthState } from 'react-firebase-hooks/auth';
import { environment } from './environment/environment';
import * as firebase from 'firebase';

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
import { scan, logoGoogle } from 'ionicons/icons';

firebase.initializeApp(environment.firebaseConfig);

const App: React.FC = () => {
  const [ user ] = useAuthState(firebase.auth());
  
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path='/scan' component={Scan} exact={true} />
            <Route path='/login' component={LogIn} exact={true} />
            <Route path='/logout' render={() => <Redirect to='/login' />} exact={true}/>
            <Route path='/' render={() => <Redirect to='/login' />} exact={true} />
          </IonRouterOutlet>
          <IonTabBar slot='top' color='primary'>
            <IonTabButton tab='Scan' href='/scan'>
              <IonIcon icon={scan}/>
              <IonLabel>Scan</IonLabel>
            </IonTabButton>}
            <IonTabButton tab='LogOut' href='/login'>
              <IonIcon icon={logoGoogle}/>
              <IonLabel>{user ? 'Sign Out' : 'Sign In'}</IonLabel>
            </IonTabButton>
            { user && 
                <IonTabButton tab='LogOut' href='/'>
                  <IonItem color='primary'>
                    <IonAvatar>
                      <img src={user.photoURL!} alt='Google avatar'/>
                    </IonAvatar>
                  </IonItem>
                </IonTabButton>
            }
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
