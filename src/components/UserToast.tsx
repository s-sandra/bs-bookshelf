import React from 'react';
import { IonToast } from "@ionic/react";
import * as firebase from 'firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const UserToast: React.FC = () => {
    const [ user, loading, error ] = useAuthState(firebase.auth());

    return (
        <React.Fragment>
            <IonToast
            isOpen={loading}
            position='top'
            message='Signing you in...'
            duration={3000}
            color='light'
        />

        <IonToast
            isOpen={error? true : false}
            position='top'
            message={`Unable to sign ${user ? 'out' : 'in'}.`}
            duration={3000}
            color='warning'
        />
      </React.Fragment>
    );
};

export default UserToast;