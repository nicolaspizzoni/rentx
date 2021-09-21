import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
   flex: 1;
   background-color: ${({theme}) => theme.colors.header};
   justify-content: center;
   align-items: center;
`;

export const Catch = styled(RectButton)``;