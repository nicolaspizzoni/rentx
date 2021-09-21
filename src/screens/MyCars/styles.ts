import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
   flex: 1;
   align-items: center;
   background-color: ${({theme}) => theme.colors.background_primary};
`;

export const Header = styled.View`
    align-items: flex-start;
    justify-content: center;

    padding: 25px;
    padding-top: ${getStatusBarHeight() + 10}px;

    width: 100%;
    height: 300px;

    background-color: ${({theme}) => theme.colors.header};
`;

export const Title = styled.Text`
    color: ${({theme}) => theme.colors.shape};
    font-family: ${({theme}) => theme.fonts.secondary_600};

    font-size: ${RFValue(30)}px;
    margin-top: 24px;
`;

export const SubTitle = styled.Text`
    color: ${({theme}) => theme.colors.shape};
    font-family: ${({theme}) => theme.fonts.secondary_400};

    font-size: ${RFValue(15)}px;
    margin-top: 24px;
`;

export const Content = styled.View`
   flex: 1;
   width: 100%;
   padding: 0 16px;
`;

export const Appointments = styled.View`
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
   padding: 24px 0;
   width: 100%;
`;

export const AppointmentsTitle = styled.Text`
   color: ${({theme}) => theme.colors.text};
   font-family: ${({theme}) => theme.fonts.primary_400};
   font-size: ${RFValue(15)}px;
`;

export const AppointmentsQuantity = styled.Text`
   color: ${({theme}) => theme.colors.title};
   font-family: ${({theme}) => theme.fonts.primary_400};
   font-size: ${RFValue(15)}px;
`;

export const CarWrapper = styled.View`
   margin-bottom: 15px;
`;
export const CarFooter = styled.View`
   flex-direction: row;
   width: 100%;
   padding: 12px;
   margin-top: -10px;
   align-items: center;
   justify-content: space-around;
   background-color: ${({theme}) => theme.colors.background_secondary};
`;
export const CarFooterTitle = styled.Text`
   color: ${({theme}) => theme.colors.text_detail};
   font-family: ${({theme}) => theme.fonts.secondary_500};
   font-size: ${RFValue(15)}px;
`;
export const CarFooterPeriod = styled.View`
   flex-direction: row;
   align-items: center;
`;
export const CarFooterDate = styled.Text`
   margin: 0 10px;
   font-size: ${RFValue(13)}px;
   font-family: ${({theme}) => theme.fonts.primary_400};
   color: ${({theme}) => theme.colors.title};
`;