import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FlatList } from 'react-native';
import { CarDTO } from '../../dtos/carDTO';
import { Ionicons } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';


export const Container = styled.View`
   flex: 1;
   background-color: ${({theme}) => theme.colors.background_primary};
`;

export const Header = styled.View`
   flex-direction: row;
   align-items: flex-end;
   justify-content: space-between;

   padding: ${RFValue(32)}px ${RFValue(24)}px;

   width: 100%;
   height: 113px;

   background-color: ${({theme}) => theme.colors.header};
`;

export const TotalCars = styled.Text`
   font-size: ${RFValue(15)}px;
   font-family: ${({theme}) => theme.fonts.primary_400};
   color: ${({theme}) => theme.colors.text};
`;

export const CarList = styled(FlatList as new () => FlatList<CarDTO>)
.attrs({
   contentContainerStyle: {
      padding: 24
   },
   showsVerticalScrollIndicator: false,
})`
   
`;

export const CarIcon = styled(Ionicons)``;
