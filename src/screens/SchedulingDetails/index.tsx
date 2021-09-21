import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { format } from 'date-fns';
import { CarDTO } from '../../dtos/carDTO';
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { api } from '../../services/api';


import {
    Container,
    Header,
    CarImage,
    Content,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    Accessories,
    Footer,
    RentalPeriod,
    CalendarIcon,
    DateInfo,
    DateTitle,
    DateValue,
    RentalPrice,
    RentalPriceLabel,
    RentalPriceDetails,
    RentalPriceQuota,
    RentalPriceTotal,
} from './styles';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Acessory } from '../../components/Acessory';
import { Button } from '../../components/Button';

interface Params {
    car: CarDTO;
    dates: string[];
}

interface RentalPeriod {
    start: string;
    end: string;
}

export function SchedulingDetails() {
    const theme = useTheme()
    const route = useRoute();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false)
    const {car, dates} = route.params as Params;

    const rentalTotal = Number(dates.length * car.rent.price);


    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)

    async function handleConfirm(){
        setLoading(true)
        const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

        const unavailable_dates = [
            ...schedulesByCar.data.unavailable_dates,
            ...dates,
        ];

        await api.post('schedules_byuser', {
            user_id: 1,
            car,
            startDate: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
            endDate: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy')
        })

        await api.put(`/schedules_bycars/${car.id}`, {
            id: car.id,
            unavailable_dates,
        })
        .then(response => navigation.navigate("SchedulingComplete"))
        .catch(e => {
            Alert.alert("Atenção", "Não foi possível confirmar o agendamento")
            setLoading(false)
        })
        
    }

    useEffect(() => {
        setRentalPeriod({
            start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
            end: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
        })
    }, [])

   return (
        <Container>
            <Header>
                <BackButton 
                    onPress={() => navigation.goBack()}
                />
            </Header>
            <CarImage>
                <ImageSlider
                    imagesUrl={car.photos}
                />
            </CarImage>
            <Content>
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
                <RentalPeriod>
                    <CalendarIcon>
                        <Feather
                            name="calendar"
                            size={RFValue(24)}
                            color={theme.colors.shape}
                        />
                    </CalendarIcon>
                    <DateInfo>
                        <DateTitle>De</DateTitle>
                        <DateValue>{rentalPeriod.start}</DateValue>
                    </DateInfo>
                    <Feather
                        name="chevron-right"
                        size={RFValue(10)}
                        color={theme.colors.text}
                    />
                    <DateInfo>
                        <DateTitle>Até</DateTitle>
                        <DateValue>{rentalPeriod.end}</DateValue>
                    </DateInfo>
                </RentalPeriod>
                <RentalPrice>
                    <RentalPriceLabel>TOTAL</RentalPriceLabel>
                    <RentalPriceDetails>
                        <RentalPriceQuota>R$ {car.rent.price} x{dates.length} diária</RentalPriceQuota>
                        <RentalPriceTotal>R$ {rentalTotal}</RentalPriceTotal>
                    </RentalPriceDetails>
                </RentalPrice>
            </Content>
            <Footer>
                <Button 
                    title="Alugar agora"
                    color={theme.colors.sucess}
                    onPress={handleConfirm}
                    enabled={!loading}
                    loading={loading}
                />
            </Footer>
        </Container>
   );
}