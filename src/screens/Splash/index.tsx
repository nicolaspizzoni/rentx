//ANIMAÇÕES OCORREM NA THREAD UI DO USUÁRIO
import React, {useEffect} from 'react';
import { useNavigation } from '@react-navigation/core';

import Animated, { 
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    runOnJS,
    interpolate,
    Extrapolate,
} from 'react-native-reanimated';

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

import {
   Container,
} from './styles';

export function Splash() {

    const splashAnimation = useSharedValue(0); //0 -> 50 passos d aanimação (frames)

    const navigation = useNavigation();

    function StartApp(){
        navigation.navigate("Home")
    }

    const brandStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(splashAnimation.value, 
                [0, 50],//passos da animação
                [1, 0]//valores da opacity para cada passo
            ),
            transform: [{
                translateX: interpolate(splashAnimation.value,
                    [0, 50],
                    [0, -50],
                    Extrapolate.CLAMP
                )
            }]
        }
    });

    const logoStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(splashAnimation.value, 
                [0, 25, 50],
                [0, .3, 1]
            ),
            transform: [{
                translateX: interpolate(splashAnimation.value, 
                    [0, 50],
                    [-50, 0],
                    Extrapolate.CLAMP
                )
            }]
        }
    })

    useEffect(() => {
        splashAnimation.value = withTiming(
            50, //50 define qtd de frames
            {duration: 1000},
            //callback executada após termino da animação
            () => {
                //retornando aplicativo para worklet do app para rodar em JS
                'worklet'
                runOnJS(StartApp)()
            }
        )
    }, [])

   return (
        <Container>
            <Animated.View style={[brandStyle, {position: 'absolute'}]}>
                <BrandSvg height={50} width={80} />
            </Animated.View>
            <Animated.View style={[logoStyle, {position: 'absolute'}]}>
                <LogoSvg height={20} width={180} />
            </Animated.View>
        </Container>
   );
}
