import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { format } from 'date-fns';
import {useTheme} from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getPlatformDate } from '../../utils/getPlatformDate';

import {
    Container,
    Header,
    Title,
    RentalPeriod,
    DateInfo,
    DateTitle,
    DateValue,
    Content,
    Footer,
} from './styles';

import { CarDTO } from '../../dtos/carDTO';
import ArrowSvg from '../../assets/arrow.svg';
import { Button } from '../../components/Button';
import { BackButton } from '../../components/BackButton';

import { 
    Calendar,
    DayProps,
    generateInterval,
    MarkedDateProps
} from '../../components/Calendar';


interface RentalPeriod {
    startFormatted: string;
    endFormatted: string;
}

interface Params {
    car: CarDTO;
}

export function Scheduling() {
    const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
    const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
    
    const theme = useTheme();
    const navigation = useNavigation();
    const route = useRoute();
    const { car } = route.params as Params;

    function handleConfirm(){
        navigation.navigate("SchedulingDetails", {
            car,
            dates: Object.keys(markedDates),
        });
    }

    function handleChangeDate(date: DayProps){
        let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
        let end = date;

        if(start.timestamp > end.timestamp) {
            start = end;
            end = start;
        }

        setLastSelectedDate(end);

        const interval = generateInterval(start, end);
        setMarkedDates(interval);

        const firstDate = Object.keys(interval)[0]
        const lastDate = Object.keys(interval)[Object.keys(interval).length - 1];

        setRentalPeriod({
            startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
            endFormatted: format(getPlatformDate(new Date(lastDate)), 'dd/MM/yyyy'),
        })
    }

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
                    Escolha uma{'\n'}
                    data de início e{'\n'}
                    fim do aluguel
                </Title>
                <RentalPeriod>
                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue selected={!!rentalPeriod.startFormatted}>
                            {rentalPeriod.startFormatted}
                        </DateValue>
                    </DateInfo>
                    <ArrowSvg />
                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue selected={!!rentalPeriod.endFormatted}>
                            {rentalPeriod.endFormatted}
                        </DateValue>
                    </DateInfo>
                </RentalPeriod>
            </Header>
            <Content>
                <Calendar
                    markedDates={markedDates}
                    onDayPress={handleChangeDate}
                />
            </Content>
            <Footer>
                <Button
                    title="Confirmar"
                    onPress={handleConfirm}
                    enabled={!!rentalPeriod.startFormatted}
                />
            </Footer>
        </Container>
   );
}