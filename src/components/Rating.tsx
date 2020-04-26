import React from 'react';
import {  IonBadge, IonIcon } from '@ionic/react';
import { star , starHalf } from 'ionicons/icons';


const Rating: React.FC<{
    stars: number; 
}> = (props) => {
    
    let rating = props.stars;
    let stars = [];
    for(let i = 0; i + 0.5 < props.stars; i++) {
        stars.push(<IonIcon icon={star} key={i}></IonIcon>);
        rating--;
    }

    if (rating === 0.5) {
        stars.push(<IonIcon icon={starHalf} key={props.stars}></IonIcon>)
    }
    
    return (  
        <IonBadge>
            {stars.map(star => star)}
        </IonBadge>
    );
    
};

export default Rating;