import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';

import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useNavigation, useRoute } from '@react-navigation/native';

import Animated, { 
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    interpolate,
    Extrapolate
} from 'react-native-reanimated';

import {
    Container,
    Header,
    CarImage,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    About,
    Accessories,
    Footer,
} from './styles';

import {getAccessoryIcon} from '../../utils/getAccessoryIcon'

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Acessory } from '../../components/Acessory';
import { Button } from '../../components/Button';
import { CarDTO } from '../../dtos/carDTO';

interface Params {
    car: CarDTO;
}

export function CarDetails() {
    const route = useRoute();
    const theme = useTheme();
    const navigation = useNavigation();
    const scrollY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler(event => {
        scrollY.value = event.contentOffset.y
    })
    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            height: interpolate(
                scrollY.value,
                [0, 200],
                [200, 70],
                Extrapolate.CLAMP
            )
        }
    })

    const sliderCarAnimatedStyle = useAnimatedStyle(() => {
        return{
            opacity: interpolate(
                scrollY.value,
                [0, 150],
                [1, 0],
                Extrapolate.CLAMP
            )
        }
    })

    const { car } = route.params as Params;

    function handleConfirmRental(){
        navigation.navigate("Scheduling", {car})
    }

   return (
        <Container>
            <StatusBar
                barStyle="dark-content"
                translucent
                backgroundColor="transparent"
            />
            <Animated.View
                style={[
                    headerAnimatedStyle,
                    styles.header,
                    {backgroundColor: theme.colors.background_secondary}
                ]}
            >
                <Header>
                    <BackButton 
                        onPress={() => navigation.goBack()}
                    />
                </Header>
                <Animated.View style={[sliderCarAnimatedStyle]}>
                    <CarImage>
                        <ImageSlider
                            imagesUrl={car.photos}
                        />
                    </CarImage>
                </Animated.View>
            </Animated.View>
            <Animated.ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingTop: getStatusBarHeight() + 160,
                }}
                showsVerticalScrollIndicator={false}
                onScroll={scrollHandler}
                scrollEventThrottle={16} //quadros para renderizar durante scroll 1000/60 60fps
            >
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>
                    <Rent>
                        <Period>{car.rent.period}</Period>
                        <Price>R$ {car.rent.price}</Price>
                    </Rent>
                </Details>
                <Accessories>
                    {
                        car.accessories.map(accessory => (
                            <Acessory
                                key={accessory.type}
                                name={accessory.name}
                                icon={getAccessoryIcon(accessory.type)}
                            />
                        ))
                    }
                </Accessories>
                <About>
                    {car.about}
                    {car.about}
                    {car.about}
                    {car.about}
                    {car.about}
                </About>
            </Animated.ScrollView>
            <Footer>
                <Button title="Escolher período do aluguel" onPress={handleConfirmRental}/>
            </Footer>
        </Container>
   );
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        overflow: 'hidden',
        zIndex: 1,
    },
})