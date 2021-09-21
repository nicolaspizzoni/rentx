import styled, {css} from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';


interface DateValueProps {
    selected: boolean;
}

export const Container = styled.View`
   flex: 1;
`;

export const Header = styled.View`
    align-items: flex-start;
    justify-content: center;

    padding: 25px;
    padding-top: ${getStatusBarHeight() + 30}px;

    width: 100%;
    height: 325px;

    background-color: ${({theme}) => theme.colors.header};
`;

export const Title = styled.Text`
    color: ${({theme}) => theme.colors.shape};
    font-family: ${({theme}) => theme.fonts.secondary_600};

    font-size: ${RFValue(34)}px;
    margin-top: 24px;
`;

export const RentalPeriod = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    margin: 32px 0;
`;

export const DateInfo = styled.View`
    width: 30%;
`;

export const DateTitle = styled.Text`
    font-family: ${({theme}) => theme.fonts.secondary_500};
    font-size: ${RFValue(10)}px;
    color: ${({theme}) => theme.colors.shape};
`;

export const DateValue = styled.Text<DateValueProps>`
    font-family: ${({theme}) => theme.fonts.primary_500};
    font-size: ${RFValue(15)}px;
    color: ${({theme}) => theme.colors.shape};

    ${({selected, theme}) => !selected && css`
        border-bottom-width: 1px;
        border-bottom-color: ${theme.colors.text};
        padding-bottom: 5px;
    `}
`;

export const Content = styled.ScrollView.attrs({
    contentContainerStyle: {
        paddingBottom: 24
    },
    showsVerticalScrollIndicator: false
})`

`;

export const Footer = styled.View`
    padding: 24px;
`;

