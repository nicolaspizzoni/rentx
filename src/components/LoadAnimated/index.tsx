import React from 'react';

import LottieView from 'lottie-react-native';
import LoadCar from '../../assets/animatedcar.json';

import {
   Container
} from './styles';

export function LoadAnimated() {
   return (
        <Container>
            <LottieView
                source={LoadCar}
                style={{height: 200}}
                resizeMode="contain"
                loop
                autoPlay
            />
        </Container>
   );
}