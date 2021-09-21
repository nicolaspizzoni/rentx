import React, {useState, useEffect} from 'react';
import { StatusBar, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useTheme } from 'styled-components';
import { AntDesign } from '@expo/vector-icons';

import { BackButton } from '../../components/BackButton';
import { CarDTO } from '../../dtos/carDTO';
import { api } from '../../services/api';


import {
   Container,
   Header,
   Title,
   SubTitle,
   Content,
   Appointments,
   AppointmentsTitle,
   AppointmentsQuantity,
   CarWrapper,
   CarFooter,
   CarFooterTitle,
   CarFooterPeriod,
   CarFooterDate,
} from './styles';
import { CarCard } from '../../components/CarCard';
import { LoadAnimated } from '../../components/LoadAnimated';

interface CarProps {
   id: string;
   user_id: string;
   car: CarDTO;
   startDate: string;
   endDate: string;
}

export function MyCars() {
   const [cars, setCars] = useState<CarProps[]>([]);
   const [loading, setLoading] = useState(true);

   const navigation = useNavigation();
   const theme = useTheme();

   useEffect(() => {
      async function fetchCars(){
         try {
            const response = await api.get('schedules_byuser?user_id=1');
            setCars(response.data);
         } catch (error) {
            console.log(error)
         } finally {
            setLoading(false)
         }
      }

      fetchCars()
   }, [])

   return (
        <Container>
           <Header>
                <StatusBar
                    barStyle="light-content"
                    translucent
                    backgroundColor="transparent"
                />
                <BackButton
                    color={theme.colors.shape}
                    onPress={() => navigation.goBack()}
                />
                <Title>
                  Seus agendamentos,{'\n'}
                  estão aqui.
                </Title>
                <SubTitle>
                   Conforto, segurança e praticidade
                </SubTitle>
            </Header>
         <Content>
            {
               !loading &&
               <Appointments>
                  <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
                  <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
               </Appointments>
            }

            {
               loading ?
                  <LoadAnimated />
               : 
               <FlatList
                  data={cars}
                  keyExtractor={(item) => String(item.id)}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item}) => (
                     <CarWrapper>
                        <CarCard data={item.car} />
                        <CarFooter>
                           <CarFooterTitle>Periodo</CarFooterTitle>
                           <CarFooterPeriod>
                              <CarFooterDate>{item.startDate}</CarFooterDate>
                              <AntDesign
                                 name="arrowright"
                                 size={14}
                                 color={theme.colors.text}
                              />
                              <CarFooterDate>{item.endDate}</CarFooterDate>
                           </CarFooterPeriod>
                        </CarFooter>
                     </CarWrapper>
                  )}
               />
            }

         </Content>
        </Container>
   );
}