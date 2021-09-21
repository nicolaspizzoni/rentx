import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
   flex: 1;
   background-color: ${({theme}) => theme.colors.header};
   padding-top: ${getStatusBarHeight() + 30}px;
`;

export const Content = styled.View`
    align-items: center;
    justify-content: center;
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.secondary_600};
    font-size: ${RFValue(30)}px;
    color: ${({theme}) => theme.colors.shape};
    margin-top: 40px;
`;

export const Text = styled.Text`
    font-family: ${({theme}) => theme.fonts.primary_400};
    font-size: ${RFValue(15)}px;
    color: ${({theme}) => theme.colors.text_detail};
    line-height: ${RFValue(25)}px;
    text-align: center;
`;

export const Footer = styled.View`
    align-items: center;
    justify-content: center;
    margin-top: 80px;
    width: 100%;
`;
