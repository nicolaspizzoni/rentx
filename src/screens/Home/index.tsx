import React, {useEffect, useState} from 'react';
import { StatusBar, StyleSheet, Dimensions, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';

import Animated, {
   useSharedValue,
   useAnimatedStyle,
   useAnimatedGestureHandler,
   withSpring,
} from 'react-native-reanimated';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);
const largura = Dimensions.get('window').width

import {
   Container,
   Header,
   TotalCars,
   CarList,
   CarIcon,
} from './styles';

import {api} from '../../services/api';
import Logo from '../../assets/logo.svg';
import { CarDTO } from '../../dtos/CarDTO';
import { LoadAnimated } from '../../components/LoadAnimated';
import { CarCard } from '../../components/CarCard';


export function Home() {
   const [cars, setCars] = useState<CarDTO[]>([]);
   const [loading, setLoading] = useState(true);

   const navigation = useNavigation();
   const theme = useTheme();

   const positionX = useSharedValue(0);
   const positionY = useSharedValue(0);

   const myCarsAnimatedStyle = useAnimatedStyle(() => {
      return {
         transform: [
            {translateX: positionX.value},
            {translateY: positionY.value},
         ],
         position: 'absolute',
         bottom: 13,
         right: 22,
      }
   });

   const gestureHandler = useAnimatedGestureHandler({
      onStart(_, ctx: any){
         ctx.positionX = positionX.value; //pega o contexto do valor inicial a cada iteração
         ctx.positionY = positionY.value;
      },
      onActive(event, ctx: any){
         positionX.value = ctx.positionX + event.translationX; //soma o valor do começo com o novo
         positionY.value = ctx.positionY + event.translationY;
         
      },
      onEnd(){
         positionX.value <= (-(largura/2) + 44)
         ? positionX.value = withSpring((-largura + 104)) //60 + 22 + 22
         : positionX.value = withSpring(0)
      }
   })

   function handleCarDetails(car: CarDTO) {
      navigation.navigate("CarDetails", { car })
   }

   function handleOpenMyCars() {
      navigation.navigate("MyCars")
   }

   useEffect(() => {
      async function fetchCars(){
         try{
            const response = await api.get('/cars');
            setCars(response.data);
         }catch(error){
            console.log(error)
         }finally{
            setLoading(false);
         }
      };

      fetchCars();
   }, [])

   useEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', () => {
         return true;
      })
   }, [])

   return (
        <Container>
           <StatusBar 
            barStyle="light-content"
            translucent
            backgroundColor="transparent"
           />
            <Header>
               <Logo
                  height={RFValue(12)}
                  width={RFValue(108)}
               />
               {
                  !loading &&
                     <TotalCars>
                        Total de {cars.length} carros
                     </TotalCars>
               }
            </Header>
            {
               loading ?
                  <LoadAnimated />
               :
                  <CarList 
                     data={cars}
                     keyExtractor={item => item.id}
                     renderItem={({item}) => <CarCard data={item} onPress={() => handleCarDetails(item)} />}
                  />
            }
            <PanGestureHandler onGestureEvent={gestureHandler}>
               <Animated.View
                  style={[myCarsAnimatedStyle]}
               >
                  <ButtonAnimated
                     onPress={handleOpenMyCars}
                     style={[styles.button, { backgroundColor: theme.colors.main}]}
                  >
                     <CarIcon
                        name="ios-car-sport"
                        size={32}
                        color={theme.colors.shape}
                     />
                  </ButtonAnimated>
               </Animated.View>
            </PanGestureHandler>
        </Container>
   );
}

const styles = StyleSheet.create({
   button: {
      height: 60,
      width: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center'
   }
})