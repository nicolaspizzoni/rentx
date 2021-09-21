import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useWindowDimensions, StatusBar } from 'react-native';

import {
   Container,
   Content,
   Title,
   Text,
   Footer,
} from './styles';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';
import { ConfirmButton } from '../../components/ConfirmButton';

export function SchedulingComplete() {

    const {width} = useWindowDimensions();
    const navigation = useNavigation();

    function handleConfirm(){
        navigation.navigate("Home")
    }

   return (
        <Container>
            <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />
            <LogoSvg width={width} height={235}/>
            <Content>
                <DoneSvg width={80} height={80}/>
                <Title>Carro alugado!</Title>
                <Text>
                    Agora você só precisa ir{'\n'}
                    até a concessionária da RENTX{'\n'}
                    pegar o seu automóvel.
                </Text>
            </Content>
            <Footer>
                <ConfirmButton title="Ok" onPress={handleConfirm}/>
            </Footer>
        </Container>
   );
}